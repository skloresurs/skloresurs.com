import type IPost from '@/types/Post';
import axios from '@/utils/axios-cms';

export default async function getLatestNews(
  locale: string,
): Promise<IPost[] | null> {
  try {
    const { data } = await axios.get('/api/posts', {
      params: {
        locale,
        'sort[0]': 'createdAt:desc',
        'pagination[page]': 1,
        'pagination[pageSize]': 3,
      },
    });
    return data.data.map((e: any) => ({
      id: e.id,
      title: e.attributes.title,
      description: e.attributes.description,
      href: `news/${e.id}`,
    }));
  } catch (error) {
    return null;
  }
}
