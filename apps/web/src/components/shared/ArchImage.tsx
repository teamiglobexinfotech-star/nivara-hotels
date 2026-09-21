import React from "react";

interface ArchImageProps {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[9/16]'
  className?: string;
  caption?: string;
  subcaption?: string;
  badge?: string;
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  doubleRing?: boolean;
  priority?: boolean;
}

export const ArchImage: React.FC<ArchImageProps> = ({
  src,
  alt,
  aspectRatio = "aspect-[3/4]",
  className = "",
  caption,
  subcaption,
  badge,
  badgePosition = "top-right",
  doubleRing = true,
}) => {
  return (
    <div className={`group relative ${className}`}>
      {/* Outer subtle ring wrapper */}
      <div
        className={`relative rounded-t-[140px] rounded-b-none p-0.75 sm:rounded-t-[180px] lg:rounded-t-[220px] ${
          doubleRing
            ? "bg-linear-to-b from-primary/40 via-primary/15 to-transparent"
            : "border border-border"
        }`}
      >
        {/* Inner spacing container creating the double-stroke architectural frame */}
        <div className="relative overflow-hidden rounded-t-[136px] rounded-b-none bg-background p-0.75 sm:rounded-t-[176px] lg:rounded-t-[216px]">
          {/* Main Image Container */}
          <div
            className={`relative w-full ${aspectRatio} overflow-hidden rounded-t-[132px] rounded-b-none bg-card sm:rounded-t-[172px] lg:rounded-t-[212px]`}
          >
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover object-center brightness-[0.92] contrast-[1.03] filter transition-transform duration-1000 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Subtle atmospheric vignette */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-background/20" />

            {/* Optional badge */}
            {badge && (
              <div
                className={`absolute ${
                  badgePosition === "top-right"
                    ? "top-6 right-6"
                    : badgePosition === "top-left"
                      ? "top-6 left-6"
                      : badgePosition === "bottom-left"
                        ? "bottom-6 left-6"
                        : "right-6 bottom-6"
                } z-10`}
              >
                <span className="rounded-full border border-primary/30 bg-background/80 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-primary uppercase shadow-lg backdrop-blur-md">
                  {badge}
                </span>
              </div>
            )}

            {/* Bottom caption overlay */}
            {(caption || subcaption) && (
              <div className="absolute right-4 bottom-4 left-4 z-10 flex flex-col items-start rounded-xl border border-border bg-background/85 p-3.5 px-4 backdrop-blur-md">
                {caption && (
                  <p className="font-serif text-xs font-medium tracking-wide text-foreground">
                    {caption}
                  </p>
                )}
                {subcaption && (
                  <p className="mt-0.5 font-sans text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    {subcaption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
