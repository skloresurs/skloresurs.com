import React from 'react';

import InfoArea from './InfoArea';
import InfoEmployees from './InfoEmployees';
import InfoLocation from './InfoLocation';
import InfoProducts from './InfoProducts';
import InfoProjects from './InfoProjects';
import InfoTypes from './InfoTypes';

const classNames = 'h-7 w-7';

export type InfoIconsType = 'area' | 'employees' | 'location' | 'products' | 'projects' | 'types';

const icons = {
  area: <InfoArea className={classNames} />,
  employees: <InfoEmployees className={classNames} />,
  location: <InfoLocation className={classNames} />,
  products: <InfoProducts className={classNames} />,
  projects: <InfoProjects className={classNames} />,
  types: <InfoTypes className={classNames} />,
};

export default icons;
