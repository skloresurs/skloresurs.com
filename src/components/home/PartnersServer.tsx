import React from 'react';

import getAllPartners from '@/strapi/get-all-partners';

import Partners from './Partners';

// ! After added feedbacks, add bg-background-alternative to first div

export default async function PartnersServer() {
  const partners = await getAllPartners();
  return (
    <div className="mt-6">
      <div className="mx-auto max-w-6xl px-6">
        {partners && <Partners partners={partners} />}
      </div>
    </div>
  );
}
