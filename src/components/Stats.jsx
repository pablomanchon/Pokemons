import { motion } from "framer-motion";
export const Stats = ({ stats, control }) => {
  const ulVariants = {
    open: {
      backgroundColor: "rgba(0, 0, 0, 0.624)",
      transition: { staggerChildren: 0.07, delayChildren: 0.2, opacity: 1 },
    },
    closed: {
      backgroundColor: "rgba(0,0,0,0)",
      transition: { staggerChildren: 0.05, staggerDirection: -1, opacity: 0 },
    },
  };

  const liVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };
  return (
    <motion.ul className="stats" initial="closed" animate={control} variants={ulVariants}>
      {stats?.map((stat, key) => (
        <motion.li variants={liVariants} key={key}>
          <span>{stat.name}</span>
          <span>{stat.value}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};
