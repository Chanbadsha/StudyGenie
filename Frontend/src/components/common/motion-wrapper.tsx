'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

function FadeIn({ children, delay = 0, className, y = 24 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
}

function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { FadeIn, StaggerContainer, StaggerItem, ScaleIn };
