import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '3.5px solid var(--charcoal)',
        background: 'var(--charcoal)',
        color: 'var(--bone)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '64px 24px' }}>
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 48,
          }}
        >
          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'var(--mustard)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2.5px solid var(--bone)',
                }}
              >
                <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 18, color: 'var(--charcoal)', lineHeight: 1 }}>X</span>
              </div>
              <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 14, color: 'var(--bone)', letterSpacing: '0.06em' }}>
                XERO SEVEN
              </span>
            </Link>
            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 13,
                lineHeight: 1.7,
                color: 'var(--bone)',
                opacity: 0.55,
                maxWidth: 280,
              }}
            >
              Indore's full-service digital agency. Websites, e-commerce, social media, photography, and AI automation — under one roof.
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {[
                { label: 'Instagram', url: 'https://www.instagram.com/xeroseven', icon: '📸' },
                { label: 'X', url: 'https://x.com/xeroseven', icon: '𝕏' },
                { label: 'LinkedIn', url: 'https://www.linkedin.com/company/xeroseven', icon: '💼' },
                { label: 'Email', url: 'mailto:hello@xeroseven.ai', icon: '✉️' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: '2px solid rgba(253,245,228,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--mustard)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,201,60,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(253,245,228,0.15)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: 'var(--mustard)',
                marginBottom: 20,
              }}
            >
              SERVICES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Website Development', path: '/services#webdev' },
                { label: 'E-Commerce Stores', path: '/services#ecommerce' },
                { label: 'Social Media', path: '/services#social' },
                { label: 'WhatsApp Automation', path: '/services#whatsapp' },
                { label: 'Photography & Video', path: '/production' },
                { label: 'Custom Software', path: '/services#saas' },
              ].map(({ label, path }) => (
                <li key={label} style={{ marginBottom: 10 }}>
                  <Link
                    to={path}
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: 13,
                      color: 'var(--bone)',
                      opacity: 0.55,
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.55'; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: 'var(--mustard)',
                marginBottom: 20,
              }}
            >
              COMPANY
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'About Us', path: '/about' },
                { label: 'All Services', path: '/services' },
                { label: 'Production Studio', path: '/production' },
                { label: 'Contact', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={label} style={{ marginBottom: 10 }}>
                  <Link
                    to={path}
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: 13,
                      color: 'var(--bone)',
                      opacity: 0.55,
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.55'; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA card */}
            <div
              style={{
                marginTop: 28,
                padding: 20,
                border: '2.5px solid rgba(253,245,228,0.12)',
                borderRadius: 20,
                background: 'rgba(255,201,60,0.06)',
              }}
            >
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  color: 'var(--bone)',
                  opacity: 0.6,
                  letterSpacing: '0.08em',
                  marginBottom: 12,
                }}
              >
                READY TO GROW YOUR BUSINESS?
              </p>
              <Link
                to="/contact"
                style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 12,
                  color: 'var(--mustard)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  letterSpacing: '0.04em',
                }}
              >
                BOOK A FREE CALL ↗
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            borderTop: '2px solid rgba(253,245,228,0.08)',
            marginTop: 48,
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              color: 'var(--bone)',
              opacity: 0.35,
              letterSpacing: '0.06em',
            }}
          >
            © 2026 XERO SEVEN AGENCY. ALL RIGHTS RESERVED.
          </p>
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              color: 'var(--bone)',
              opacity: 0.35,
              letterSpacing: '0.06em',
            }}
          >
            BASED IN INDORE, INDIA • SERVING CLIENTS WORLDWIDE
          </p>
        </div>
      </div>
    </footer>
  );
}
