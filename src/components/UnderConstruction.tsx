import Image from 'next/image';
import React from 'react';

export default async function UnderConstruction() {
  return (
    <div className="container flex flex-1 flex-col items-center">
      <Image
        src="/under-constructions.svg"
        width={600}
        height={500}
        alt="Under construction"
        title="Under construction"
      />
      <h1>Under construction</h1>
    </div>
  );
}
