import { motion } from 'framer-motion';
import { ArrowRight, Rocket, CheckCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from './ScrollReveal';
import { PremiumHeadline, DoubleBevel } from './PremiumComponents';

export function PremiumHeroSection() {
  return (
    <section className="min-h-[100dvh] bg-gradient-to-br from-white via-gray-50/50 to-white flex items-center justify-center relative overflow-hidden pt-20">
      {/* Ambient background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-20 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-emerald-50/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Headline & CTA */}
          <ScrollReveal>
            <div>
              <PremiumHeadline
                eyebrow="AI-Powered Agency"
                headline="Build your empire faster"
                subheadline="Design, develop, automate, and scale—all powered by cutting-edge AI agents and expert human craftsmanship."
              />

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex px-6 py-3 rounded-lg bg-gray-950 text-white font-medium hover:bg-gray-800 transition-all items-center justify-center gap-2"
                  >
                    Start Your Project
                    <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
                <Link to="/demo">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex px-6 py-3 rounded-lg border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition-all items-center justify-center"
                  >
                    Watch Demo
                  </motion.span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 space-y-2">
                {[
                  'No long-term contracts',
                  'Money-back guarantee',
                  'Dedicated support team'
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle size={16} weight="fill" className="text-emerald-600 flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Visual showcase */}
          <ScrollReveal delay={150}>
            <div className="relative">
              {/* Main showcase card */}
              <DoubleBevel glassEffect className="aspect-square">
                <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-100/50 border border-emerald-200">
                      <Rocket size={40} weight="duotone" className="text-emerald-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Xero Seven</p>
                      <p className="text-sm text-gray-600">AI Agency Platform</p>
                    </div>
                  </div>
                </div>
              </DoubleBevel>

              {/* Floating stats cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-40"
              >
                <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-lg">
                  <p className="text-xs text-gray-600 mb-1">AI Agents Active</p>
                  <p className="text-2xl font-bold text-gray-950">12</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-48"
              >
                <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-lg">
                  <p className="text-xs text-gray-600 mb-1">Projects Completed</p>
                  <p className="text-2xl font-bold text-gray-950">250+</p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
