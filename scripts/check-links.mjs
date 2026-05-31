#!/usr/bin/env node
// scripts/check-links.mjs
//
// Crawler simple pour vérifier que toutes les URLs externes (Légifrance,
// BOFiP, service-public, INSEE, etc.) citées dans le code et la doc
// renvoient un statut HTTP 200 OK.
//
// LIMITES IMPORTANTES :
// - Détecte les 404 et timeouts au niveau HTTP, **pas** les content-mismatches
//   (URLs qui répondent 200 mais affichent un message "Article introuvable" ou
//   re-routent vers un autre document). Pour ça, voir le crawl manuel
//   documenté dans `docs/broken-links-to-fix.md`.
// - **Faux positifs fréquents** : Légifrance, BOFiP et certains sites publics
//   français (insee.fr, service-public) bloquent souvent les requêtes via
//   Node fetch direct (anti-bot CDN). Une URL marquée "fetch failed" par ce
//   script peut très bien fonctionner dans un navigateur. Vérifier manuellement
//   avant de conclure qu'une URL est cassée.
// - Suit les redirections (302 → URL finale).
//
// Le script sort toujours en exit 0 (rapport informationnel). Pour échouer
// sur erreurs HTTP, utiliser `--strict`.
//
// USAGE :
//   node scripts/check-links.mjs                  # mode défaut : liste les URLs
//   node scripts/check-links.mjs --test           # teste réellement chaque URL en HTTP
//   node scripts/check-links.mjs --test --strict  # exit 1 si HTTP 4xx/5xx avéré
//   node scripts/check-links.mjs --test --quiet   # silencieux sauf résumé final
//
// EXTRACT-ONLY (défaut) :
//   Liste toutes les URLs externes citées dans le code et les docs, groupées
//   par domaine, avec les fichiers d'origine. Utile pour repérer rapidement
//   ce qui doit être manuellement vérifié.
//
// TEST (--test) :
//   Lance une requête HTTP sur chaque URL. Voir les limites importantes
//   ci-dessous.

import { readFile, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const URL_REGEX = /https?:\/\/(?:www\.)?(?:legifrance\.gouv\.fr|bofip\.impots\.gouv\.fr|impots\.gouv\.fr|service-public\.gouv\.fr|service-public\.fr|insee\.fr|ined\.fr|boss\.gouv\.fr)[^\s'"`<>)\]]+/g

const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'out', 'dist'])
const EXT = /\.(ts|tsx|md|mdx)$/i

// Fichiers à ignorer (placeholders ou inventaire des URLs cassées connues)
const SKIP_FILES = new Set([
  'docs/sources/_TEMPLATE.md',
  'docs/broken-links-to-fix.md',
])

// Nettoie une URL extraite : retire la ponctuation traînante (virgule, point,
// strikethrough markdown ~~, parenthèse, etc.) qui se colle souvent à l'URL.
function cleanUrl(url) {
  return url.replace(/[,.;:~`)\]>]+$/, '')
}

const quiet = process.argv.includes('--quiet')
const strict = process.argv.includes('--strict')
const test = process.argv.includes('--test')

async function walkDir(dir) {
  const entries = await readdir(dir)
  const files = []
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue
    const full = join(dir, entry)
    const s = await stat(full)
    if (s.isDirectory()) files.push(...(await walkDir(full)))
    else if (EXT.test(full)) files.push(full)
  }
  return files
}

async function extractLinks() {
  const files = []
  for (const root of ['src', 'docs']) {
    try { files.push(...(await walkDir(root))) } catch {}
  }
  const links = []
  for (const file of files) {
    const relFile = file.replace(/\\/g, '/')
    if ([...SKIP_FILES].some(skip => relFile.endsWith(skip))) continue
    const content = await readFile(file, 'utf-8')
    const matches = (content.match(URL_REGEX) ?? []).map(cleanUrl)
    for (const url of new Set(matches)) {
      // Ignore les placeholders type "LEGIARTI..." ou "<id>" qui ne sont pas
      // de vraies URLs.
      if (/\.{3}|<[^>]+>/.test(url)) continue
      links.push({ url, file })
    }
  }
  return links
}

async function fetchWithRetry(url, attempts = 2) {
  let lastErr
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(15_000),
        // User-Agent réaliste : certains BOFiP/Légifrance bloquent les UA
        // génériques type "node-fetch" ou "curl".
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; calcpatrimoine-link-checker/1.0)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      })
      return res
    } catch (err) {
      lastErr = err
      if (i < attempts - 1) await new Promise(r => setTimeout(r, 1000))
    }
  }
  throw lastErr
}

async function checkUrl(url) {
  const start = Date.now()
  try {
    const res = await fetchWithRetry(url)
    return { url, status: res.status, ok: res.ok, finalUrl: res.url, ms: Date.now() - start }
  } catch (err) {
    return { url, status: 0, ok: false, error: err?.message ?? String(err), ms: Date.now() - start }
  }
}

function groupByDomain(urls) {
  const groups = new Map()
  for (const url of urls) {
    const host = new URL(url).host.replace(/^www\./, '')
    if (!groups.has(host)) groups.set(host, [])
    groups.get(host).push(url)
  }
  return groups
}

async function listMode(links, unique) {
  console.log(`\n${unique.length} URLs externes uniques trouvées (${links.length} occurrences).\n`)
  const byDomain = groupByDomain(unique)
  const sortedDomains = [...byDomain.entries()].sort((a, b) => b[1].length - a[1].length)

  for (const [domain, urls] of sortedDomains) {
    console.log(`\n=== ${domain} (${urls.length}) ===`)
    for (const url of urls.sort()) {
      const filesFor = [...new Set(links.filter(l => l.url === url).map(l => l.file.replace(/\\/g, '/')))]
      console.log(`  ${url}`)
      filesFor.forEach(f => console.log(`    └ ${f}`))
    }
  }

  console.log(`\nTotal : ${unique.length} URLs uniques.`)
  console.log(`Pour tester les URLs en HTTP : node scripts/check-links.mjs --test`)
}

async function main() {
  if (!quiet) console.log('Extraction des URLs externes dans src/ et docs/...')
  const links = await extractLinks()
  const unique = [...new Set(links.map(l => l.url))]

  if (!test) {
    await listMode(links, unique)
    return
  }

  if (!quiet) console.log(`${unique.length} URLs uniques trouvées (${links.length} occurrences)`)
  if (!quiet) console.log(`Test HTTP des ${unique.length} URLs (15s timeout, max 8 en parallèle)...\n`)

  // Throttle : 8 requêtes en parallèle pour ne pas saturer les serveurs publics
  const POOL_SIZE = 8
  const results = []
  for (let i = 0; i < unique.length; i += POOL_SIZE) {
    const batch = unique.slice(i, i + POOL_SIZE)
    const batchResults = await Promise.all(batch.map(checkUrl))
    results.push(...batchResults)
    if (!quiet) {
      for (const r of batchResults) {
        const icon = r.ok ? '✓' : '✗'
        const status = r.error ?? `HTTP ${r.status}`
        console.log(`  ${icon} ${status.padEnd(20)} ${r.url}`)
      }
    }
  }

  const ok = results.filter(r => r.ok)
  const http4xx5xx = results.filter(r => !r.ok && r.status >= 400)
  const fetchErrors = results.filter(r => !r.ok && r.status === 0)

  console.log(`\nRésumé :`)
  console.log(`  ✓ OK         : ${ok.length}`)
  console.log(`  ✗ HTTP 4xx/5xx (cassés confirmés) : ${http4xx5xx.length}`)
  console.log(`  ? fetch failed (possible faux positif CDN) : ${fetchErrors.length}`)

  if (http4xx5xx.length > 0) {
    console.log(`\n✗ URLs HTTP 4xx/5xx (à corriger) :`)
    for (const r of http4xx5xx) {
      const filesFor = [...new Set(links.filter(l => l.url === r.url).map(l => l.file))]
      console.log(`\n  [HTTP ${r.status}] ${r.url}`)
      filesFor.forEach(f => console.log(`         ${f}`))
    }
  }

  if (fetchErrors.length > 0) {
    console.log(`\n? URLs "fetch failed" (à vérifier manuellement, souvent bloquées par CDN gouvernementaux) :`)
    for (const r of fetchErrors) {
      const filesFor = [...new Set(links.filter(l => l.url === r.url).map(l => l.file))]
      console.log(`\n  [${r.error}] ${r.url}`)
      filesFor.forEach(f => console.log(`         ${f}`))
    }
  }

  console.log(`\nNote : ce script ne détecte pas les "content mismatches"`)
  console.log(`(URL répond 200 mais affiche le mauvais article ou un message`)
  console.log(`"Article introuvable"). Cf. docs/broken-links-to-fix.md pour`)
  console.log(`la liste complète des problèmes connus.`)

  if (strict && http4xx5xx.length > 0) process.exit(1)
}

main().catch(err => {
  console.error('Erreur:', err)
  process.exit(2)
})
