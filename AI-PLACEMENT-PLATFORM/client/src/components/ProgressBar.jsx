import React from 'react';

export default function ProgressBar({ label, value, color = 'bg-teal' }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-muted">{value}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-ink/10 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
