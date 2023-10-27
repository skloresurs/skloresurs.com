/* eslint-disable sonarjs/no-nested-template-literals */
export function GenerateProjectLink(
  locale: string,
  location: string | null,
  glassCategory: string | null,
) {
  return `/api/projects?page=1&locale=${locale}${
    location ? `&location=${location}` : ''
  }${glassCategory ? `&glass=${glassCategory}` : ''}`;
}
