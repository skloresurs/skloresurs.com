import type { ICategory } from '@/types/Component';
import axios from '@/utils/axios-cms';

interface IComponentCategoryServer {
  id: number;
  attributes: {
    title: string;
  };
}

export default async function getComponentCategories(locale: string): Promise<ICategory[] | null> {
  try {
    const { data } = await axios.get('/api/component-categories', {
      params: { locale },
    });

    return data.data.map((e: IComponentCategoryServer) => ({
      id: e.id,
      title: e.attributes.title,
    }));
  } catch (error) {
    return null;
  }
}
