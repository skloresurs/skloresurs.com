import { env } from '@/env.mjs';
import type IReporting from '@/types/Reporting';
import axios from '@/utils/axios-cms';

/**
 * Retrieves a list of reportings.
 *
 * @return The reportings data or null if there was an error.
 */
export default async function getReportings(): Promise<IReporting[] | null> {
  try {
    const { data } = await axios.get('/api/reportings', {
      params: {
        'populate[0]': 'auditory',
        'populate[1]': 'finance',
      },
    });
    return data.data.map((e: any) => ({
      year: e.attributes.year,
      finance: env.CMS_URL + e.attributes.finance.data.attributes.url,
      auditory: env.CMS_URL + e.attributes.auditory.data.attributes.url,
    }));
  } catch (error) {
    return null;
  }
}
