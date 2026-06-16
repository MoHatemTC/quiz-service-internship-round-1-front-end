import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export default function MetricCard({ label, value, icon, trend }: MetricCardProps) {
  return (
    <div className="bg-[#1F1F33] border border-[#2D2D42] rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-[#A1A1AA]">{label}</span>
        {icon && <div className="text-[#8B5CF6]">{icon}</div>}
      </div>

      <div className="flex items-end gap-3">
        <h3 className="text-3xl font-bold text-[#F4F4F5]">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        {trend && (
          <span
            className={`text-sm font-medium mb-1 ${
              trend.direction === 'up' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend.direction === 'up' ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}
