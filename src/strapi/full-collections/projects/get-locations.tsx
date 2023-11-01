import type { ILocation } from '@/types/Projects';
import axios from '@/utils/axios-cms';

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
