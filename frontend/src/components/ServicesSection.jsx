import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const publicUrl = process.env.PUBLIC_URL || "";

/** Sabit arka plan deseniyle aynı hareket — Services bölümü opak beyaz olduğu için yerel katman */
const ServicesBackgroundPattern = () => {
  const motionRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(`${publicUrl}/desen.upscaled.png`);

  useEffect(() => {
    const el = motionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ampX = 24;
    const ampY = 18;
    const periodMs = 22000;
    const t0 = performance.now();
    let frameId = 0;

    const tick = (now) => {
      const t = ((now - t0) % periodMs) / periodMs;
      const a = t * Math.PI * 2;
      const x = Math.sin(a) * ampX;
      const y = Math.cos(a * 0.72 + 0.4) * ampY;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="services-background-art" aria-hidden="true">
      <div ref={motionRef} className="services-background-art__motion">
        <img
          src={imgSrc}
          alt=""
          decoding="async"
          fetchPriority="low"
          draggable={false}
          onError={() => {
            setImgSrc((current) =>
              current.includes("desen.upscaled")
                ? `${publicUrl}/desen.png`
                : current,
            );
          }}
        />
      </div>
    </div>
  );
};

/** Varsayılan ağır çekim (kartta videoPlaybackRate yoksa) */
const SERVICE_VIDEO_PLAYBACK_RATE = 0.35;

const ServiceMedia = ({ service, title }) => {
  const videoRef = useRef(null);
  const videoUrl = service.videoSrc ? `${publicUrl}${service.videoSrc}` : null;
  const imageUrl = service.image ? `${publicUrl}${service.image}` : null;
  const playbackRate =
    typeof service.videoPlaybackRate === "number"
      ? service.videoPlaybackRate
      : SERVICE_VIDEO_PLAYBACK_RATE;
  const coverScale =
    typeof service.videoCoverScale === "number" && service.videoCoverScale > 1
      ? service.videoCoverScale
      : null;
  const objectPosition =
    typeof service.videoObjectPosition === "string" && service.videoObjectPosition.trim() !== ""
      ? service.videoObjectPosition.trim()
      : null;
  const trimStart =
    typeof service.videoTrimStart === "number" && service.videoTrimStart > 0
      ? service.videoTrimStart
      : 0;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const applySlow = () => {
      v.playbackRate = playbackRate;
    };

    const seekToTrim = () => {
      if (trimStart > 0 && v.duration && trimStart < v.duration) {
        v.currentTime = trimStart;
      }
    };

    const onEndedLoopTrim = () => {
      if (trimStart > 0) {
        seekToTrim();
        v.play().catch(() => {});
      }
    };

    const tryPlay = () => {
      v.muted = true;
      v.setAttribute("muted", "");
      v.playsInline = true;
      v.play().catch(() => {});
    };

    applySlow();
    v.addEventListener("loadedmetadata", applySlow);
    v.addEventListener("play", applySlow);
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);

    if (trimStart > 0) {
      v.addEventListener("loadedmetadata", seekToTrim);
      v.addEventListener("loadeddata", seekToTrim);
      v.addEventListener("ended", onEndedLoopTrim);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) tryPlay();
        }
      },
      { threshold: 0.12, rootMargin: "32px 0px" },
    );
    io.observe(v);
    tryPlay();

    return () => {
      io.disconnect();
      v.removeEventListener("loadedmetadata", applySlow);
      v.removeEventListener("play", applySlow);
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
      if (trimStart > 0) {
        v.removeEventListener("loadedmetadata", seekToTrim);
        v.removeEventListener("loadeddata", seekToTrim);
        v.removeEventListener("ended", onEndedLoopTrim);
      }
    };
  }, [videoUrl, playbackRate, trimStart]);

  if (videoUrl) {
    const video = (
      <video
        ref={videoRef}
        className={
          coverScale
            ? "absolute left-1/2 top-1/2 min-h-full min-w-full object-cover"
            : "absolute inset-0 h-full w-full object-cover"
        }
        style={{
          ...(coverScale
            ? { transform: `translate(-50%, -50%) scale(${coverScale})` }
            : {}),
          ...(objectPosition ? { objectPosition } : {}),
        }}
        src={videoUrl}
        muted
        playsInline
        preload="auto"
        loop={trimStart === 0}
        autoPlay
        aria-label={title}
      />
    );

    if (coverScale) {
      return (
        <div className="absolute inset-0 overflow-hidden bg-black">{video}</div>
      );
    }

    return video;
  }
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
      Gorsel eklenecek
    </div>
  );
};

const ServicesSection = () => {
  const { t } = useLanguage();
  const cards = t("services.cards");
  const items = t("services.items");
  const services = useMemo(() => {
    if (Array.isArray(cards) && cards.length > 0) return cards;
    if (!Array.isArray(items)) return [];
    return items.map((item) => ({
      title: item.title,
      description: item.description,
      image: "",
    }));
  }, [cards, items]);

  return (
    <section
      id="design"
      className="relative isolate overflow-hidden bg-white py-24 sm:py-32 px-6 sm:px-12 text-black scroll-mt-24"
    >
      <ServicesBackgroundPattern />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-5xl sm:text-6xl font-medium mb-4 tracking-tight">{t("services.title")}</h2>
          {t("services.subtitle") ? (
            <p className="text-xl text-gray-700 leading-relaxed">{t("services.subtitle")}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.slice(0, 4).map((service, index) => (
            <article
              key={`service-card-${index}`}
              className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
            >
              <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                <ServiceMedia service={service} title={service.title} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">{service.title}</h3>
              {service.subtitle ? (
                <p className="mt-1 text-base sm:text-lg font-medium text-black">{service.subtitle}</p>
              ) : null}
              <p className="mt-3 whitespace-pre-line text-base sm:text-lg text-gray-700 leading-relaxed">
                {service.description}
              </p>
              {service.description2 ? (
                <p className="mt-3 whitespace-pre-line text-base sm:text-lg text-gray-700 leading-relaxed">
                  {service.description2}
                </p>
              ) : null}
              {service.description3 ? (
                <p className="mt-3 whitespace-pre-line text-base sm:text-lg text-gray-700 leading-relaxed">
                  {service.description3}
                </p>
              ) : null}
            </article>
          ))}
        </div>
        {services.length < 4 ? (
          <div className="mt-6 text-sm text-gray-500">
            Not: 4 kutu icin eksik kartlar var.
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ServicesSection;
