'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type IProps = {
  className?: string;
  duration?: number;
  src: string;
  alt: string;
  sizes?: string;
} & (
  | {
      height: number;
      width: number;
      fill?: false;
    }
  | {
      height?: undefined;
      width?: undefined;
      fill: true;
    }
);

export default function CloudAnimation({ ...props }: IProps) {
  const transitionValues = {
    duration: props.duration ?? 10,
    repeat: Infinity,
    ease: 'easeInOut',
  };

  return (
    <motion.div
      transition={{
        x: transitionValues,
        y: transitionValues,
      }}
      animate={{
        x: ['-2rem', '2rem', '-2rem'],
        y: ['0rem', '0.5rem', '0rem', '0.5rem', '0rem', '0.5rem', '0rem'],
      }}
    >
      <Image
        src={props.src}
        alt={props.alt}
        title={props.alt}
        width={props.width}
        height={props.height}
        sizes={props.sizes}
        fill={props.fill}
        className={props.className}
      />
    </motion.div>
  );
}
