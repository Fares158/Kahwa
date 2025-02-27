import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-secondary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-[#E5B94C]/20">
      <Icon className="h-10 w-10 md:h-12 md:w-12 text-[#E5B94C] mb-4" />
      <h3 className="text-lg md:text-xl font-semibold text-[#E5B94C] mb-2 font-mono">
        {title}
      </h3>
      <p className="text-sm md:text-base text-white/80">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;