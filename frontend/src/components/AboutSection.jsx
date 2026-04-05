import { useLanguage } from "../context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const paragraphs = t("about.paragraphs");

  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-6 sm:px-12 bg-neutral-100 text-black scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 sm:mb-10">
          {t("about.title")}
        </h2>
        <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-relaxed">
          {Array.isArray(paragraphs) &&
            paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>
      </div>
    </section>
  );
}
