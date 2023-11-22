import { env } from '@/env.mjs';
import type IVacancy from '@/types/Vacancy';
import axios from '@/utils/axios-cms';

interface IVacancyServer {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

/**
 * Retrieves vacancies based on the provided locale.
 *
 * @param {string} locale - The locale used to filter vacancies.
 * @return {Promise<IVacancy[] | null>} A promise that resolves to an array of vacancies or null if an error occurred.
 */
export default async function getVacancies(
  locale: string
): Promise<IVacancy[] | null> {
  try {
    const { data } = await axios.get('/api/vacancies', {
      params: {
        locale,
        populate: '*',
      },
    });
    return data.data.map((e: IVacancyServer) => ({
      description: e.attributes.description,
      id: e.id,
      image: env.CMS_URL + e.attributes.image.data.attributes.url,
      title: e.attributes.title,
    }));
  } catch (error) {
    return null;
  }
}
