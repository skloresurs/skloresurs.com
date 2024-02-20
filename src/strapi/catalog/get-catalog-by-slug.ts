import { env } from '@/env.mjs';
import ICatalog from '@/types/Catalog';
import axios from '@/utils/axios-cms';

/**
 * Retrieves the list of catalog by category and slug from the server.
 *
 * @return {Promise<ICatalog | null>} The list of catalog by category and slug or null if there was an error.
 */
export default async function getCatalogBySlug(
  locale: string,
  category: string,
  slug: string
): Promise<ICatalog | null> {
  try {
    const { data } = await axios.get('/api/catalogs', {
      params: {
        locale,
        populate: '*',
        'filters[category][slug][$eq]': category,
        'filters[slug][$eq]': slug,
      },
    });
    if (data.data.length === 0) {
      return null;
    }
    return {
      title: data.data[0].attributes.title,
      slug: data.data[0].attributes.slug,
      content: data.data[0].attributes.Content,
      image: env.CMS_URL + data.data[0].attributes.icon.data.attributes.url,
    };
  } catch (error) {
    return null;
  }
}
