import { env } from '@/env.mjs';
import type IVacancy from '@/types/Vacancy';
import axios from '@/utils/axios-cms';

/**
 * Retrieves a vacancy by ID.
 *
 * @param locale - The locale of the vacancy.
 * @param id - The ID of the vacancy.
 * @returns A promise that resolves to the vacancy object, or null if it is not found.
 */
export default async function getVacancyById(
  locale: string,
  id: number,
): Promise<IVacancy | null> {
  try {
    const { data } = await axios.get(`/api/vacancies/${id}`, {
      params: {
        locale,
        populate: '*',
      },
    });
    return {
      id: data.data.id,
      title: data.data.attributes.title,
      description: data.data.attributes.description,
      content: data.data.attributes.content,
      image: env.CMS_URL + data.data.attributes.image.data.attributes.url,
      video: data.data.attributes.video.data
        ? env.CMS_URL + data.data.attributes.video.data.attributes.url
        : null,
    } as IVacancy;
  } catch (error) {
    return null;
  }
}
