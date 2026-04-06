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

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white/75 px-4 pt-24 pb-28 sm:pt-28 sm:pb-32"
    >
      {/* Orta sütun: çok açık gri + hafif derinlik (gölge / ring / üst highlight); içerikle aynı ölçüler */}
      <div
        className="hero-panel-bg pointer-events-none absolute inset-y-0 left-1/2 z-[1] -translate-x-1/2 box-border w-[min(100%,calc(100vw-2rem))] max-w-[42rem] px-[2cm]"
        aria-hidden
      />
      <div className="relative z-[2] flex w-full max-w-[42rem] flex-col items-center gap-8 px-[2cm] text-center sm:gap-10">
        <div className="flex flex-col items-center gap-4 sm:gap-5 w-full max-w-lg px-2">
          <div className="hero-logo-motion flex w-full justify-center py-1">
            <img
              src="/logo.svg"
              alt=""
              width={1134}
              height={1118}
              decoding="async"
              fetchPriority="high"
              draggable={false}
              className="hero-logo-motion__inner w-full max-w-[min(100%,22rem)] sm:max-w-[min(100%,26rem)] h-auto object-contain select-none"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-medium tracking-tight text-gray-900 text-center">
            {name}
          </h1>
          <p
            className="font-normal text-gray-700 text-center tracking-tight max-w-2xl"
            style={{
              fontSize: "clamp(1.05rem, 2.8vw, 1.35rem)",
              lineHeight: 1.4,
            }}
          >
            {role}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Button
            variant="default"
            asChild
            className="bg-gray-900 text-white hover:bg-black px-8 py-6 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105"
          >
            <a href="#portfolio">{t("hero.ctaProducts")}</a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105"
          >
            <a href="#contact">{t("hero.ctaCollabs")}</a>
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
