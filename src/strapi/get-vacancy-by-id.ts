import type IVacancy from '@/types/Vacancy';
import axios from '@/utils/axios-cms';

export default async function getVacancyById(
  locale: string,
  id: number,
): Promise<IVacancy | null> {
  try {
    const { data } = await axios.get(`/api/vacancies/${id}`, {
      params: {
        locale,
        'populate[0]': 'image',
        'populate[1]': 'video',
      },
    });
    return {
      id: data.data.id,
      title: data.data.attributes.title,
      description: data.data.attributes.description,
      content: data.data.attributes.content,
      image:
        process.env.CMS_URL + data.data.attributes.image.data.attributes.url,
      video: data.data.attributes.video.data
        ? process.env.CMS_URL + data.data.attributes.video.data.attributes.url
        : null,
    };
  } catch (error) {
    return null;
  }
}
