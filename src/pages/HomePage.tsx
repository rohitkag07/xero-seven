import {
  PremiumHeroSection,
  PremiumStatsSection,
  PremiumServicesSection,
  PremiumHowItWorksSection,
  PremiumCTASection
} from '../components/premium';
import IndustriesSection from '../components/IndustriesSection';
import TechPowered from '../components/TechPowered';
import { TweaksPanel } from '../components/TweaksPanel';

export default function HomePage() {
  return (
    <div style={{ background: 'var(--mustard)', minHeight: '100dvh' }}>
      <TweaksPanel />
      <div className="pt-24">
        <PremiumHeroSection />
      </div>
      <PremiumStatsSection />
      <PremiumServicesSection />
      <IndustriesSection />
      <PremiumHowItWorksSection />
      <TechPowered />
      <PremiumCTASection />
    </div>
  );
}
