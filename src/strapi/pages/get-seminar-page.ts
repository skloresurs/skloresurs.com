import axios from '@/utils/axios-cms';

export default async function getSeminarPage(
  locale: string,
): Promise<string | null> {
  try {
    const { data } = await axios.get('/api/seminar-page', {
      params: {
        locale,
      },
    });
    return data.data.attributes.content;
  } catch (error) {
    return null;
  }
}
