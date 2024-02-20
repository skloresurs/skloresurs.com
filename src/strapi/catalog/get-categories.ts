import { env } from '@/env.mjs';
import { ICategory } from '@/types/Catalog';
import axios from '@/utils/axios-cms';

interface ICatalogCategory {
  attributes: {
    title: string;
    slug: string;
    image: {
      data: {
        attributes: {
          formats: {
            medium: {
              url: string;
            };
          };
        };
      };
    };
  };
}

/**
 * Retrieves the list of catalog categories from the server.
 *
 * @return {Promise<ICategory[] | null>} The list of catalog categories or null if there was an error.
 */
export default async function getCatalogCategories(locale: string): Promise<ICategory[] | null> {
  try {
    const { data } = await axios.get('/api/catalog-categories', {
      params: {
        locale,
        populate: '*',
      },
    });
    return data.data.map((e: ICatalogCategory) => ({
      title: e.attributes.title,
      slug: e.attributes.slug,
      image: env.CMS_URL + e.attributes.image.data.attributes.formats.medium.url,
    }));
  } catch (error) {
    return null;
  }
}
