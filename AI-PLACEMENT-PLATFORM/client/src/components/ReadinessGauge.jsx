import React from 'react';

// Circular readiness meter — the product's signature visual.
export default function ReadinessGauge({ value = 0, size = 180, label = 'Placement Readiness' }) {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#2A3157" strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#FFB020" strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="-mt-[104px] flex flex-col items-center">
        <span className="text-4xl font-display font-bold text-paper">{value}%</span>
      </div>
      <span className="mt-4 text-sm text-paper/70">{label}</span>
    </div>
  );
}
