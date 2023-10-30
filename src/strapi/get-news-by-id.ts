import type IPost from 'src/interfaces/Post';
import axios from 'src/utils/axios-cms';

export default async function getPostById(
  locale: string,
  id: number,
): Promise<IPost | null> {
  try {
    const { data } = await axios.get(`/api/posts/${id}`, {
      params: {
        'populate[0]': 'image',
      },
    });
    if (data.data.attributes.locale !== locale) {
      return null;
    }
    if (data.data.attributes.video) {
      return null;
    }
    return {
      id: data.data.id,
      title: data.data.attributes.title,
      category: data.data.attributes.category,
      video: data.data.attributes.video,
      description: data.data.attributes.description,
      content: data.data.attributes.content,
      tags: data.data.attributes.tags.data.map((e: any) => ({
        id: e.id,
        title: e.attributes.title,
        color: e.attributes.color,
      })),
      image:
        process.env.CMS_URL + data.data.attributes.image.data.attributes.url,
    };
  } catch (error) {
    return null;
  }
}
