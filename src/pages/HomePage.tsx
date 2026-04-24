import { useEffect } from 'react';
import {
  PremiumHeroSection,
  PremiumStatsSection,
  PremiumServicesSection,
  PremiumHowItWorksSection,
  PremiumCTASection,
  PremiumWorkSection
} from '../components/premium';
import IndustriesSection from '../components/IndustriesSection';
import TechPowered from '../components/TechPowered';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Xero Seven — AI-Powered Digital Agency in Indore';
  }, []);

  return (
    <div style={{ background: 'var(--mustard)', minHeight: '100dvh' }}>
      <PremiumHeroSection />
      <PremiumStatsSection />
      <PremiumServicesSection />
      <IndustriesSection />
      <PremiumWorkSection />
      <PremiumHowItWorksSection />
      <TechPowered />
      <PremiumCTASection />
    </div>
  );
}
