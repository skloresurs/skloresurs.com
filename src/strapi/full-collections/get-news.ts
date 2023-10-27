import type IPost from 'src/interfaces/Post';
import axios from 'src/utils/axios-cms';

export default async function getNews(locale: string): Promise<IPost[] | null> {
  try {
    const { data } = await axios.get('/api/posts', {
      params: {
        locale,
        'sort[0]': 'createdAt:desc',
        'populate[0]': 'image',
      },
    });
    return data.data.map((e: any) => {
      return {
        id: e.id,
        title: e.attributes.title,
        description: e.attributes.description,
        category: e.attributes.category,
        image: process.env.CMS_URL + e.attributes.image.data.attributes.url,
        content: e.attributes.content,
        video: e.attributes.video,
      };
    });
  } catch (error) {
    return null;
  }
}
