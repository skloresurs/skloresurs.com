import axios from 'src/utils/axios-cms';

import type IComponent from '@/interfaces/Component';

export default async function getAllComponents(
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

    return data.data.map((e: any) => {
      return {
        id: e.id,
        title: e.attributes.title,
        description: e.attributes.description,
        href: e.attributes.link,
        category: {
          id: e.attributes.category.data.id,
          title: e.attributes.category.data.attributes.title,
        },
        image: process.env.CMS_URL + e.attributes.image.data.attributes.url,
      };
    });
  } catch (error) {
    return null;
  }
}
