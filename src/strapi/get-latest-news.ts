import type IPost from '@/types/Post';
import axios from '@/utils/axios-cms';

/**
 * Retrieves the last 3 news posts.
 *
 * @param locale - The locale of the posts.
 * @return A promise that resolves to an array of the last 3 news posts, or null if an error occurs.
 */
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
