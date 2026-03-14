import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("heading") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{t("heading")}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">{t("body")}</p>
    </div>
  );
}
