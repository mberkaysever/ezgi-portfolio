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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white/75 px-4 pb-28 pt-24 sm:pb-32 sm:pt-28"
    >
      <div className="relative z-[1] flex w-full max-w-[42rem] flex-col items-center gap-8 px-[2cm] text-center sm:gap-10">
        <div className="flex w-full max-w-lg flex-col items-center gap-4 px-2 sm:gap-5">
          <div className="flex w-full justify-center">
            <div className="hero-logo-square flex aspect-square w-full max-w-[min(100%,23.4rem)] items-center justify-center rounded-none sm:max-w-[26rem]">
              <img
                src="/logo.svg"
                alt=""
                width={1134}
                height={1118}
                decoding="async"
                fetchPriority="high"
                draggable={false}
                className="hero-logo-motion__inner max-h-[85%] max-w-[85%] object-contain select-none"
              />
            </div>
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
