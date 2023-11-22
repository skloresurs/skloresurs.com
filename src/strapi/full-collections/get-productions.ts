import { env } from '@/env.mjs';
import type IProduction from '@/types/Production';
import axios from '@/utils/axios-cms';

interface IProductionServer {
  id: number;
  attributes: {
    title: string;
    description: string;
    video: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    order: number;
    production_alt: {
      data: {
        attributes: {
          title: string;
          description: string;
          video: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

/**
 * Retrieves a list of productions based on the specified locale.
 *
 * @param {string} locale - The locale to filter the productions by.
 * @return {Promise<IProduction[] | null>} A promise that resolves to an array of production objects or null if an error occurs.
 */
export default async function getProductions(
  locale: string
): Promise<IProduction[] | null> {
  try {
    const { data } = await axios.get('/api/productions', {
      params: {
        'filters[order][$gte]': 0,
        locale,
        'populate[0]': 'video',
        'populate[1]': 'production_alt',
        'populate[2]': 'production_alt.video',
      },
    });

    return data.data.map((e: IProductionServer) => ({
      alt: e.attributes.production_alt?.data?.attributes
        ? {
            description:
              e.attributes.production_alt.data.attributes.description,
            title: e.attributes.production_alt.data.attributes.title,
            video:
              env.CMS_URL +
              e.attributes.production_alt.data.attributes.video.data.attributes
                .url,
          }
        : null,
      description: e.attributes.description,
      order: e.attributes.order,
      title: e.attributes.title,
      video: env.CMS_URL + e.attributes.video.data.attributes.url,
    }));
  } catch (error) {
    return null;
  }
}
