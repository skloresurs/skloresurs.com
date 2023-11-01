import axios from '@/utils/axios-cms';

export default async function getDeliveryPage(
  locale: string,
): Promise<string | null> {
  try {
    const { data } = await axios.get('/api/delivery-page', {
      params: {
        locale,
      },
    });
    return data.data.attributes.content;
  } catch (error) {
    return null;
  }
}
