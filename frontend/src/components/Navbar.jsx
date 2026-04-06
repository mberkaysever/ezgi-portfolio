import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Mail, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const NAV_LINKS = [
  { href: "#design", labelKey: "nav.linkTogether" },
  { href: "#portfolio", labelKey: "nav.linkPortfolio" },
  { href: "#about", labelKey: "nav.linkAbout" },
  { href: "#contact", labelKey: "nav.linkContact" },
];

const Navbar = () => {
  const { locale, setLocale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navPad = "pt-[max(1.25rem,env(safe-area-inset-top))] pb-4 sm:pb-6";
  const navX = "px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-8";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-sm ${navPad} ${navX}`}
    >
      <div className="relative z-[60] mx-auto flex max-w-[1800px] items-center justify-between gap-3">
        <a href="#home" className="group flex shrink-0 items-center gap-1" onClick={closeMenu}>
          <span className="text-xl font-medium tracking-tight text-black transition-colors group-hover:text-gray-700 sm:text-2xl">
            {t("nav.brand")}
          </span>
          <span className="h-2 w-2 rounded-full bg-pink-500" aria-hidden />
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-800 hover:bg-gray-100 lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="h-6 w-6" strokeWidth={1.75} /> : <Menu className="h-6 w-6" strokeWidth={1.75} />}
        </button>

        <div className="hidden items-center gap-x-4 gap-y-2 md:gap-x-6 lg:flex lg:gap-x-8 xl:gap-x-10">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap text-sm font-normal text-gray-700 transition-colors hover:text-black"
            >
              {t(labelKey)}
            </a>
          ))}
          <div
            className="flex shrink-0 items-center gap-1 text-sm"
            role="group"
            aria-label={locale === "tr" ? "Dil" : "Language"}
          >
            <button
              type="button"
              onClick={() => setLocale("tr")}
              className={`rounded px-2 py-1 font-normal transition-colors ${
                locale === "tr" ? "bg-gray-100 text-black" : "text-gray-400 hover:text-gray-700"
              }`}
            >
              TR
            </button>
            <span className="select-none text-gray-300" aria-hidden>
              |
            </span>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded px-2 py-1 font-normal transition-colors ${
                locale === "en" ? "bg-gray-100 text-black" : "text-gray-400 hover:text-gray-700"
              }`}
            >
              EN
            </button>
          </div>
          <Button
            className="flex shrink-0 items-center gap-2 rounded-md bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800"
            asChild
          >
            <a href={`mailto:${t("nav.contactEmail")}`}>
              <Mail className="h-4 w-4" aria-hidden />
              <span className="sr-only">{t("nav.linkContact")}: </span>
              <span className="max-w-[10rem] truncate sm:max-w-none">{t("nav.contactEmail")}</span>
            </a>
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-[55] flex flex-col bg-white/98 pt-[calc(3.75rem+max(1.25rem,env(safe-area-inset-top)))] backdrop-blur-md lg:hidden"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-6 pt-2">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <a
                key={href}
                href={href}
                className="rounded-lg px-3 py-3 text-base text-gray-800 active:bg-gray-100"
                onClick={closeMenu}
              >
                {t(labelKey)}
              </a>
            ))}
            <div
              className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4"
              role="group"
              aria-label={locale === "tr" ? "Dil" : "Language"}
            >
              <button
                type="button"
                onClick={() => setLocale("tr")}
                className={`rounded-lg px-4 py-2 text-sm ${
                  locale === "tr" ? "bg-gray-100 text-black" : "text-gray-500"
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-lg px-4 py-2 text-sm ${
                  locale === "en" ? "bg-gray-100 text-black" : "text-gray-500"
                }`}
              >
                EN
              </button>
            </div>
            <Button className="mt-4 w-full bg-black text-white hover:bg-gray-800" asChild>
              <a href={`mailto:${t("nav.contactEmail")}`} onClick={closeMenu}>
                <Mail className="mr-2 h-4 w-4" aria-hidden />
                {t("nav.contactEmail")}
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
