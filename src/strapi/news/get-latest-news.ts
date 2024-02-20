import { type IPost } from '@/types/Post';
import axios from '@/utils/axios-cms';

interface IPostServer {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
}

/**
 * Retrieves the latest 3 news posts.
 *
 * @param {string} locale - The desired locale for the news posts.
 * @return {Promise<IPost[] | null>} A promise that resolves to an array of IPost objects or null if an error occurs.
 */
export default async function getLatestNews(locale: string): Promise<IPost[] | null> {
  try {
    const { data } = await axios.get('/api/posts', {
      params: {
        locale,
        'pagination[pageSize]': 3,
        'pagination[page]': 1,
        'sort[0]': 'createdAt:desc',
      },
    });
    return data.data.map((e: IPostServer) => ({
      description: e.attributes.description,
      id: e.id,
      title: e.attributes.title,
    }));
  } catch (error) {
    return null;
  }
}
