import ICatalog from '@/types/Catalog';
import axios from '@/utils/axios-cms';

interface ICatalogServer {
  attributes: {
    title: string;
    slug: string;
    Content: string;
  };
}

/**
 * Retrieves the list of catalog by category from the server.
 *
 * @return {Promise<ICatalog[] | null>} The list of catalog by category or null if there was an error.
 */
export default async function getCatalogByCategory(locale: string, category: string): Promise<ICatalog[] | null> {
  try {
    const { data } = await axios.get('/api/catalogs', {
      params: {
        locale,
        populate: '*',
        'filters[category][slug][$eq]': category,
      },
    });
    return data.data.map((e: ICatalogServer) => ({
      title: e.attributes.title,
      slug: e.attributes.slug,
      content: e.attributes.Content,
    }));
  } catch (error) {
    return null;
  }
}
