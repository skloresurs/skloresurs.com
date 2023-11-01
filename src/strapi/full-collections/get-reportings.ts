import type IReporting from '@/types/Reporting';
import axios from '@/utils/axios-cms';

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
      finance: process.env.CMS_URL + e.attributes.finance.data.attributes.url,
      auditory: process.env.CMS_URL + e.attributes.auditory.data.attributes.url,
    }));
  } catch (error) {
    return null;
  }
}
