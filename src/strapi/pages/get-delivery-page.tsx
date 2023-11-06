import axios from '@/utils/axios-cms';

/**
 * Retrieves the delivery page content.
 *
 * @param locale - The locale for the page.
 * @return The content of the delivery page as a string, or null if an error occurred.
 */
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
