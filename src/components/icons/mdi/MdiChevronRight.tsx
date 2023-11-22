import type { SVGProps } from 'react';
import React from 'react';

export default function MdiChevronRight(
  props: Readonly<SVGProps<SVGSVGElement>>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z"
      />
    </svg>
  );
}
