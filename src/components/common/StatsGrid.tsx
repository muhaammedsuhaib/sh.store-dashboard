import React from "react";
import StatsCard from "./StatsCard";

interface StatsGridProps {
  stats: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    bgColor?: string;
    iconColor?: string;
  }[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
