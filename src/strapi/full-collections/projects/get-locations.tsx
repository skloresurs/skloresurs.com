import type { ILocation } from '@/types/Projects';
import axios from '@/utils/axios-cms';

/**
 * Retrieves the list of locations.
 *
 * @param locale - The locale of the locations.
 * @return A promise that resolves to an array of locations or null if an error occurs.
 */
export default async function getLocations(
  locale: string,
): Promise<ILocation[] | null> {
  try {
    const { data } = await axios.get('/api/projects-locations', {
      params: {
        locale,
        'pagination[pageSize]': 100,
      },
    });
    return data.data.map((e: any) => ({
      id: e.id,
      title: e.attributes.title,
    }));
  } catch (error) {
    return null;
  }
}
