import CircleFlagsUa from './CircleFlagsUa';
import CircleFlagsUk from './CircleFlagsUk';

const Icons = {
  uk: {
    small: <CircleFlagsUa className="h-6 w-6" />,
    big: <CircleFlagsUa className="h-9 w-9" />,
  },
  en: {
    small: <CircleFlagsUk className="h-6 w-6" />,
    big: <CircleFlagsUk className="h-9 w-9" />,
  },
};

export default Icons;
