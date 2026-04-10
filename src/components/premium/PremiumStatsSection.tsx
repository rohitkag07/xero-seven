import { motion } from 'framer-motion';
import { Users, Target, Rocket, Trophy } from '@phosphor-icons/react';
import { ScrollReveal } from './ScrollReveal';

const stats = [
  {
    icon: Users,
    number: '180+',
    label: 'Happy Clients',
    description: 'Across tech, healthcare, retail, and more'
  },
  {
    icon: Target,
    number: '95%',
    label: 'Success Rate',
    description: 'Projects delivered on-time and on-budget'
  },
  {
    icon: Rocket,
    number: '500+',
    label: 'Projects Launched',
    description: 'From MVPs to enterprise platforms'
  },
  {
    icon: Trophy,
    number: '12+',
    label: 'Years Combined',
    description: 'Team expertise in digital innovation'
  },
];

export function PremiumStatsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" aria-label="Agency stats">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Our Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 75}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="text-center"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 mb-4 mx-auto">
                    <Icon size={32} weight="duotone" className="text-emerald-700" />
                  </div>

                  {/* Number (animated counter) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-light text-gray-950 -tracking-wider mb-1"
                  >
                    {stat.number}
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600">
                    {stat.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
