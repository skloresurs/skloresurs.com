import type { ILocation } from '@/types/Projects';
import axios from '@/utils/axios-cms';

interface IProjectLocationServer {
  id: number;
  attributes: {
    title: string;
  };
}

/**
 * Retrieves the locations of projects based on the specified locale.
 *
 * @param {string} locale - The locale for which to retrieve the project locations.
 * @return {Promise<ILocation[] | null>} The locations of projects as an array of ILocation objects, or null if an error occurs.
 */
export default async function getProjectLocations(locale: string): Promise<ILocation[] | null> {
  try {
    const { data } = await axios.get('/api/projects-locations', {
      params: {
        locale,
        'pagination[pageSize]': 100,
      },
    });
    return data.data.map((e: IProjectLocationServer) => ({
      id: e.id,
      title: e.attributes.title,
    }));
  } catch (error) {
    return null;
  }
}
