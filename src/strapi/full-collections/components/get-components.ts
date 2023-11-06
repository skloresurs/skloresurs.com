import type IComponent from '@/types/Component';
import axios from '@/utils/axios-cms';

/**
 * Retrieves a list of components.
 *
 * @param locale - The locale of the components.
 * @return A promise that resolves to an array of components or null if an error occurs.
 */
export default async function getComponents(
  locale: string,
): Promise<IComponent[] | null> {
  try {
    const { data } = await axios.get('/api/components', {
      params: {
        locale,
        'pagination[page]': 1,
        'pagination[pageSize]': 100,
        'populate[0]': 'category',
        'populate[1]': 'image',
      },
    });

    return data.data.map((e: any) => ({
      id: e.id,
      title: e.attributes.title,
      description: e.attributes.description,
      href: e.attributes.link,
      category: {
        id: e.attributes.category.data.id,
        title: e.attributes.category.data.attributes.title,
      },
      image: process.env.CMS_URL + e.attributes.image.data.attributes.url,
    }));
  } catch (error) {
    return null;
  }
}
