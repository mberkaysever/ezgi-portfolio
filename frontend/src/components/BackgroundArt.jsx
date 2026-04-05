export default function BackgroundArt() {
  const src = `${process.env.PUBLIC_URL || ""}/desen.upscaled.png`;

  return (
    <div className="background-art" aria-hidden="true">
      <img
        src={src}
        alt=""
        decoding="async"
        fetchPriority="low"
        draggable={false}
      />
    </div>
  );
}