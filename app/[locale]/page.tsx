import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{t("heading")}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">{t("body")}</p>
      <Link
        href="/about"
        className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
