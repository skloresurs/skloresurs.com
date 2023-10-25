import area from './area.svg';
import employees from './employees.svg';
import location from './location.svg';
import products from './products.svg';
import projects from './projects.svg';
import types from './types.svg';

const iconSet = {
  area,
  location,
  products,
  projects,
  types,
  employees,
};

export type AllowIcons = keyof typeof iconSet;

export default iconSet;
