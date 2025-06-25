"use client";
import { motion } from "framer-motion";
import styles from "./styles/locomotingCircles.module.css";

const LocomotiongCircles = () => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.circle}
        animate={{
          x: [0, 30, 60, 90, 120, 150, 180],
          y: [0, -60, 0, -45, 0, -30, 0], // each bounce gets smaller
        }}
        transition={{
          duration: 2.5,
          ease: "easeOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </div>
  );
};

export default LocomotiongCircles;
