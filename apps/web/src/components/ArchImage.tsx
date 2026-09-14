import React from 'react';

interface ArchImageProps {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[9/16]'
  className?: string;
  caption?: string;
  subcaption?: string;
  badge?: string;
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  doubleRing?: boolean;
  priority?: boolean;
}

export const ArchImage: React.FC<ArchImageProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-[3/4]',
  className = '',
  caption,
  subcaption,
  badge,
  badgePosition = 'top-right',
  doubleRing = true,
}) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Outer subtle ring wrapper */}
      <div
        className={`relative p-[3px] rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[220px] rounded-b-none ${
          doubleRing
            ? 'bg-gradient-to-b from-primary/40 via-primary/15 to-transparent'
            : 'border border-border'
        }`}
      >
        {/* Inner spacing container creating the double-stroke architectural frame */}
        <div className="relative p-[3px] bg-background rounded-t-[136px] sm:rounded-t-[176px] lg:rounded-t-[216px] rounded-b-none overflow-hidden">
          {/* Main Image Container */}
          <div
            className={`relative w-full ${aspectRatio} overflow-hidden rounded-t-[132px] sm:rounded-t-[172px] lg:rounded-t-[212px] rounded-b-none bg-card`}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.92] contrast-[1.03]"
              loading="lazy"
            />

            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20 pointer-events-none" />

            {/* Optional badge */}
            {badge && (
              <div
                className={`absolute ${
                  badgePosition === 'top-right'
                    ? 'top-6 right-6'
                    : badgePosition === 'top-left'
                    ? 'top-6 left-6'
                    : badgePosition === 'bottom-left'
                    ? 'bottom-6 left-6'
                    : 'bottom-6 right-6'
                } z-10`}
              >
                <span className="px-3.5 py-1.5 rounded-full text-[10px] uppercase font-semibold tracking-[0.2em] bg-background/80 backdrop-blur-md text-primary border border-primary/30 shadow-lg">
                  {badge}
                </span>
              </div>
            )}

            {/* Bottom caption overlay */}
            {(caption || subcaption) && (
              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col items-start bg-background/85 backdrop-blur-md p-3.5 px-4 rounded-xl border border-border">
                {caption && (
                  <p className="text-xs font-serif font-medium text-foreground tracking-wide">
                    {caption}
                  </p>
                )}
                {subcaption && (
                  <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-[0.18em] mt-0.5">
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
