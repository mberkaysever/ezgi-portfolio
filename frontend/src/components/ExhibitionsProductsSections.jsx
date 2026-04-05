import { useLanguage } from "../context/LanguageContext";

export default function ExhibitionsProductsSections() {
  const { t } = useLanguage();

  return (
    <>
      <section
        id="exhibitions"
        className="py-32 px-12 bg-white/75 text-black scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-black mb-4">{t("exhibitions.title")}</h2>
          {t("exhibitions.subtitle") ? (
            <p className="text-xl text-gray-600">{t("exhibitions.subtitle")}</p>
          ) : null}
        </div>
      </section>
      <section
        id="products"
        className="py-32 px-12 bg-white/75 text-black scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-black mb-4">{t("products.title")}</h2>
          {t("products.subtitle") ? (
            <p className="text-xl text-gray-600">{t("products.subtitle")}</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
