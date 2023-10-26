import axios from 'src/utils/axios-cms';

import type { ILocation } from '@/interfaces/Projects';

export default async function getAllProjectLocations(
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
