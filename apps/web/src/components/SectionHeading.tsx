import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  italicWord,
  subtitle,
  align = 'left',
  className = '',
  titleClassName = '',
}) => {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={`flex flex-col ${alignment[align]} ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/80 inline-block" />
          <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.24em] uppercase text-muted-foreground">
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal leading-[1.18] tracking-[-0.015em] text-foreground ${titleClassName}`}
      >
        {title}{' '}
        {italicWord && (
          <span className="italic font-normal text-primary font-serif">
            {italicWord}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
