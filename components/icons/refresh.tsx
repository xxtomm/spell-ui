import React, { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
};

function RefreshAnticlockwise({
  fill = 'currentColor',
  strokewidth = 2,
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        d="M5 4V7C5 7.55228 5.44772 8 6 8H8.75M19.0118 20V17C19.0118 16.4477 18.5641 16 18.0118 16H15.0118M4 12C4 16.4183 7.58172 20 12 20C14.6362 20 17.0303 18.7249 18.5 16.7578M20 12C20 7.58172 16.4183 4 12 4C9.36378 4 6.96969 5.27512 5.5 7.24224"
        stroke={fill}
        strokeWidth={strokewidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RefreshAnticlockwise;
