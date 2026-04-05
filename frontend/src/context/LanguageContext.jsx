import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations } from "../i18n/translations";

const STORAGE_KEY = "portfolio-locale";

const LanguageContext = createContext(null);

/**
 * @param {string} path dot-separated path e.g. "nav.design"
 * @param {unknown} params unused; reserved for future interpolation
 */
function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "tr" || stored === "en") return stored;
    } catch {
      /* ignore */
    }
    return "tr";
  });

  const setLocale = useCallback((next) => {
    if (next !== "tr" && next !== "en") return;
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "tr" ? "tr" : "en";
  }, [locale]);

  const t = useCallback(
    (path) => {
      const value = getNested(translations[locale], path);
      if (value === undefined) {
        const fallback = getNested(translations.en, path);
        return fallback !== undefined ? fallback : path;
      }
      return value;
    },
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
