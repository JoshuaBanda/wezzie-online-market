"use client";
import { useEffect, useState } from "react";
import styles from "./styles/RotatedSlider.module.css";
import Image from "next/image";

const toRotateImages = [
  { image: "/wonge5_with_no_bg.png" },
  { image: "/wonge5_with_no_bg.png" },
  { image: "/wonge5_with_no_bg.png" },
  { image: "/wonge5_with_no_bg.png" },
  { image: "/wonge5_with_no_bg.png" },
];

const RotatedSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);



  function incrementOver2Seconds() {
  const start = 0;
  const end = 12;
  const duration = 30000; // 2 seconds in milliseconds
  const steps = end - start; // 8 steps
  const intervalTime = duration / steps; // time between increments

  let current = start;

  const interval = setInterval(() => {
    console.log(current);
    
      setActiveIndex((prev) => (prev + 1) % toRotateImages.length);
    current++;
    if (current > end) {
      clearInterval(interval);
    }
  }, intervalTime);
}
useEffect(() => {
  incrementOver2Seconds(); // run immediately on mount

  const interval = setInterval(() => {
    incrementOver2Seconds();
  }, 30000); // every 5000ms = 5 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, []);


  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {toRotateImages.map((item, index) => {
          let className = "";

          if (index === activeIndex) className = styles.item;
          else if (index === (activeIndex + 1) % toRotateImages.length) className = styles.next1;
          else if (index === (activeIndex + 2) % toRotateImages.length) className = styles.next2;
          else if (index === (activeIndex + 3) % toRotateImages.length) className = styles.next3;
          else if (index === (activeIndex + 4) % toRotateImages.length) className = styles.next4;
          else if (index === (activeIndex - 1 + toRotateImages.length) % toRotateImages.length) className = styles.prev1;
          else if (index === (activeIndex - 2 + toRotateImages.length) % toRotateImages.length) className = styles.prev2;
          else if (index === (activeIndex - 3 + toRotateImages.length) % toRotateImages.length) className = styles.prev3;
          else if (index === (activeIndex - 4 + toRotateImages.length) % toRotateImages.length) className = styles.prev4;

          return (
            <li key={index} className={`${styles.listItem} ${className}`}>
              <Image
                src={item.image}
                alt={`Item ${index}`}
                width={50}
                height={50}
                quality={100}
                layout="responsive"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RotatedSlider;
