import React, { useState } from 'react';

const CustomChart = ({ type = 'line', data = [], color = '#00e676', labels = [], height = 200 }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (type === 'circular') {
    // --- CONCENTRIC GLOWING CIRCULAR DIAL ---
    const score = data[0] || 0;
    const size = 150;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div style={styles.circularContainer}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Glow circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0px 0px 8px ${color}80)`,
              transition: 'stroke-dashoffset 0.8s ease-in-out'
            }}
          />
        </svg>
        <div style={styles.circularLabel}>
          <span style={{ ...styles.circularNumber, color }}>{score}%</span>
          <span style={styles.circularSubtext}>Score</span>
        </div>
      </div>
    );
  }

  if (type === 'bar') {
    // --- WEEKLY ROUNDED BAR CHART ---
    const maxVal = Math.max(...data, 100);
    return (
      <div style={{ ...styles.chartWrapper, height }}>
        <div style={styles.barGrid}>
          {data.map((val, idx) => {
            const pct = (val / maxVal) * 85; // Max 85% height to leave room for labels
            const isHovered = hoveredIdx === idx;
            return (
              <div 
                key={idx} 
                style={styles.barCol}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Tooltip value */}
                <div style={{
                  ...styles.barTooltip,
                  opacity: isHovered ? 1 : 0,
                  transform: `translateY(${isHovered ? '-4px' : '4px'})`
                }}>
                  {val.toLocaleString()}
                </div>
                {/* Visual Bar */}
                <div style={{
                  ...styles.barFill,
                  height: `${pct}%`,
                  backgroundColor: isHovered ? color : 'rgba(255,255,255,0.08)',
                  borderColor: isHovered ? color : 'rgba(255,255,255,0.15)',
                  boxShadow: isHovered ? `0 0 15px ${color}50` : 'none'
                }} />
                <span style={styles.barLabel}>{labels[idx] || ''}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- SMOOTH BEZIER LINE CHART ---
  if (data.length === 0) return null;

  const chartWidth = 500;
  const chartHeight = height;
  const padding = 35;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  // Calculate pixel coordinates for dots
  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - ((val - minVal) / range) * (chartHeight - padding * 2);
    return { x, y, val };
  });

  // Build SVG Bezier Path String
  let pathStr = '';
  if (points.length > 0) {
    pathStr = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const cpX1 = p1.x + (p2.x - p1.x) / 3;
      const cpY1 = p1.y;
      const cpX2 = p1.x + 2 * (p2.x - p1.x) / 3;
      const cpY2 = p2.y;
      pathStr += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p2.x} ${p2.y}`;
    }
  }

  // Area under line for gradients
  const areaPathStr = points.length > 0 
    ? `${pathStr} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z` 
    : '';

  return (
    <div style={{ ...styles.chartWrapper, height }}>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.5, 1].map((r, i) => {
          const y = padding + r * (chartHeight - padding * 2);
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={chartWidth - padding}
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="4"
            />
          );
        })}

        {/* Area fill */}
        <path d={areaPathStr} fill={`url(#grad-${color.replace('#','')})`} />

        {/* Line */}
        <path
          d={pathStr}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          style={{ filter: `drop-shadow(0px 4px 8px ${color}35)` }}
        />

        {/* Interactive points */}
        {points.map((pt, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <g key={idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 8 : 4}
                fill={isHovered ? '#ffffff' : color}
                stroke={color}
                strokeWidth="2.5"
                style={{ cursor: 'pointer', transition: 'r 0.2s ease' }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              {/* Tooltip value */}
              {isHovered && (
                <g>
                  <rect
                    x={pt.x - 30}
                    y={pt.y - 35}
                    width="60"
                    height="24"
                    rx="5"
                    fill="rgba(10, 10, 15, 0.95)"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 19}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10px"
                    fontFamily="'Outfit', sans-serif"
                    fontWeight="bold"
                  >
                    {pt.val.toFixed(1)}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Labels */}
        {labels.map((lbl, idx) => {
          const x = padding + (idx / (labels.length - 1)) * (chartWidth - padding * 2);
          return (
            <text
              key={idx}
              x={x}
              y={chartHeight - 8}
              textAnchor="middle"
              fill="rgba(255,255,255,0.4)"
              fontSize="9.5px"
              fontFamily="'Inter', sans-serif"
            >
              {lbl}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const styles = {
  chartWrapper: {
    width: '100%',
    position: 'relative'
  },
  circularContainer: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circularLabel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  circularNumber: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.8rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    lineHeight: '1.1'
  },
  circularSubtext: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: '#9ca3af',
    letterSpacing: '0.05em'
  },
  barGrid: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: '10px 10px 0 10px'
  },
  barCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '12%',
    height: '100%',
    justifyContent: 'flex-end',
    cursor: 'pointer',
    position: 'relative'
  },
  barFill: {
    width: '100%',
    borderRadius: '12px 12px 4px 4px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    minHeight: '4px'
  },
  barLabel: {
    fontSize: '9.5px',
    color: '#9ca3af',
    marginTop: '8px',
    fontFamily: "'Inter', sans-serif"
  },
  barTooltip: {
    position: 'absolute',
    top: '-25px',
    backgroundColor: '#0a0a0f',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px',
    padding: '2px 6px',
    color: '#fff',
    fontSize: '9px',
    fontWeight: 'bold',
    fontFamily: "'Outfit', sans-serif",
    zIndex: 10,
    transition: 'opacity 0.2s, transform 0.2s',
    pointerEvents: 'none'
  }
};

export default CustomChart;
