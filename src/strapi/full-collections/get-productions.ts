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
    return data.data.map(
      (e: any) =>
        ({
          title: e.attributes.title,
          description: e.attributes.description,
          original: e.attributes.video_link,
        }) as IProduction,
    );
  } catch (error) {
    return null;
  }
}
