import type IProduction from '@/types/Production';
import axios from '@/utils/axios-cms';

export default async function getProductions(
  locale: string,
): Promise<IProduction[] | null> {
  try {
    const { data } = await axios.get('/api/productions', {
      params: {
        locale,
        'populate[0]': 'video',
      },
    });
    return data.data.map((e: any) => ({
      title: e.attributes.title,
      description: e.attributes.description,
      original: process.env.CMS_URL + e.attributes.video.data.attributes.url,
    }));
  } catch (error) {
    return null;
  }
}
