"use client";

import styles from "./styles/sticky.module.css";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

const Sticky = () => {

    const { ref: refTop, inView: inViewTop} = useInView({
    threshold: 0.1,
  });
      const { ref: refBottom, inView: inViewBottom} = useInView({
    threshold: 0.1,
  });
  return (
    <div className={styles.page}>
      {/* Fixed Sticky Image on the Left */}
      <div className={styles.stickySection}>
        <img src="/shirt2.png" alt="Sticky Shirt" className={styles.stickyImage}  id="accessoryColorBackground"/>
      </div>

      {/* Scrollable Content */}
      <div className={styles.contentWrapper}>
        {/* Top Content Section */}
        <div ref={refTop}>
          <AnimatePresence>
            {inViewTop && (
              <motion.div
                className={styles.contentSection}
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                id=""
              >
                <h2 className={styles.sectionTitle}>Trending Now</h2>
                <p>
                  Discover the latest arrivals in our premium menswear collection. Perfect fits,
                  standout materials, and versatile pieces designed for every day.
                </p>
                <ul className={styles.featureList}>
                  <li>✓ Free delivery across Malawi</li>
                  <li>✓ Easy 7-day returns</li>
                  <li>✓ Mobile payments accepted</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Content Section */}
        <div ref={refBottom}>
          <AnimatePresence>
            {inViewBottom && (
              <motion.div
                className={styles.contentSection}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                id=""
              >
                <h2 className={styles.sectionTitle}>Why Customers Love Us</h2>
                <p>
                  Our products are crafted from the finest fabrics with attention to detail, offering a
                  stylish look that doesn't compromise on comfort.
                </p>
                <p>
                  "Absolutely the best fitting shirt I've ever owned. Will definitely be ordering again!"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2025 Threads Co. All rights reserved.</p>
          <p>
            <a href="/terms">Terms</a> | <a href="/privacy">Privacy Policy</a> |{" "}
            <a href="/contact">Contact</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Sticky;
