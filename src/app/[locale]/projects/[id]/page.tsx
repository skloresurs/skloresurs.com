import React from 'react';

import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import UnderConstruction from '@/components/UnderConstruction';

export default async function Projects() {
  return (
    <PageTransitionWrapper>
      <UnderConstruction />
    </PageTransitionWrapper>
  );
}
