import React from 'react';

export function FlagMexico({ size = 13, className = '' }) {
  const width = Math.round(size * 1.38);
  const height = size;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`minimal-flag-svg ${className}`}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <defs>
        <clipPath id="mex-rounded">
          <rect width="20" height="14" rx="2.5" />
        </clipPath>
      </defs>
      <g clipPath="url(#mex-rounded)">
        <rect width="6.67" height="14" fill="#006341" />
        <rect x="6.67" width="6.66" height="14" fill="#FFFFFF" />
        <rect x="13.33" width="6.67" height="14" fill="#C8102E" />
        {/* Minimalist Mexican eagle / crest */}
        <circle cx="10" cy="7" r="1.5" fill="#8B572A" />
        <circle cx="10" cy="7" r="0.9" fill="#D4AF37" />
        <path
          d="M8.8 8.4C9.4 9 10.6 9 11.2 8.4"
          stroke="#006341"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </g>
      <rect
        width="20"
        height="14"
        rx="2.5"
        stroke="rgba(0,0,0,0.14)"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

export function FlagUSA({ size = 13, className = '' }) {
  const width = Math.round(size * 1.38);
  const height = size;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`minimal-flag-svg ${className}`}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <defs>
        <clipPath id="usa-rounded">
          <rect width="20" height="14" rx="2.5" />
        </clipPath>
      </defs>
      <g clipPath="url(#usa-rounded)">
        {/* 7 Red and 6 White Stripes */}
        <rect width="20" height="14" fill="#FFFFFF" />
        <rect y="0" width="20" height="2" fill="#B22234" />
        <rect y="4" width="20" height="2" fill="#B22234" />
        <rect y="8" width="20" height="2" fill="#B22234" />
        <rect y="12" width="20" height="2" fill="#B22234" />
        {/* Blue Canton */}
        <rect width="8.8" height="8" fill="#1C3574" />
        {/* Minimalist stars layout */}
        <circle cx="2.2" cy="2" r="0.6" fill="#FFFFFF" />
        <circle cx="4.4" cy="2" r="0.6" fill="#FFFFFF" />
        <circle cx="6.6" cy="2" r="0.6" fill="#FFFFFF" />
        <circle cx="3.3" cy="4" r="0.6" fill="#FFFFFF" />
        <circle cx="5.5" cy="4" r="0.6" fill="#FFFFFF" />
        <circle cx="2.2" cy="6" r="0.6" fill="#FFFFFF" />
        <circle cx="4.4" cy="6" r="0.6" fill="#FFFFFF" />
        <circle cx="6.6" cy="6" r="0.6" fill="#FFFFFF" />
      </g>
      <rect
        width="20"
        height="14"
        rx="2.5"
        stroke="rgba(0,0,0,0.14)"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}
