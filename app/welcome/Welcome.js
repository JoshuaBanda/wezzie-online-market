"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles/welcome.module.css";
import Image from "next/image";
import FadedColor from "@/components/FadedColor";
import AnimatedWord from "@/components/AnimatedWord";
import RotatedSlider from "./RotatedSlider";
import CanvaText from "../canvaText/CanvaText";

const slides = [
  {
    image: "/wezzie1.png",
    text: "Get the best luxury bags at unbeatable prices!",
  },
  {
    image: "/wezzie2.png",
    text: "New arrivals: Avon style now available!",
  },
  {
    image: "/wezzie3.png",
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
    <div className={styles.container} id="darkThemeTextColor">
        <div className={styles.header}>
            <AnimatedWord/>
        </div>
        {/*<div className={styles.rotatedSlider}>
          <RotatedSlider/>
        </div>*/}
      <div className={styles.sliderContainer}>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.picContainer}
            initial={{ y: 300, opacity: 1,x:0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 ,ease:"linear"}}
          >
            <Image
              src={slides[index].image}
              alt={`Slide ${index + 1}`}
              quality={100}
              width={700}
              height={800}
              sizes="(max-width:768px)100vw, (max-width:1200px)50vw, 33vw"
              priority
            />
          </motion.div>
          
            <motion.div
              className={styles.mainTextContainer}
              initial={{ y: 500, opacity: 0,x:-50 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{type:'spring',stiffness:300 }}
            >
              <h2 className={styles.welcome}>Welcome</h2>
              <p className={styles.paragraph}>{slides[index].text}</p>
            </motion.div>   
        </AnimatePresence>
      </div>
      <CanvaText/>
      <FadedColor/>
      <div className={styles.circle} id="customizedbackground"/>
    </div>
  
  );
};

export default Welcome;
