/* eslint-disable sonarjs/no-nested-template-literals */

/**
 * Generates a project link based on the provided filters.
 *
 * @param {string} locale - The locale filter for the project.
 * @param {string | null} location - The location filter for the project.
 * @param {string | null} glassCategory - The glass category filter for the project.
 * @param {string | null} yearFrom - The starting year filter for the project.
 * @param {string | null} yearTo - The ending year filter for the project.
 * @param {string | null} search - The search filter for the project.
 * @param {string | null} page - The page of the projects list.
 * @returns {string} The generated project link.
 */
export function GenerateProjectLink(
  locale: string,
  location: string | null,
  glassCategory: string | null,
  yearFrom: string | null,
  yearTo: string | null,
  search: string | null,
  page: string | null,
): string {
  return `/api/projects?locale=${locale}${
    location ? `&location=${location}` : ''
  }${glassCategory ? `&glass=${glassCategory}` : ''}${
    yearFrom ? `&year-from=${yearFrom}` : ''
  }${yearTo ? `&year-to=${yearTo}` : ''}${search ? `&search=${search}` : ''}${
    page ? `&page=${page}` : ''
  }`;
}

/**
 * Generates a component link based on the provided filters.
 *
 * @param {string} locale - The locale filter for the component.
 * @param {string | null} category - The category filter for the component.
 * @param {string | null} search - The search filter for the component.
 * @returns {string} The generated component link.
 */
export function GenerateComponentLink(
  locale: string,
  category: string | null,
  search: string | null,
): string {
  return `/api/components?page=1&locale=${locale}${
    category ? `&category=${category}` : ''
  }${search ? `&search=${search}` : ''}`;
}
