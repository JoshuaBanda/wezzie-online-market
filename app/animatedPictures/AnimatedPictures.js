'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const AnimatedPictures = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return null; // or a fallback UI
  }

  return (
    <motion.div
      key={currentIndex}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: -10, opacity: 1 }}
      transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
      style={{ position: 'relative', width: '150px', height: '120px' }}
    >
      <Image
        src={images[currentIndex]}
        alt={`Image ${currentIndex}`}
        quality={100}
        width={150}
        height={150}
        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        priority
        style={{ zIndex: -10 }}
      />
    </motion.div>
  );
};

export default AnimatedPictures;
