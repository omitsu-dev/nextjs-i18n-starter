# nextjs-i18n-starter

Minimal Next.js 15 + next-intl v4 multilingual starter with App Router. JA/EN ready out of the box.

Built from the same architecture powering [32blog.com](https://32blog.com) (120+ articles, 3 languages).

## Features

- **App Router** — Server Components by default, `params` as `Promise` (Next.js 15+)
- **next-intl v4** — Type-safe translations, locale routing, language switcher
- **Static Generation** — All locale pages pre-rendered at build time via `generateStaticParams`
- **Tailwind CSS v4** — Utility-first styling with dark mode support
- **Turbopack** — Fast dev server (`next dev --turbopack`)
- **SEO** — `hreflang` alternates auto-generated in metadata

## Quick Start

```bash
git clone https://github.com/omitsu-dev/nextjs-i18n-starter.git
cd nextjs-i18n-starter
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to `/en` or `/ja` based on your browser language.

## Project Structure

```
├── app/
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Tailwind CSS entry
│   └── [locale]/
│       ├── layout.tsx              # Locale layout + NextIntlClientProvider
│       ├── page.tsx                # Home page
│       └── about/
│           └── page.tsx            # About page
├── components/
│   ├── Header.tsx                  # Navigation (Server Component)
│   ├── Footer.tsx                  # Footer (Server Component)
│   └── LanguageSwitcher.tsx        # Language toggle (Client Component)
├── i18n/
│   ├── routing.ts                  # Locale definitions
│   ├── request.ts                  # Message loader
│   ├── navigation.ts              # Locale-aware Link, useRouter, etc.
│   └── messages/
│       ├── en.json                 # English translations
│       └── ja.json                 # Japanese translations
├── middleware.ts                   # Locale detection & routing
└── next.config.ts                  # next-intl plugin
```

## Adding a New Locale

1. Add the locale to `i18n/routing.ts`:

```typescript
export const routing = defineRouting({
  locales: ["en", "ja", "es"],  // Add "es"
  defaultLocale: "en",
});
```

2. Create `i18n/messages/es.json` with the same keys as `en.json`

3. Update the type union in `i18n/request.ts` and `app/[locale]/layout.tsx`

4. Add a label in `components/LanguageSwitcher.tsx`:

```typescript
const localeLabels: Record<string, string> = {
  en: "EN",
  ja: "JA",
  es: "ES",
};
```

## Adding a New Page

1. Create `app/[locale]/your-page/page.tsx`:

```typescript
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function YourPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("yourPage");

  return <h1>{t("heading")}</h1>;
}
```

2. Add translations to each `messages/*.json`:

```json
{
  "yourPage": {
    "heading": "Your Page Title"
  }
}
```

## Key Patterns

### Server Components (default)

Use `getTranslations` from `next-intl/server`:

```typescript
import { getTranslations } from "next-intl/server";

const t = await getTranslations("namespace");
return <p>{t("key")}</p>;
```

### Client Components

Use `useTranslations` from `next-intl`:

```typescript
"use client";
import { useTranslations } from "next-intl";

const t = useTranslations("namespace");
return <button>{t("key")}</button>;
```

### Locale-Aware Links

Use `Link` from `@/i18n/navigation` instead of `next/link`:

```typescript
import { Link } from "@/i18n/navigation";

// Automatically prefixes with current locale
<Link href="/about">About</Link>
```

## Tech Stack

| Package | Version |
|---------|---------|
| Next.js | 15.5 |
| next-intl | 4.x |
| React | 19.x |
| Tailwind CSS | 4.x |
| TypeScript | 5.x |

## Related Articles

- [Next.js i18n Pitfalls with next-intl](https://32blog.com/en/nextjs/nextjs-next-intl-i18n-pitfalls) — Common mistakes and how to avoid them

## License

[MIT](LICENSE)
