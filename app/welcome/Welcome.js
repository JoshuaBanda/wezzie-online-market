"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../Styles/welcome.module.css";
import Image from "next/image";
import FadedColor from "@/components/FadedColor";
import AnimatedWord from "@/components/AnimatedWord";

const slides = [
  {
    image: "/wonge5_with_no_bg.png",
    text: "Get the best luxury bags at unbeatable prices!",
  },
  {
    image: "/wonge48.png",
    text: "New arrivals: Avon style now available!",
  },
  {
    image: "/wonge3_with_no_bg.png",
    text: "Style your look with premium Wezzie picks!",
  },
];

const Welcome = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 12000);
    return () => clearTimeout(timer);
  }, [index]);


  return (
    <div className={styles.container} id="customizedbackground">
        <div className={styles.header}>
            <AnimatedWord/>
        </div>
      <div className={styles.sliderContainer}>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.picContainer}
            initial={{ y: 300, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 ,ease:"linear"}}
          >
            <Image
              src={slides[index].image}
              alt={`Slide ${index + 1}`}
              quality={100}
              width={560}
              height={500}
              sizes="(max-width:768px)100vw, (max-width:1200px)50vw, 33vw"
              priority
            />
            <motion.div
              className={styles.mainTextContainer}
              initial={{ y: 500, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{type:'spring',stiffness:300 }}
            >
              <h2>Welcome</h2>
              <p>{slides[index].text}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <FadedColor/>
    </div>
  );
};

export default Welcome;
