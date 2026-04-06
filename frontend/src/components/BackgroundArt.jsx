import { useEffect, useRef, useState } from "react";

const publicUrl = process.env.PUBLIC_URL || "";

export default function BackgroundArt() {
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
    <div className="background-art" aria-hidden="true">
      <div className="background-art__layer background-art__layer--gradient" />
      <div className="background-art__layer background-art__layer--grain" />
      <div ref={motionRef} className="background-art__motion">
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
      <div className="background-art__layer background-art__layer--blobs" />
    </div>
  );
}
