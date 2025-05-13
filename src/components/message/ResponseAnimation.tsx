import { motion } from "framer-motion";

interface ResponseAnimationProps {
  children: React.ReactNode;
}

const ResponseAnimation = ({ children }: ResponseAnimationProps) => {
  return (
    <motion.div
      className="relative w-full pb-8 chat scrollbar"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      <motion.div
        className="relative z-10 flex flex-col w-full gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          staggerChildren: 0.05,
          delayChildren: 0.1,
        }}
      >
        {children}
      </motion.div>

      {/* Gradient overlay that follows the clip animation */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: 3,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
};
export default ResponseAnimation;
