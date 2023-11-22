/**
 * Generates a project link based on the provided parameters.
 *
 * @param {string} locale - The locale for the project link.
 * @param {string | null} location - The location for the project link.
 * @param {string | null} glassCategory - The glass category for the project link.
 * @param {string | null} yearFrom - The starting year for the project link.
 * @param {string | null} yearTo - The ending year for the project link.
 * @param {string | null} search - The search query for the project link.
 * @param {string | null} page - The page number for the project link.
 * @return {string} The generated project link.
 */
export function GenerateProjectLink(
  locale: string,
  location: string | null,
  glassCategory: string | null,
  yearFrom: string | null,
  yearTo: string | null,
  search: string | null,
  page: string | null
): string {
  const query = new URLSearchParams();
  query.set('locale', locale);

  if (location) {
    query.set('location', location);
  }
  if (glassCategory) {
    query.set('glass', glassCategory);
  }
  if (yearFrom) {
    query.set('year-from', yearFrom);
  }
  if (yearTo) {
    query.set('year-to', yearTo);
  }
  if (search) {
    query.set('search', search);
  }
  if (page) {
    query.set('page', page);
  }
  return `/api/projects?${query.toString()}`;
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
  manufacturer: string | null
): string {
  const query = new URLSearchParams();

  query.set('locale', locale);
  query.set('page', '1');
  if (category) {
    query.set('category', category);
  }
  if (search) {
    query.set('search', search);
  }
  if (manufacturer) {
    query.set('manufacturer', manufacturer);
  }
  return `/api/components?${query.toString()}`;
}
