"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import styles from "./styles/test.module.css";

const Test = () => {
  const sectionRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleWheel = (e) => {
      if (!lenis || isScrolling.current) return;

      let nextIndex = currentIndex;

      if (e.deltaY > 0 && currentIndex < sectionRefs.current.length - 1) {
        nextIndex++;
        console.log("⬇️ Scroll to section", nextIndex);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        nextIndex--;
        console.log("⬆️ Scroll to section", nextIndex);
      } else {
        console.log("⛔ Reached boundary");
        return;
      }

      const target = sectionRefs.current[nextIndex];
      if (!target) {
        console.warn("❌ No target section found for index", nextIndex);
        return;
      }

      isScrolling.current = true;
      setCurrentIndex(nextIndex);

      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });

      setTimeout(() => {
        isScrolling.current = false;
        console.log("✅ Unlock scroll");
      }, 1300);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, lenis]);

  return (
    <ReactLenis root>
      <div className="scroll-container">
        {["Section 1", "Section 2", "Section 3"].map((text, i) => (
          <section
            key={i}
            className={`panel ${
              i === 0 ? "orange" : i === 1 ? "pink" : "green"
            }`}
            ref={(el) => (sectionRefs.current[i] = el)}
          >
            <p>{text}</p>
          </section>
        ))}
      </div>
    </ReactLenis>
  );
};

export default Test;
