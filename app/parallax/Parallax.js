"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./styles/parallax.module.css";
import MobileLandingPageHeader from "../mobileLandiPageHeader/page";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const Parallax = ({ swingProp }) => {



  useEffect(() => {
    const ScrollTriggerSetting = {
      trigger: ".main",
      start: swingProp ? "top 30%" : "top 50%",
      toggleActions: "play reverse play reverse",
    };

    const leftXValues = [-200, -100, -50];
    const rightXValues = [80, 150, 100];
    const leftRotationValues = [-30, -120, -15];
    const rightRotationValues = [30, 20, -60];
    const yValues = [0, -50, -300];

    gsap.utils.toArray(".row").forEach((row, index) => {
      const cardLeft = row.querySelector(".cardLeft");
      const cardRight = row.querySelector(".cardRight");

      gsap.to(cardLeft, {
        scrollTrigger: {
          trigger: ".main",
          start: swingProp ? "top 40%" : "top 25%",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`;
            cardRight.style.transform = `translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`;
          },
        },
      });

      gsap.to(".logo", {
        scale: 1,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: ScrollTriggerSetting,
        y:400,
      });

gsap.to(".hero", {
  opacity: 0,
  duration: 5,
  scrollTrigger: {
    trigger: ".hero",          // Add this to define what element triggers the scroll
    start: "center center",
    end: "bottom center",      // Optional, improves reverse behavior
    scrub: true,               // 👈 Makes it reversible
    // markers: true           // Uncomment to debug
  }
});


      gsap.to(".line p", {
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: ScrollTriggerSetting,
      });
    });



// Define timeline
const zoomTimeline = gsap.timeline({
  paused: true,
  defaults: { ease: "power2.out" },
  onStart: () => {
    document.body.style.overflow = "hidden"; // Lock scroll while animating
  },
  onReverseComplete: () => {
    document.body.style.overflow = "auto"; // Restore scroll after reverse
  },
  onComplete: () => {
    document.body.style.overflow = "auto"; // Restore scroll after forward
  }
});



// Zoom in
zoomTimeline.to(".zoom", { scale: 50, duration: 1 });

// Fade out
zoomTimeline.to(".zoom", { opacity: 0, duration: 0.5 }, ">");

// Fade in next

zoomTimeline.to(".fadeInAfterZoomOne", { opacity: 1, duration: 0.6 }, ">");
zoomTimeline.to(".fadeInAfterZoomOne", { opacity: 0, duration: 0.6 }, ">");
zoomTimeline.to(".fadeInAfterZoomTwo", { opacity: 1, duration: 0.6 }, ">");
zoomTimeline.to(".fadeInAfterZoomTwo", { opacity: 0, duration: 0.6 }, ">");
zoomTimeline.to(".fadeInAfterZoomThree", { opacity: 1, duration: 0.6 }, ">");
zoomTimeline.to(".fadeInAfterZoomThree", { opacity: 0, duration: 0.6 }, ">");
zoomTimeline.to(".fadeInAfterZoomFour", { opacity: 1, duration: 0.5 }, ">");
zoomTimeline.to(".fadeInAfterZoomFour", { opacity: 0, duration: 0.5 }, ">");


zoomTimeline.to(".fadeInAfterZoomFive", { opacity: 1, }, ">");

// ScrollTrigger that plays forward and reverses on scroll up
ScrollTrigger.create({
  trigger: ".zoom",
  start: "top center",
  toggleActions: "play none none reverse", // optional fallback behavior
  onEnter: () => zoomTimeline.play(),
  onLeaveBack: () => {
    document.body.style.overflow = "hidden"; // Lock scroll while reversing
    zoomTimeline.reverse();
  }
});





const bgAnimationForZoomTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".fadeInAfterZoomOne",
    start: "top center",
    end: "bottom center",
    scrub: true,
    // markers: true
  },
  defaults: { ease: "power2.out" },
});

// Parallax background motion (y and opacity: 1)
bgAnimationForZoomTimeline.to(".bg", {
  y: "-150vh",
  opacity: 1,
  duration: 5,
  delay:2,
});

// THEN fade it out at ~70% of scroll progress
bgAnimationForZoomTimeline.to(".bg", {
  opacity: 0,
  duration: 0.5,
}, ">-0.3"); // 🟡 use offset to fade out shortly after previous


    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const generateRows = () => {
    const rows = [];

    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div
          className={`${styles.row} row`}
          key={i}
          style={{ transform: swingProp ? "scale(0.9)" : "" }}
        >
          <div className={`${styles.card} ${styles.cardLeft} cardLeft`}>
            <Image
              src={`/img-${2 * i - 1}.jpg`}
              alt={`img-${2 * i - 1}`}
              width={swingProp ? 250 : 700}
              height={swingProp ? 250 : 400}
              priority
            />
          </div>
          <div className={`${styles.card} ${styles.cardRight} cardRight`}>
            <Image
              src={`/img-${2 * i}.jpg`}
              alt={`img-${2 * i}`}
              width={swingProp ? 250 : 700}
              height={swingProp ? 250 : 400}
              priority
            />
          </div>
        </div>
      );
    }

    return rows;
  };

  return (
    <div className={styles.container} >
      <section 
        className={`${styles.hero} panel hero`}
      >
        <motion.div className={styles.image} style={{ justifyContent: "center", display: "flex" }}
        
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "keyframes", duration: 1, delay: 0.5 }}>
          <img
            src="wezzie2.png"
            alt=""
            style={{
              width: "100%",
              height: swingProp ? "100%" : "150%",
              objectFit: "cover",
            }}
          />
        </motion.div>
        
          <motion.div
            style={{
              position: "absolute",
              top: "60vh",
              width:'100%',
              display:'flex',
              flexDirection:'column',
              alignContent:'center',justifyContent:'center'
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -200, opacity: 1 }}
            transition={{ type: "spring" ,duration:1,delay:1,stiffness:120}}
          >
            <div style={{
              position:'absolute',
              margin:'20px',
              width:'100%',
              display:'flex',
              flexDirection:'column',
              alignContent:'center',justifyContent:'center',
              fontSize:'60px',
              fontWeight:'900',}}>
              Fashion App
            </div>
          </motion.div>
      </section>

      <section className={`${styles.main} main`}>
        <div className={styles.mainContent}>
          <div className={`${styles.logo} logo`}>
            <Image src="/wezzie3.png" alt="" width={150} height={150} priority />
          </div>
          <div className={styles.copy}>
            <div className={`${styles.line} line`}>
              <p>Cheap</p>
            </div>
            <div className={`${styles.line} line`}>
              <p>Affordable</p>
            </div>
            <div className={`${styles.line} line`}>
              <p>And stylish too</p>
            </div>
          </div>
        </div>
        {generateRows()}
      </section>

      <section className={`${styles.content} content`} style={{
              overflow:'hidden'}}>
        <div
        className={`${styles.zoom} zoom`}
         style={{color:'white',fontWeight:'900',fontSize:'60px'}}>
          Fashion App
        </div>
        <div className={`fadeInAfterZoomOne ${styles.fadeInAfterZoomOne}`}
        
         style={{color:'white',fontWeight:'900',fontSize:'50px',opacity:'0'}}>
          Cheap
        </div>
        <div className={`fadeInAfterZoomTwo ${styles.fadeInAfterZoomTwo}`}
        
         style={{color:'white',fontWeight:'900',fontSize:'50px',opacity:'0'}}>
          Affodable
        </div>
        
        <div className={`fadeInAfterZoomThree ${styles.fadeInAfterZoomThree}`}
        
         style={{color:'white',fontWeight:'900',fontSize:'50px',opacity:'0'}}>
          And Stylish Too
        </div>
        <div className={`fadeInAfterZoomFour ${styles.fadeInAfterZoomThree}`}
        
         style={{color:'white',fontWeight:'900',fontSize:'50px',opacity:'0'}}>
          <MobileLandingPageHeader/>
        </div>
        <div className={`fadeInAfterZoomFive ${styles.fadeInAfterZoomThree}`}
         style={{color:'white',fontWeight:'900',fontSize:'50px',opacity:'0',
          height:'100%',
          width:'100vw',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'column'
         }}>
          <div style={{
            position:'relative',        
            height:'100dvh',
          width:'100vw',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
          }}>
            Get Started
          </div>

          
        </div>

          
      <div className={styles.bgContainer}>
        <div className={`${styles.bg} bg`}>
          <img src="/wezzie2.png"
            style={{
              height:swingProp?"120%":'120vh',
              width:swingProp?"100%":"100%"
            }}
          />
        </div>
        
      </div>
        
      </section>

      








    </div>
  );
};

export default Parallax;
