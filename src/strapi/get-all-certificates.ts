import type ICertificate from 'src/interfaces/Certificate';
import axios from 'src/utils/axios-cms';

export default async function getAllCertificates(): Promise<
  ICertificate[] | null
> {
  try {
    const { data } = await axios.get('/api/certificate', {
      params: {
        'populate[0]': 'certificates',
      },
    });
    return data.data.attributes.certificates.data.map((e: any) => {
      return {
        original: process.env.CMS_URL + e.attributes.url,
      };
    });
  } catch (error) {
    return null;
  }
}
