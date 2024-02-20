import type { IGlassCategory } from '@/types/Projects';
import axios from '@/utils/axios-cms';

interface IProjectCategoryServer {
  id: number;
  attributes: {
    title: string;
  };
}

export default async function getProjectCategories(locale: string): Promise<IGlassCategory[] | null> {
  try {
    const { data } = await axios.get('/api/project-glass-types', {
      params: {
        locale,
        'sort[0]': 'title:asc',
      },
    });
    return data.data.map((e: IProjectCategoryServer) => ({
      id: e.id,
      title: e.attributes.title,
    }));
  } catch (error) {
    return null;
  }
}
