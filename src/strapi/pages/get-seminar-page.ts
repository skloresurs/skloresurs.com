import axios from '@/utils/axios-cms';

/**
 * Retrieves the seminar page content.
 *
 * @param locale - The locale for the page.
 * @return A promise that resolves to the seminar page content, or null if an error occurs.
 */
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
