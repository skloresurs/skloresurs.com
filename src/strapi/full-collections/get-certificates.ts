import type ICertificate from '@/types/Certificate';
import axios from '@/utils/axios-cms';

/**
 * Retrieves the certificates.
 *
 * @returns The retrieved certificates or null if an error occurred.
 */
export default async function getCertificates(): Promise<
  ICertificate[] | null
> {
  try {
    const { data } = await axios.get('/api/certificate', {
      params: {
        'populate[0]': 'certificates',
      },
    });
    return data.data.attributes.certificates.data.map((e: any) => ({
      original: process.env.CMS_URL + e.attributes.url,
    }));
  } catch (error) {
    return null;
  }
}
