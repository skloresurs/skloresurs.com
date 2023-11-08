'use client';

import React from 'react';
import Typed from 'react-typed';

interface IProps {
  title: string;
  description: string;
}

export default function ProductionsText({ title, description }: IProps) {
  return (
    <div className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 flex-col gap-8 md:right-1/2 lg:right-2/3">
      <h1>
        <Typed cursorChar="" strings={[title]} typeSpeed={40} />
      </h1>
      <p>
        <Typed cursorChar="" strings={[description]} typeSpeed={5} />
      </p>
    </div>
  );
}
