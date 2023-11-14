import type { ICategory } from '@/types/Component';
import axios from '@/utils/axios-cms';

/**
 * Retrieves a list of categories.
 *
 * @param locale - The locale of the categories.
 * @return A promise that resolves to an array of category objects or null if there was an error.
 */
export default async function getCategories(
  locale: string,
): Promise<ICategory[] | null> {
  try {
    const { data } = await axios.get('/api/component-categories', {
      params: { locale },
    });

    return data.data.map(
      (e: any) =>
        ({
          id: e.id,
          title: e.attributes.title,
        }) as ICategory,
    ) as ICategory[];
  } catch (error) {
    return null;
  }
}
