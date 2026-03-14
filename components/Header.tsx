import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations("nav");

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          {t("home")}
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:underline">
            {t("about")}
          </Link>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </nav>
    </header>
  );
}
