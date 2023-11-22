import type { SVGProps } from 'react';
import React from 'react';

export default function MdiArrowRightBold(
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
      <path fill="currentColor" d="M4 15V9h8V4.16L19.84 12L12 19.84V15H4Z" />
    </svg>
  );
}
