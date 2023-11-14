import { env } from '@/env.mjs';
import type IPostExtended from '@/types/Post';
import axios from '@/utils/axios-cms';

/**
 * Retrieves a post by ID.
 *
 * @param locale - The locale of the post.
 * @param id - The ID of the post.
 * @return A promise that resolves to the post if found, or null if not found.
 */
export default async function getPostById(
  locale: string,
  id: number,
): Promise<IPostExtended | null> {
  try {
    const { data } = await axios.get(`/api/posts/${id}`, {
      params: {
        populate: '*',
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
      image: env.CMS_URL + data.data.attributes.image.data.attributes.url,
    } as IPostExtended;
  } catch (error) {
    return null;
  }
}
