import axios from 'src/utils/axios-cms';

import type { ICategory } from '@/interfaces/Component';

export default async function getCategories(
  locale: string,
): Promise<ICategory[] | null> {
  try {
    const { data } = await axios.get('/api/component-categories', {
      params: {
        locale,
        'pagination[page]': 1,
        'pagination[pageSize]': 100,
      },
    });

    return data.data.map((e: any) => {
      return {
        id: e.id,
        title: e.attributes.title,
      };
    });
  } catch (error) {
    return null;
  }
}
