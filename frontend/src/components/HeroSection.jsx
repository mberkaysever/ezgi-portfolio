import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const SHOPIER_URL =
  "https://www.shopier.com/EzgiAysever?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnkH6fF1iwpys6hTz-dfP6uHpgvI9S2X6fPFR2_xmKKLURHjAEY3pmKGwddIg_aem_Ha1dh4_T2jk6UEmjf29ZxA&utm_id=97760_v0_s00_e0_tv3_a1dennhbdw4sro_tp1";

const HeroSection = () => {
  const { t, locale } = useLanguage();
  const [heroRow, setHeroRow] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    let cancelled = false;
    supabase
      .from("hero_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setHeroRow(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const pick = (trVal, enVal) => {
    const v = locale === "tr" ? trVal : enVal;
    return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
  };

  const name = pick(heroRow?.name_tr, heroRow?.name_en) || t("hero.name");
  const role = pick(heroRow?.role_tr, heroRow?.role_en) || t("hero.role");
  const locations =
    pick(heroRow?.locations_tr, heroRow?.locations_en) || t("hero.locations");

  return (
    <section
      id="home"
      className="relative min-h-screen bg-white/75 flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-28 sm:pt-28 sm:pb-32"
    >
      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto w-full gap-8 sm:gap-10">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <h1 className="m-0 w-full flex justify-center px-1">
            <span className="hero-logo-row select-none text-gray-900">
              <span className="hero-logo-row__left">
                <img
                  src="/imza.svg"
                  alt={name}
                  width={1600}
                  height={231}
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                />
              </span>
              <span className="hero-logo-row__right" aria-hidden="true">
                <img
                  src="/imza.svg"
                  alt=""
                  width={1600}
                  height={231}
                  decoding="async"
                  fetchPriority="low"
                  draggable={false}
                />
              </span>
            </span>
          </h1>
          <p
            className="font-semibold text-gray-800 text-center tracking-tight max-w-2xl px-2"
            style={{
              fontSize: "clamp(1.05rem, 2.8vw, 1.5rem)",
              lineHeight: 1.35,
            }}
          >
            {role}
          </p>
        </div>

        <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed md:whitespace-normal">
          {locations}
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Button
            variant="default"
            className="bg-gray-900 text-white hover:bg-black px-8 py-6 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105"
          >
            {t("hero.ctaProducts")}
          </Button>
          <Button
            variant="outline"
            className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105"
          >
            {t("hero.ctaCollabs")}
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105"
          >
            <a href={SHOPIER_URL} target="_blank" rel="noopener noreferrer">
              {t("hero.ctaShopier")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
