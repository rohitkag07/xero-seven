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
    <div>
      <TweaksPanel />
      <PremiumHeroSection />
      <PremiumStatsSection />
      <PremiumServicesSection />
      <IndustriesSection />
      <PremiumHowItWorksSection />
      <TechPowered />
      <PremiumCTASection />
    </div>
  );
}
