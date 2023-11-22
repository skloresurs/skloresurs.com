import { env } from '@/env.mjs';
import type IVacancy from '@/types/Vacancy';
import axios from '@/utils/axios-cms';

/**
 * Retrieves a vacancy by ID.
 *
 * @param {string} locale - The locale to use for the request.
 * @param {number} id - The ID of the vacancy to retrieve.
 * @return {Promise<IVacancy | null>} A promise that resolves to the vacancy object if found, or null otherwise.
 */
export default async function getVacancyById(
  locale: string,
  id: number
): Promise<IVacancy | null> {
  try {
    const { data } = await axios.get(`/api/vacancies/${id}`, {
      params: {
        locale,
        populate: '*',
      },
    });
    return {
      content: data.data.attributes.content,
      description: data.data.attributes.description,
      id: data.data.id,
      image: env.CMS_URL + data.data.attributes.image.data.attributes.url,
      title: data.data.attributes.title,
      video: data.data.attributes.video.data
        ? env.CMS_URL + data.data.attributes.video.data.attributes.url
        : null,
    };
  } catch (error) {
    return null;
  }
}
