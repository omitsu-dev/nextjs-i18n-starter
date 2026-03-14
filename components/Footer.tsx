import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-16 border-t border-gray-200 py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} nextjs-i18n-starter.{" "}
        {t("copyright")}
      </p>
    </footer>
  );
}
