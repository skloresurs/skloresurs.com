import { env } from '@/env.mjs';
import axios from '@/utils/axios-cms';

/**
 * Retrieves the quality of a book based on the specified locale.
 *
 * @param {string} locale - The locale of the book.
 * @return {Promise<string | null>} - A promise that resolves to the URL of the book's quality file, or null if an error occurs.
 */
export default async function getBookQuality(
  locale: string
): Promise<string | null> {
  try {
    const { data } = await axios.get('/api/book-of-quality', {
      params: { locale, populate: '*' },
    });
    return env.CMS_URL + data.data.attributes.file.data.attributes.url;
  } catch (error) {
    return null;
  }
}
