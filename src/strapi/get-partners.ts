import { env } from '@/env.mjs';
import type IPartner from '@/types/Partner';
import axios from '@/utils/axios-cms';

interface IPartnerServer {
  id: number;
  title: string;
  logo: {
    data: {
      attributes: {
        height: number;
        url: string;
        width: number;
      };
    };
  };
}
/**
 * Retrieves a list of partners from the API.
 *
 * @return {Promise<IPartner[] | null>} A Promise that resolves to an array of IPartner objects, or null if there was an error.
 */
export default async function getPartners(): Promise<IPartner[] | null> {
  try {
    const { data } = await axios.get('/api/partner', {
      params: {
        'populate[0]': 'logos',
        'populate[logos][populate][0]': 'logo',
      },
    });
    return data.data.attributes.logos.map((e: IPartnerServer) => ({
      height: e.logo.data.attributes.height,
      id: e.id,
      title: e.title,
      url: env.CMS_URL + e.logo.data.attributes.url,
      width: e.logo.data.attributes.width,
    }));
  } catch (error) {
    return null;
  }
}
