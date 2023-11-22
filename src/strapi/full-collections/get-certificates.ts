import { env } from '@/env.mjs';
import type ICertificate from '@/types/Certificate';
import axios from '@/utils/axios-cms';

interface ICertificateServer {
  attributes: {
    url: string;
  };
}

/**
 * Retrieves the list of certificates from the server.
 *
 * @return {Promise<ICertificate[] | null>} The list of certificates or null if there was an error.
 */
export default async function getCertificates(): Promise<
  ICertificate[] | null
> {
  try {
    const { data } = await axios.get('/api/certificate', {
      params: {
        populate: '*',
      },
    });
    return data.data.attributes.certificates.data.map(
      (e: ICertificateServer) => ({
        original: env.CMS_URL + e.attributes.url,
      })
    );
  } catch (error) {
    return null;
  }
}
