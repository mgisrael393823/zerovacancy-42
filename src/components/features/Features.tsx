
import { features } from "./feature-data";
import { FeatureItem } from "./FeatureItem";
import { FeatureHeader } from "./FeatureHeader";
import { BackgroundEffects } from "./BackgroundEffects";

export function FeaturesSectionWithHoverEffects() {
  return (
    <section className="relative py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <FeatureHeader 
          title="Professional Content Creation Services"
          description="Everything you need to showcase your properties with stunning visuals and engaging content"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Export both named and default export for backward compatibility
export default FeaturesSectionWithHoverEffects;
