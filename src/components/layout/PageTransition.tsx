import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: 'blur(8px)'
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.21, 1.11, 0.81, 0.99],
      staggerChildren: 0.1,
      when: "beforeChildren",
      filter: {
        duration: 0.4,
        ease: "linear"
      }
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: 'blur(8px)',
    transition: {
      duration: 0.4,
      ease: [0.36, 0, 0.66, -0.56],
      when: "afterChildren",
      filter: {
        duration: 0.2,
        ease: "linear"
      }
    }
  }
};

const childVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.21, 1.11, 0.81, 0.99]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.36, 0, 0.66, -0.56]
    }
  }
};

const contentVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 20
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 1.11, 0.81, 0.99],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 20,
    transition: {
      duration: 0.4,
      ease: [0.36, 0, 0.66, -0.56],
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen relative"
    >
      <motion.div 
        variants={contentVariants}
        className="relative z-10"
      >
        <motion.div variants={childVariants}>
          {children}
        </motion.div>
      </motion.div>
      
      {/* Background gradient transition */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};
