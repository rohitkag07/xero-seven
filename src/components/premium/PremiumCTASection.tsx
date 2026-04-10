import { motion } from 'framer-motion';
import { CalendarCheck, Phone, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from './ScrollReveal';
import { DoubleBevel } from './PremiumComponents';

export function PremiumCTASection() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <DoubleBevel>
            <div className="p-12 md:p-16 text-center space-y-8">
              {/* Headline */}
              <div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-950 -tracking-wider mb-4">
                  Ready to transform your business?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Join 180+ brands that trusted us to build their digital future. Your free strategy session is just a click away.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-950 text-white font-medium hover:bg-gray-800 transition-all"
                  >
                    <CalendarCheck size={20} weight="bold" />
                    Book a Free Call
                    <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
                <a href="tel:+919000000000" aria-label="Call us">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition-all"
                  >
                    <Phone size={20} weight="bold" />
                    Call Us
                  </motion.span>
                </a>
              </div>

              {/* Social proof */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-200 to-blue-200 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span>Join 180+ happy clients</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-300" />
                <span>Response time: Under 2 hours</span>
              </div>
            </div>
          </DoubleBevel>
        </ScrollReveal>
      </div>
    </section>
  );
}
