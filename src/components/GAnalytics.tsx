'use client';

import { GoogleAnalytics } from 'nextjs-google-analytics';
import React from 'react';

function GAnalytics() {
  return <GoogleAnalytics trackPageViews />;
}

export { GAnalytics };
