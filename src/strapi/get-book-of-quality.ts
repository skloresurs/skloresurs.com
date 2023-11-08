import { env } from '@/env.mjs';
import axios from '@/utils/axios-cms';

export default async function getBookQuality(
  locale: string,
): Promise<string | null> {
  try {
    const { data } = await axios.get('/api/book-of-quality', {
      params: { locale, 'populate[0]': 'file' },
    });
    return env.CMS_URL + data.data.attributes.file.data.attributes.url;
  } catch (error) {
    return null;
  }
}
