import { env } from '@/env.mjs';
import type IPostExtended from '@/types/Post';
import axios from '@/utils/axios-cms';

interface ITag {
  id: number;
  attributes: {
    color: string;
    title: string;
  };
}

/**
 * Retrieves a post by ID.
 *
 * @param {string} locale - The locale of the post.
 * @param {number} id - The ID of the post.
 * @return {Promise<IPostExtended | null>} A promise that resolves to an extended post object or null if the post was not found.
 */
export default async function getPostById(
  locale: string,
  id: number
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
      category: data.data.attributes.category,
      content: data.data.attributes.content,
      description: data.data.attributes.description,
      id: data.data.id,
      image: env.CMS_URL + data.data.attributes.image.data.attributes.url,
      tags: data.data.attributes.tags.data.map((e: ITag) => ({
        color: e.attributes.color,
        id: e.id,
        title: e.attributes.title,
      })),
      title: data.data.attributes.title,
      video: data.data.attributes.video,
    };
  } catch (error) {
    return null;
  }
}
