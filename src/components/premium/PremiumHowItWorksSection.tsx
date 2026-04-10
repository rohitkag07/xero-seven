import { motion } from 'framer-motion';
import { LightbulbFilament, Palette, Rocket, CheckCircle } from '@phosphor-icons/react';
import { ScrollReveal } from './ScrollReveal';
import { PremiumHeadline } from './PremiumComponents';

const steps = [
  {
    number: '01',
    icon: LightbulbFilament,
    title: 'Discover & Plan',
    description: 'We dive deep into your challenges, market, and vision. Together we craft a strategic roadmap tailored to your goals.',
    details: ['Strategic audit', 'Competitive analysis', 'Goal setting', 'Timeline planning']
  },
  {
    number: '02',
    icon: Palette,
    title: 'Design & Prototype',
    description: 'Our designers create stunning, user-centered designs. We prototype and iterate based on your feedback.',
    details: ['Wireframes', 'Visual design', 'Prototyping', 'User testing']
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Build & Optimize',
    description: 'Our engineers build with modern tech stack. We optimize for speed, security, and scalability from day one.',
    details: ['Development', 'Testing', 'Security audit', 'Performance optimization']
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Launch & Grow',
    description: 'We deploy your solution, set up analytics, and provide ongoing support. Then we help you scale.',
    details: ['Deployment', 'Analytics setup', 'Monitoring', 'Growth strategy']
  },
];

export function PremiumHowItWorksSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-20">
          <PremiumHeadline
            level={2}
            eyebrow="Our Process"
            headline="How we build your success"
            subheadline="From concept to launch—a proven, transparent process that ensures your vision becomes reality."
          />
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} delay={idx * 75}>
                {/* Connector line (hidden on last item) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-20 w-8 h-px bg-gradient-to-r from-emerald-300 to-transparent" />
                )}

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-50/0 group-hover:from-emerald-50 group-hover:to-white rounded-2xl transition-all duration-300" />

                  <div className="relative p-6 rounded-2xl border border-gray-200 group-hover:border-emerald-200 transition-colors duration-300">
                    {/* Step number */}
                    <div className="text-5xl font-light text-gray-200 group-hover:text-emerald-100 transition-colors mb-4 -tracking-wider">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-emerald-200/50 transition-all">
                      <Icon size={24} weight="duotone" className="text-emerald-700" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-950 mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Details list */}
                    <ul className="space-y-1.5">
                      {step.details.map((detail, detailIdx) => (
                        <motion.li
                          key={detailIdx}
                          initial={{ opacity: 0.5 }}
                          whileHover={{ opacity: 1, x: 2 }}
                          className="flex items-center gap-2 text-xs text-gray-600 transition-all"
                        >
                          <div className="w-1 h-1 rounded-full bg-emerald-600" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Timeline visual (mobile-friendly alternative — hidden from screen readers to avoid duplicate content) */}
        <div className="mt-20 lg:hidden" aria-hidden="true">
          <div className="space-y-0 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative flex gap-6 pb-12">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 to-emerald-100 last:hidden" />
                  
                  {/* Dot */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-emerald-300 flex items-center justify-center relative z-10">
                      <Icon size={20} weight="bold" className="text-emerald-700" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-1">
                      Step {idx + 1}
                    </p>
                    <h4 className="text-lg font-semibold text-gray-950 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
