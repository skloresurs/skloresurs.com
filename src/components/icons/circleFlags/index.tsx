import React from 'react';

import CircleFlagsUa from './CircleFlagsUa';
import CircleFlagsUk from './CircleFlagsUk';

const Icons = {
  en: {
    big: <CircleFlagsUk className='size-9' />,
    small: <CircleFlagsUk className='size-6' />,
  },
  uk: {
    big: <CircleFlagsUa className='size-9' />,
    small: <CircleFlagsUa className='size-6' />,
  },
};

export default Icons;
