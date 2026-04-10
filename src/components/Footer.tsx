import { Link } from 'react-router-dom';
import { Lightning, LinkedinLogo, XLogo, EnvelopeSimple, InstagramLogo, ArrowUpRight } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand block — 5 cols */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <Lightning weight="fill" className="w-4 h-4 text-white" />
              </div>
              <span className="font-outfit font-semibold text-base text-white tracking-tight">
                Xero Seven
              </span>
            </Link>
            <p className="font-dmsans text-zinc-500 text-sm leading-relaxed max-w-[30ch]">
              Indore's full-service digital agency. Websites, e-commerce, social media, photography, and AI automation — under one roof.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-8">
              {[
                { icon: InstagramLogo, href: 'https://www.instagram.com/xeroseven', label: 'Instagram' },
                { icon: XLogo, href: 'https://x.com/xeroseven', label: 'X / Twitter' },
                { icon: LinkedinLogo, href: 'https://www.linkedin.com/company/xeroseven', label: 'LinkedIn' },
                { icon: EnvelopeSimple, href: 'mailto:hello@xeroseven.ai', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-8 h-8 rounded-full border border-white/8 flex items-center justify-center text-zinc-600 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  <Icon weight="regular" className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Services — 3 cols */}
          <div className="md:col-span-3">
            <h4 className="font-outfit text-[10px] font-semibold text-zinc-600 uppercase tracking-[0.18em] mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Website Development', path: '/services#webdev' },
                { label: 'E-Commerce Stores', path: '/services#ecommerce' },
                { label: 'Social Media', path: '/services#social' },
                { label: 'WhatsApp Automation', path: '/services#whatsapp' },
                { label: 'Photography & Video', path: '/production' },
                { label: 'Custom Software', path: '/services#saas' },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="font-dmsans text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company — 3 cols */}
          <div className="md:col-span-3">
            <h4 className="font-outfit text-[10px] font-semibold text-zinc-600 uppercase tracking-[0.18em] mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'All Services', path: '/services' },
                { label: 'Production Studio', path: '/production' },
                { label: 'Contact', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="font-dmsans text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA nudge */}
            <div className="mt-10 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
              <p className="font-outfit text-xs text-zinc-400 mb-3 leading-relaxed">
                Ready to grow your business?
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-1.5 text-xs font-outfit font-medium text-white hover:text-zinc-300 transition-colors"
              >
                Book a free call
                <ArrowUpRight weight="bold" className="w-3 h-3 group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-dmsans text-xs text-zinc-700">
            &copy; 2026 Xero Seven Agency. All rights reserved.
          </p>
          <p className="font-dmsans text-xs text-zinc-700">
            Based in Indore, India &middot; Serving clients worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
