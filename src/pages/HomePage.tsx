import {
  PremiumHeroSection,
  PremiumStatsSection,
  PremiumServicesSection,
  PremiumHowItWorksSection,
  PremiumCTASection
} from '../components/premium';
import IndustriesSection from '../components/IndustriesSection';
import TechPowered from '../components/TechPowered';

export default function HomePage() {
  return (
    <div className="bg-white">
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
