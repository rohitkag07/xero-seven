interface DoubleBevelProps {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
}

export function DoubleBevel({ children, className = '', glassEffect = false }: DoubleBevelProps) {
  return (
    <div
      className={`
        rounded-[2rem] p-1.5 bg-black/[0.03]
        ring-1 ring-black/[0.06] transition-all duration-300
        ${className}
      `}
    >
      <div
        className={`
          rounded-[calc(2rem-0.375rem)] bg-white/95 
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
          overflow-hidden transition-all duration-300
          ${glassEffect ? 'backdrop-blur-xl' : ''}
        `}
      >
        {children}
      </div>
    </div>
  );
}

// Premium card for service grid
export function PremiumCard({ 
  icon: Icon,
  title, 
  tagline, 
  description,
  features,
  color = 'emerald',
  onClick,
  isSelected = false
}: {
  icon: any;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  color?: 'emerald' | 'amber' | 'blue' | 'violet' | 'rose' | 'cyan' | 'indigo' | 'orange';
  onClick?: () => void;
  isSelected?: boolean;
}) {
  const colorMap = {
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-700', accentBg: 'bg-emerald-100/50' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', accent: 'text-amber-700', accentBg: 'bg-amber-100/50' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'text-blue-700', accentBg: 'bg-blue-100/50' },
    violet: { bg: 'bg-violet-50', border: 'border-violet-200', accent: 'text-violet-700', accentBg: 'bg-violet-100/50' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-200', accent: 'text-rose-700', accentBg: 'bg-rose-100/50' },
    cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', accent: 'text-cyan-700', accentBg: 'bg-cyan-100/50' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', accent: 'text-indigo-700', accentBg: 'bg-indigo-100/50' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', accent: 'text-orange-700', accentBg: 'bg-orange-100/50' },
  };

  const colors = colorMap[color];

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } }}
      className={`
        group cursor-pointer rounded-2xl p-0.75 transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
        ${isSelected ? 'ring-2 ring-black/10' : 'ring-1 ring-black/5'}
        hover:ring-2 hover:ring-black/10 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]
      `}
    >
      <div className={`p-6 rounded-[calc(1.5rem-0.375rem)] ${colors.bg} border border-black/[0.06]`}>
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.accentBg} mb-4`}>
          <Icon size={24} weight="duotone" className={colors.accent} />
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-1">
          {title}
        </h3>
        <p className={`text-sm ${colors.accent} font-medium mb-3`}>
          {tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Features (first 2) */}
        <div className="space-y-2">
          {features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${colors.accentBg}`} />
              <span className="text-xs text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between group/btn">
          <span className={`text-xs font-medium uppercase tracking-wider ${colors.accent}`}>
            Learn More
          </span>
          <div className={`w-6 h-6 rounded-full ${colors.accentBg} flex items-center justify-center transition-all duration-200 group-hover/btn:translate-x-0.5`}>
            <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero headline component
export function PremiumHeadline({
  eyebrow,
  headline,
  subheadline,
  level = 1,
}: {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  level?: 1 | 2 | 3;
}) {
  const headingClass = "text-5xl md:text-6xl font-light text-gray-950 leading-[1.1] -tracking-wider mb-4";
  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3';

  return (
    <div className="max-w-4xl">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 border border-emerald-200 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span className="text-xs font-medium uppercase tracking-wider text-emerald-700">
            {eyebrow}
          </span>
        </div>
      )}
      <HeadingTag className={headingClass}>
        {headline}
      </HeadingTag>
      {subheadline && (
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
          {subheadline}
        </p>
      )}
    </div>
  );
}
