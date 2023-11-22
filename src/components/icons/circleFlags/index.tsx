import React from 'react';

import CircleFlagsUa from './CircleFlagsUa';
import CircleFlagsUk from './CircleFlagsUk';

const Icons = {
  en: {
    big: <CircleFlagsUk className="h-9 w-9" />,
    small: <CircleFlagsUk className="h-6 w-6" />,
  },
  uk: {
    big: <CircleFlagsUa className="h-9 w-9" />,
    small: <CircleFlagsUa className="h-6 w-6" />,
  },
};

export default Icons;
