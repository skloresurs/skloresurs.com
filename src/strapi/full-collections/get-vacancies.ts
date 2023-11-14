import { env } from '@/env.mjs';
import type IVacancy from '@/types/Vacancy';
import axios from '@/utils/axios-cms';

/**
 * Retrieves a list of vacancies.
 *
 * @param locale - The locale of vacancies.
 * @return A promise that resolves to an array of vacancies or null if there was an error.
 */
export default async function getVacancies(
  locale: string,
): Promise<IVacancy[] | null> {
  try {
    const { data } = await axios.get('/api/vacancies', {
      params: {
        locale,
        populate: '*',
      },
    });
    return data.data.map(
      (e: any) =>
        ({
          id: e.id,
          title: e.attributes.title,
          description: e.attributes.description,
          image: env.CMS_URL + e.attributes.image.data.attributes.url,
        }) as IVacancy,
    ) as IVacancy[];
  } catch (error) {
    return null;
  }
}
