// src/lib/sourcesRegistry.ts
// Registre central des tableaux de sources légales par slug de calculateur.
// Permet aux pages de passer un slug à <SourcesSection> sans importer chaque lib.

import { SOURCES_RENTE_VIAGERE } from '@/lib/mortality'
import { SOURCES_IFI } from '@/lib/ifi'
import { SOURCES_PER } from '@/lib/per'
import { SOURCES_TMI } from '@/lib/tmi'
import { SOURCES_PLUS_VALUE } from '@/lib/plusValueImmobiliere'
import { SOURCES_ASSURANCE_VIE } from '@/lib/assuranceVie'
import { SOURCES_TRANSMISSION } from '@/lib/transmission'
import { SOURCES_DONATION } from '@/lib/donation'

export interface Source {
  href: string
  label: string
  desc: string
}

export const SOURCES_REGISTRY: Record<string, Source[]> = {
  'rente-viagere':              SOURCES_RENTE_VIAGERE,
  'ifi':                        SOURCES_IFI,
  'per-individuel':             SOURCES_PER,
  'tmi':                        SOURCES_TMI,
  'plus-value-immobiliere':     SOURCES_PLUS_VALUE,
  'assurance-vie':              SOURCES_ASSURANCE_VIE,
  'assurance-vie/transmission': SOURCES_TRANSMISSION,
  'donation-droits':            SOURCES_DONATION,
  'donation/droits':            SOURCES_DONATION,
}

export function getSourcesBySlug(slug: string): Source[] {
  return SOURCES_REGISTRY[slug] ?? []
}
