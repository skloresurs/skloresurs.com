import I18nProvider from '@/components/I18nProvider';
import NewsClient from '@/components/NewsClient';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { getI18n } from '@/utils/i18nServer';

export default async function News() {
  const t = await getI18n();

  return (
    <PageTransitionWrapper>
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="mb-5 text-center">{t('news.title')}</h1>
        <I18nProvider>
          <NewsClient />
        </I18nProvider>
      </div>
    </PageTransitionWrapper>
  );
}
