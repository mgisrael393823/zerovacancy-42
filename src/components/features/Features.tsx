
import { features } from "./feature-data";
import { FeatureHeader } from "./FeatureHeader";
import { BackgroundEffects } from "./BackgroundEffects";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { featureIcons } from "./feature-colors";

export function FeaturesSectionWithHoverEffects() {
  return (
    <section className="relative py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <FeatureHeader 
          title="Professional Content Creation Services"
          description="Everything you need to showcase your properties with stunning visuals and engaging content"
        />
        
        <BentoGrid>
          {features.map((feature, index) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons];
            return (
              <BentoCard
                key={index}
                name={feature.title}
                Icon={Icon}
                description={feature.description}
                className=""
                href="#"
                cta="Learn more"
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}

// Export both named and default export for backward compatibility
export default FeaturesSectionWithHoverEffects;
