import axios from '@/utils/axios-cms';

/**
 * Retrieves the seminar page content for a given locale.
 *
 * @param {string} locale - The locale of the seminar page content.
 * @return {Promise<string | null>} The seminar page content, or null if an error occurs.
 */
export default async function getSeminarPage(locale: string): Promise<string | null> {
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
