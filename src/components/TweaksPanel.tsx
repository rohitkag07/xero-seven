import { useState } from 'react';
import { useThemeStore } from '../stores/useThemeStore';
import type { Theme } from '../stores/useThemeStore';
import { XIcon } from '@phosphor-icons/react';

const themes: { id: Theme; label: string; key: string }[] = [
  { id: 'sun',    label: 'SUN LORD', key: 'A' },
  { id: 'nebula', label: 'NEBULA',   key: 'B' },
  { id: 'pop',    label: 'POP',      key: 'C' },
];

export function TweaksPanel() {
  const { theme, grain, sparkles, setTheme, setGrain, setSparkles } = useThemeStore();
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 9999,
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'var(--bone)',
            border: '3px solid var(--charcoal)',
            borderRadius: 14,
            padding: '12px 20px',
            minHeight: 44,
            fontSize: 11,
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 700,
            color: 'var(--charcoal)',
            cursor: 'pointer',
            boxShadow: '4px 4px 0 var(--charcoal)',
            letterSpacing: '0.08em',
          }}
        >
          TWEAKS
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          style={{
            background: 'var(--bone)',
            border: '3px solid var(--charcoal)',
            borderRadius: 20,
            padding: '18px 20px 20px',
            width: 200,
            boxShadow: '6px 6px 0 var(--charcoal)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--charcoal)' }}>
              TWEAKS
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 10,
                background: 'var(--charcoal)',
                color: 'var(--bone)',
                borderRadius: 6,
                padding: '2px 7px',
                letterSpacing: '0.06em',
              }}>V7.02</span>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--charcoal)', lineHeight: 1,
                  padding: '6px', margin: '-6px',
                  minWidth: 32, minHeight: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              ><XIcon weight="bold" size={14} /></button>
            </div>
          </div>

          {/* Aesthetic label */}
          <p style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--charcoal)', opacity: 0.6, marginBottom: 8 }}>
            AESTHETIC
          </p>

          {/* Theme buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                style={{
                  background: theme === t.id ? 'var(--charcoal)' : 'transparent',
                  color: theme === t.id ? 'var(--bone)' : 'var(--charcoal)',
                  border: '2.5px solid var(--charcoal)',
                  borderRadius: 10,
                  padding: '8px 4px',
                  fontSize: 9,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  lineHeight: 1.4,
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                {t.key}<br />{t.label}
              </button>
            ))}
          </div>

          {/* Grain toggle */}
          <label style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 10, letterSpacing: '0.08em', color: 'var(--charcoal)',
            cursor: 'pointer', marginBottom: 10,
          }}>
            <span>GRAIN</span>
            <input
              type="checkbox"
              checked={grain}
              onChange={(e) => setGrain(e.target.checked)}
              style={{ accentColor: 'var(--mustard)', width: 16, height: 16, cursor: 'pointer' }}
            />
          </label>

          {/* Sparkles toggle */}
          <label style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 10, letterSpacing: '0.08em', color: 'var(--charcoal)',
            cursor: 'pointer',
          }}>
            <span>SPARKLES</span>
            <input
              type="checkbox"
              checked={sparkles}
              onChange={(e) => setSparkles(e.target.checked)}
              style={{ accentColor: 'var(--mustard)', width: 16, height: 16, cursor: 'pointer' }}
            />
          </label>
        </div>
      )}
    </div>
  );
}
