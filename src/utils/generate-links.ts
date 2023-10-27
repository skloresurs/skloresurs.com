/* eslint-disable sonarjs/no-nested-template-literals */
export function GenerateProjectLink(
  locale: string,
  location: string | null,
  glassCategory: string | null,
  yearFrom: string | null,
  yearTo: string | null,
  search: string | null,
) {
  return `/api/projects?page=1&locale=${locale}${
    location ? `&location=${location}` : ''
  }${glassCategory ? `&glass=${glassCategory}` : ''}${
    yearFrom ? `&year-from=${yearFrom}` : ''
  }${yearTo ? `&year-to=${yearTo}` : ''}${search ? `&search=${search}` : ''}`;
}
