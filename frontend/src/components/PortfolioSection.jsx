import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import ezgi1 from "../assets/images/ezgi1.png";
import ezgi2 from "../assets/images/ezgi2.png";
import ezgi3 from "../assets/images/ezgi3.png";
import ezgi4 from "../assets/images/ezgi4.png";

const FALLBACK_IMAGES = [ezgi1, ezgi2, ezgi3, ezgi4];

const PortfolioSection = () => {
  const { t, locale } = useLanguage();
  const staticProjects = t("portfolio.projects");

  /** null = yerel liste kullan; undefined = yükleniyor; dizi = Supabase satırları */
  const [remoteRows, setRemoteRows] = useState(
    isSupabaseConfigured ? undefined : null,
  );

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setRemoteRows(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("sort_order", { ascending: true });
      if (cancelled) return;
      if (error) {
        console.error(error);
        setRemoteRows(null);
        return;
      }
      if (data && data.length > 0) {
        setRemoteRows(data);
      } else {
        setRemoteRows(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const list = useMemo(() => {
    if (remoteRows && remoteRows.length > 0) {
      return remoteRows.map((row) => ({
        id: row.id,
        title: locale === "tr" ? row.title_tr : row.title_en,
        category: locale === "tr" ? row.category_tr : row.category_en,
        year: row.year,
        image: row.image_url,
      }));
    }
    if (!Array.isArray(staticProjects)) return [];
    return staticProjects.map((p, i) => ({
      id: `local-${i}`,
      title: p.title,
      category: p.category,
      year: p.year,
      description: p.description,
      image: FALLBACK_IMAGES[i] ?? FALLBACK_IMAGES[0],
    }));
  }, [remoteRows, staticProjects, locale]);

  if (remoteRows === undefined) {
    return (
      <section id="portfolio" className="py-32 px-12 bg-white/75 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-medium mb-4 tracking-tight">{t("portfolio.title")}</h2>
          <p className="text-xl text-gray-600">{t("portfolio.subtitle")}</p>
          <p className="mt-16 text-gray-500 text-sm">Yükleniyor…</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-32 px-12 bg-white/75 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-6xl font-medium mb-4 tracking-tight">{t("portfolio.title")}</h2>
          <p className="text-xl text-gray-600">{t("portfolio.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {list.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-6 aspect-[4/3] bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-2xl font-medium mb-1 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  {project.description ? (
                    <p className="mt-2 text-base text-gray-600 leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                  ) : (
                    <p className="text-gray-500">
                      {project.category} • {project.year}
                    </p>
                  )}
                </div>
                <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
