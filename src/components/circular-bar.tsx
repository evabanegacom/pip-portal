import React from 'react';

interface CircularBarProps {
  totalCount: number;   // now treated as percentage (0–100)
  color: string;
  label?: string;
  size?: number;
}

const CircularBar: React.FC<CircularBarProps> = ({
  totalCount,
  color,
  label,
  size = 50,
}) => {
  if (totalCount <= 0) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${size * 0.12}px`,
          color: '#6b7280',
        }}
      >
        No data
      </div>
    );
  }

  const safePercent = Math.max(0, Math.min(totalCount, 100));
  const displayLabel = label || `${safePercent}%`;

  const angle = (safePercent / 100) * 360;

  const gradient = `conic-gradient(
    ${color} 0deg ${angle}deg,
    #EC9093 ${angle}deg 360deg
  )`;

  const innerRadiusPercent = 80;
  const fontScale = 0.22;

  return (
    <div className="pb-3">
      <div
        style={{
          position: 'relative',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: `
            radial-gradient(closest-side, white ${innerRadiusPercent}%, transparent ${innerRadiusPercent + 1}%),
            ${gradient}
          `,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: `${size * fontScale}px`,
            fontWeight: 'bold',
            color: '#1f2937',
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          {displayLabel}
        </div>
      </div>
    </div>
  );
};

export default CircularBar;
