import axios from 'src/utils/axios-cms';

export default async function getSeminars(
  locale: string,
): Promise<string | null> {
  try {
    const { data } = await axios.get('/api/seminar', {
      params: {
        locale,
      },
    });
    return data.data.attributes.content;
  } catch (error) {
    return null;
  }
}
