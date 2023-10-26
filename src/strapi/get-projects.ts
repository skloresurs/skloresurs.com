import type IProject from 'src/interfaces/Projects';

import axios from '@/utils/axios-cms';

export default async function getProjects(
  locale: string,
  page: number,
): Promise<{ total: number; projects: IProject[] } | null> {
  try {
    const { data } = await axios.get(`/api/projects`, {
      params: {
        locale,
        'sort[0]': 'year:desc',
        'sort[1]': 'title',
        'populate[0]': 'images',
        'pagination[pageSize]': 8,
        'pagination[page]': page,
      },
    });
    if (!data.data[0]) return null;
    return {
      total: data.meta.pagination.total,
      projects: data.data.map((e: any) => {
        return {
          id: e.id,
          title: e.attributes.title,
          location: e.attributes.location,
          glass: e.attributes.glass,
          year: e.attributes.year,
          images: e.attributes.images.data.map(
            (ee: any) => process.env.CMS_URL + ee.attributes.url,
          ),
        };
      }),
    };
  } catch (error) {
    return null;
  }
}
