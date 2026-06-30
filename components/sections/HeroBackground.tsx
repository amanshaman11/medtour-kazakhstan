import { HERO_VIDEO_SRC } from "@/lib/constants/media";

/** Server-rendered so the browser starts fetching the hero video with the initial HTML. */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 bg-navy-900">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="absolute inset-0 gradient-kz-hero" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-kz-blue/60 to-transparent" />
      <div className="absolute right-0 top-1/3 bottom-1/3 w-1 bg-gradient-to-b from-transparent via-kz-gold/50 to-transparent" />
    </div>
  );
}
