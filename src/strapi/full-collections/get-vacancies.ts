import type IVacancy from 'src/interfaces/Vacancy';
import axios from 'src/utils/axios-cms';

export default async function getVacancies(
  locale: string,
): Promise<IVacancy[] | null> {
  try {
    const { data } = await axios.get('/api/vacancies', {
      params: {
        locale,
        'populate[0]': 'image',
        'populate[1]': 'video',
      },
    });
    return data.data.map((e: any) => ({
      id: e.id,
      title: e.attributes.title,
      description: e.attributes.description,
      image: process.env.CMS_URL + e.attributes.image.data.attributes.url,
    }));
  } catch (error) {
    return null;
  }
}
