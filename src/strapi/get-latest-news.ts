import axios from 'src/utils/axios-cms';

import type INews from '@/interfaces/News';

export default async function getLatestNews(
  locale: string,
): Promise<INews[] | null> {
  try {
    const { data } = await axios.get('/api/posts', {
      params: {
        locale,
        'sort[0]': 'createdAt:desc',
        'pagination[page]': 1,
        'pagination[pageSize]': 3,
        // 'populate[0]': 'localizations',
      },
    });
    return data.data.map((e: any) => {
      return {
        id: e.id,
        title: e.attributes.title,
        description: e.attributes.description,
        href: `news/${e.id}`,
        // localizedId: e.attributes.localizations.data[0].id,
      };
    });
  } catch (error) {
    return null;
  }
}
