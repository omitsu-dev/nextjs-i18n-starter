"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN",
  ja: "JA",
};

export function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-1">
      {routing.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => router.replace(pathname, { locale })}
          className={`rounded px-2 py-1 text-sm ${
            locale === currentLocale
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {localeLabels[locale] ?? locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
