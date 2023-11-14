import { env } from '@/env.mjs';
import type IPartner from '@/types/Partner';
import axios from '@/utils/axios-cms';

/**
 * Retrieves the list of partners.
 *
 * @return The list of partners or null if there was an error.
 */
export default async function getPartners(): Promise<IPartner[] | null> {
  try {
    const { data } = await axios.get('/api/partner', {
      params: {
        'populate[0]': 'logos',
        'populate[logos][populate][0]': 'logo',
      },
    });
    return data.data.attributes.logos.map(
      (e: any) =>
        ({
          id: e.id,
          title: e.title,
          url: env.CMS_URL + e.logo.data.attributes.url,
          width: e.logo.data.attributes.width,
          height: e.logo.data.attributes.height,
        }) as IPartner,
    ) as IPartner[];
  } catch (error) {
    return null;
  }
}
