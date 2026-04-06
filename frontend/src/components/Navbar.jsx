import React from "react";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const NAV_LINKS = [
  { href: "#design", labelKey: "nav.linkTogether" },
  { href: "#portfolio", labelKey: "nav.linkPortfolio" },
  { href: "#about", labelKey: "nav.linkAbout" },
  { href: "#contact", labelKey: "nav.linkContact" },
];

const Navbar = () => {
  const { locale, setLocale, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-6 bg-white/80 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-y-4 max-w-[1800px] mx-auto">
        <a href="#home" className="flex items-center gap-1 group shrink-0">
          <span className="text-2xl font-medium tracking-tight text-black group-hover:text-gray-700 transition-colors">
            {t("nav.brand")}
          </span>
          <span className="w-2 h-2 bg-pink-500 rounded-full" aria-hidden />
        </a>

        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 md:gap-x-6 lg:gap-x-8 xl:gap-x-10">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-gray-700 hover:text-black transition-colors font-normal whitespace-nowrap"
            >
              {t(labelKey)}
            </a>
          ))}
          <div
            className="flex items-center gap-1 text-sm shrink-0"
            role="group"
            aria-label={locale === "tr" ? "Dil" : "Language"}
          >
            <button
              type="button"
              onClick={() => setLocale("tr")}
              className={`px-2 py-1 rounded font-normal transition-colors ${
                locale === "tr"
                  ? "text-black bg-gray-100"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              TR
            </button>
            <span className="text-gray-300 select-none" aria-hidden>
              |
            </span>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-2 py-1 rounded font-normal transition-colors ${
                locale === "en"
                  ? "text-black bg-gray-100"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              EN
            </button>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800 rounded-md px-5 py-2 flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 shrink-0">
            <Mail className="w-4 h-4" aria-hidden />
            <span className="sr-only">{t("nav.linkContact")}: </span>
            {t("nav.contactEmail")}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
