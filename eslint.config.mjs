import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      ".claude/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "ui_kits/**",
      "tailwind.config*.ts",
      "maintenance/**",
      "MAINTENANCE_PAGE.tsx",
      "src/app/page-new.tsx",
    ],
  },
];

export default eslintConfig;
