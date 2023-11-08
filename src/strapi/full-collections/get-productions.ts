import { env } from '@/env.mjs';
import type IProduction from '@/types/Production';
import axios from '@/utils/axios-cms';

/**
 * Retrieves a list of productions.
 *
 * @param locale - The locale of productions.
 * @return A promise that resolves to an array of productions or null if an error occurs.
 */
export default async function getProductions(
  locale: string,
): Promise<IProduction[] | null> {
  try {
    const { data } = await axios.get('/api/productions', {
      params: {
        locale,
        'populate[0]': 'video',
      },
    });
    return data.data.map(
      (e: any) =>
        ({
          title: e.attributes.title,
          description: e.attributes.description,
          video: env.CMS_URL + e.attributes.video.data.attributes.url,
          order: e.attributes.order,
        }) as IProduction,
    );
  } catch (error) {
    return null;
  }
}
