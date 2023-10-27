import React from 'react';

import getPartners from '@/strapi/full-collections/get-partners';

import Partners from './Partners';

// ! After added feedbacks, add bg-background-alternative to first div

export default async function PartnersServer() {
  const partners = await getPartners();
  return (
    <div className="mt-6">
      <div className="mx-auto max-w-6xl px-6">
        {partners && <Partners partners={partners} />}
      </div>
    </div>
  );
}
