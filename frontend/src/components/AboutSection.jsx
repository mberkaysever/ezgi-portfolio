import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function AboutSignatureLogo({ name }) {
  const wrapRef = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([e]) => {
        setRun(e.isIntersecting);
      },
      { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`about-signature-logo mx-auto mt-10 flex justify-center select-none text-gray-900 ${run ? "about-signature-logo--visible" : ""}`}
    >
      <div className="about-signature-logo__reveal">
        <img
          src="/imza.svg"
          alt={name}
          width={1600}
          height={231}
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();
  const name = t("hero.name");
  const paragraphs = Array.isArray(t("about.paragraphs")) ? t("about.paragraphs") : [];
  const fullText = paragraphs.join(" ").replace(/\s+/g, " ").trim();
  const sentences =
    fullText.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g)?.map((s) => s.trim()) ?? [];
  const bodyText = sentences.slice(0, -2).join(" ");
  const endingSentences = sentences.slice(-2);

  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-6 sm:px-12 bg-white text-black scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium mb-8 sm:mb-10 tracking-tight text-center">
          {t("about.title")}
        </h2>
        <div className="max-w-4xl mx-auto text-center text-base sm:text-lg text-gray-700 leading-relaxed">
          <p>{bodyText || fullText}</p>
          {endingSentences.length > 0 ? (
            <div className="mt-8 space-y-6">
              {endingSentences.map((sentence, i) => (
                <p key={`ending-${i}`}>{sentence}</p>
              ))}
            </div>
          ) : null}
          <AboutSignatureLogo name={name} />
        </div>
      </div>
    </section>
  );
}
