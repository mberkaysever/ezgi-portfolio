import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import ezgi1 from "../assets/images/ezgi1.png";
import ezgi2 from "../assets/images/ezgi2.png";
import ezgi3 from "../assets/images/ezgi3.png";
import ezgi4 from "../assets/images/ezgi4.png";

const FALLBACK_IMAGES = [ezgi1, ezgi2, ezgi3, ezgi4];

function editorialSlotIndex(i) {
  if (i === 2) return 3;
  if (i === 3) return 2;
  return i;
}

const PortfolioSection = () => {
  const { t, locale } = useLanguage();
  const staticProjects = t("portfolio.projects");

  const [remoteRows, setRemoteRows] = useState(
    isSupabaseConfigured ? undefined : null,
  );
  const [colorRevealedIds, setColorRevealedIds] = useState(() => new Set());

  const chainRef = useRef(null);

  const revealColor = useCallback((id) => {
    setColorRevealedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

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

  const listRef = useRef(list);
  listRef.current = list;
  const revealColorRef = useRef(revealColor);
  revealColorRef.current = revealColor;

  const editorialSlots = useMemo(() => {
    const raw = t("portfolio.projects");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  /**
   * Sadece imleç oynayınca değil, sayfa scroll / tekerlek ile kayarken de (imleç sabit) aynı Y hizasında
   * satır renklensin: son clientY'yi window pointermove + wheel ile tutar, scroll'da tekrar eşleştiririz.
   */
  useEffect(() => {
    if (remoteRows === undefined || list.length === 0) return undefined;

    let lastClientY = -1;

    const syncRowFromLastY = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      if (lastClientY < 0) return;
      const chain = chainRef.current;
      const items = listRef.current;
      if (!chain || items.length === 0) return;
      const rect = chain.getBoundingClientRect();
      if (lastClientY < rect.top || lastClientY > rect.bottom) {
        return;
      }
      const firstArticle = chain.querySelector("article");
      if (!firstArticle) return;
      const tileH = firstArticle.getBoundingClientRect().height;
      if (!tileH || tileH <= 0) return;
      const y = lastClientY - rect.top;
      const i = Math.floor(y / tileH);
      if (i >= 0 && i < items.length) {
        revealColorRef.current(items[i].id);
      }
    };

    const onPointerMove = (e) => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      lastClientY = e.clientY;
      syncRowFromLastY();
    };

    const onScroll = () => {
      syncRowFromLastY();
    };

    const onWheel = (e) => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      lastClientY = e.clientY;
      syncRowFromLastY();
    };

    window.addEventListener("pointermove", onPointerMove, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("wheel", onWheel, { capture: true, passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, [remoteRows, list.length]);

  if (remoteRows === undefined) {
    return (
      <section id="portfolio" className="scroll-mt-24 bg-white/75 px-6 py-32 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-5xl font-medium tracking-tight sm:text-6xl">{t("portfolio.title")}</h2>
          <p className="text-xl text-gray-600">{t("portfolio.subtitle")}</p>
          <p className="mt-16 text-sm text-gray-500">Yükleniyor…</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 bg-white/75 px-4 py-20 sm:px-6 sm:py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto w-full max-w-[min(100%,88rem)]">
        <header className="mb-10 sm:mb-16 md:mb-24">
          <h2 className="mb-3 text-4xl font-medium tracking-tight sm:mb-4 sm:text-5xl md:text-6xl">
            {t("portfolio.title")}
          </h2>
          <p className="max-w-2xl text-base text-gray-600 sm:text-lg md:text-xl">{t("portfolio.subtitle")}</p>
        </header>

        {list.length === 0 ? (
          <p className="text-gray-500">{locale === "tr" ? "Henüz proje yok." : "No projects yet."}</p>
        ) : (
          <>
            {/* Mobil: görsel üstte, metin altta; varsayılan renkli */}
            <div className="flex flex-col gap-10 lg:hidden">
              {list.map((project, i) => {
                const slot = editorialSlots[editorialSlotIndex(i)];
                const swapLorisKonsept = i === 2 || i === 3;
                const title = swapLorisKonsept
                  ? (slot?.title ?? project.title)
                  : project.title || slot?.title;
                const description = swapLorisKonsept
                  ? (slot?.description ?? project.description)
                  : project.description ?? slot?.description ?? null;
                return (
                  <article
                    key={`mobile-${project.id}`}
                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-active:scale-[1.02]"
                      />
                    </div>
                    <div className="flex flex-col gap-2 border-t border-gray-100 p-5">
                      <h3 className="text-xl font-medium leading-snug tracking-tight text-gray-900">
                        {title}
                      </h3>
                      {description ? (
                        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line sm:text-base">
                          {description}
                        </p>
                      ) : (
                        <p className="text-base text-gray-600">
                          {project.category} • {project.year}
                        </p>
                      )}
                      <ArrowUpRight
                        className="mt-1 h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden
                      />
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Masaüstü: mevcut editoryal zigzag */}
            <div className="hidden w-full touch-pan-x justify-start overflow-x-auto overscroll-x-contain pb-3 [-webkit-overflow-scrolling:touch] lg:flex lg:overflow-visible lg:pb-2">
              <div
                ref={chainRef}
                className="portfolio-editorial-chain relative ml-0 shrink-0 [--tile:max(27rem,min(85vh,min(84vw,84rem)))] max-sm:[--tile:min(17.5rem,min(58dvh,min(88vw,20rem)))]"
                style={{
                  width: "max(calc(2 * var(--tile)), calc(var(--tile) + min(54rem, min(58vw, 63rem))))",
                  minHeight: `calc(${list.length} * var(--tile))`,
                }}
              >
                {list.map((project, i) => {
                  const left = i % 2 === 0 ? "0" : "var(--tile)";
                  const top = `calc(${i} * var(--tile))`;
                  const colorOn = colorRevealedIds.has(project.id);
                  return (
                    <article
                      key={project.id}
                      className="group absolute z-[1] cursor-pointer overflow-hidden bg-gray-100"
                      style={{
                        left,
                        top,
                        width: "var(--tile)",
                        height: "var(--tile)",
                      }}
                      onMouseEnter={() => revealColor(project.id)}
                      onFocus={() => revealColor(project.id)}
                      onClick={() => revealColor(project.id)}
                      tabIndex={0}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                          colorOn ? "" : "grayscale"
                        }`}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                    </article>
                  );
                })}

                {list.map((project, i) => {
                  const slot = editorialSlots[editorialSlotIndex(i)];
                  const swapLorisKonsept = i === 2 || i === 3;
                  const title = swapLorisKonsept
                    ? (slot?.title ?? project.title)
                    : project.title || slot?.title;
                  const description = swapLorisKonsept
                    ? (slot?.description ?? project.description)
                    : project.description ?? slot?.description ?? null;
                  const placement = i % 2 === 0 ? "after" : "before";
                  const top = `calc((${i} + 0.5) * var(--tile))`;
                  const widthAfter =
                    "min(54rem, max(11rem, calc(100dvw - var(--tile) - max(1.25rem, env(safe-area-inset-right, 0px)) - max(1.25rem, env(safe-area-inset-left, 0px)))))";
                  const widthBefore =
                    "min(54rem, max(11rem, calc(var(--tile) - 0.5rem)))";
                  return (
                    <div
                      key={`editorial-${project.id}`}
                      className="group portfolio-editorial-text absolute z-[3] box-border flex max-h-[min(72dvh,40rem)] -translate-y-1/2 flex-col gap-2 overflow-y-auto overflow-x-hidden rounded-sm border border-gray-200/40 bg-white/95 p-4 text-left shadow-sm backdrop-blur-sm sm:max-h-[min(85vh,48rem)] sm:gap-4 sm:p-6"
                      style={{
                        left: placement === "after" ? "var(--tile)" : "0",
                        top,
                        width: placement === "after" ? widthAfter : widthBefore,
                      }}
                    >
                      <h3 className="text-lg font-medium leading-snug tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
                        {title}
                      </h3>
                      {description ? (
                        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line sm:text-base">
                          {description}
                        </p>
                      ) : (
                        <p className="text-base text-gray-600">
                          {project.category} • {project.year}
                        </p>
                      )}
                      <ArrowUpRight
                        className="mt-2 h-6 w-6 shrink-0 text-gray-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black"
                        aria-hidden
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
