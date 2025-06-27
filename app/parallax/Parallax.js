"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./styles/parallax.module.css";
import MobileLandingPageHeader from "../mobileLandiPageHeader/page";
import Lenis from "lenis";
import Card from "./Card";
import BestProducts from "../home/BestProducts";

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




      gsap.to(".line p", {
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: ScrollTriggerSetting,
      });
    });
  


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
zoomTimeline.to(".fadeInAfterZoomFour", { opacity: 1, duration: 0.6 }, ">");
zoomTimeline.to(".fadeInAfterZoomFour", { opacity: 0, duration: 0.6 }, ">");


zoomTimeline.to(".fadeInAfterZoomFive", { opacity: 1, }, ">");

// ScrollTrigger that plays forward and reverses on scroll up
ScrollTrigger.create({
  trigger: ".zoom",
  start: "bottom 50%",
  toggleActions: "play none none reverse", // optional fallback behavior
  onEnter: () => zoomTimeline.play(),
  onLeaveBack: () => {
    document.body.style.overflow = "hidden"; // Lock scroll while reversing
    zoomTimeline.reverse();
  }
});



gsap.to(".heroParallaxOne", {
  opacity: 1,
  y: -800,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".hero",
    start: "center center",
    toggleActions: "play none none reverse", // 🔹 no scrub, plays once on enter
    // markers: true,
    onEnter: () => {
      document.body.style.overflow = "hidden";

      // You could also delay unlock inside the animation complete
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1000); // same as animation duration
    },
    onEnterBack: () => {
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1000);
    }
  }
});


//card
    gsap.to(".heroParallaxTwo", {
  opacity: 1,
  duration: 2,
  y:-500,
  scrollTrigger: {
    trigger: ".hero",          // Add this to define what element triggers the scroll
    start: "center center",
    end: "bottom center",      // Optional, improves reverse behavior
    scrub: true,               // 👈 Makes it reversible
    // markers: true           // Uncomment to debug
  }
});

    gsap.to(".heroParallaxThree", {
  opacity: 1,
  duration: 0.5,
  scale:0.5,
  scrollTrigger: {
    trigger: ".hero",        
    start: "center center",
    end: "bottom center",     
    scrub: true,              
    // markers: true          
  }
});

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
        <div className=" heroParallaxTwo" style={{
          left:'20px',
          position:'absolute',
          display:'grid',
          justifyContent:'center'
        }}>
          <Card/>
        </div>
        







        
        <motion.div style={{position:'absolute',
        backgroundColor:'',
          width:'100%',
          height:'20px',
          bottom:'25px',color:'white',
          fontSize:'12px',
          display:'flex',
          justifyContent:'center'
        }}
        initial={{y:200}}
        animate={{y:0}}
        transition={{type:'spring',stiffness:200,delay:5}}
        >
          <p>Scroll down</p>
        </motion.div>


        <div className={styles.bgContainer}>
        <div className={`${styles.bg} bg`}>
          <img src="sittingroom.jpg"
            style={{
              height:swingProp?"120%":'120vh',
              width:swingProp?"100%":"100%"
            }}
          />
        </div>
        <div className={`${styles.bg} bg heroParallaxOne`} style={{
          top:'105vh',
          display:'grid',
          justifyItems:'center',
          width:'100%'
        }}>
          <img src="/bag.png"
            style={{
              height:swingProp?"50%":'60vh',
              width:swingProp?"40%":"50%"
            }}
          />
        </div>
        
      </div>

      </section>

      <section className={`${styles.main} main`} style={{
        backgroundColor:'salmon',
        boxShadow:'-2px 1px 20px 25px salmon'
      }}>
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
              overflow:'hidden',}}>
        <div
        className={`${styles.zoom} zoom`}
         style={{fontWeight:'900',fontSize:'60px',
          display:'flex',
          justifyContent:'center',
         }}>
          Fashion App
        </div>
        <div className={`fadeInAfterZoomOne ${styles.fadeInAfterZoomOne}`}
        
         style={{color:'white',fontWeight:'900',fontSize:'50px',opacity:'0',
          background:'white',color:'black',
          display:'flex',
          justifyContent:'center',
         }}>
          Cheap
        </div>
        <div className={`fadeInAfterZoomTwo ${styles.fadeInAfterZoomTwo}`}
        
         style={{color:'white',fontWeight:'900',fontSize:'50px',opacity:'0',
          background:'salmon',color:'white',
          display:'flex',
          justifyContent:'center',
         }}>
          Affodable
        </div>
        
        <div className={`fadeInAfterZoomThree ${styles.fadeInAfterZoomThree}`}
        
         style={{color:'white',fontWeight:'900',fontSize:'50px',opacity:'0',
          background:'white',color:'salmon',
          display:'flex',
          justifyContent:'center',
         }}>
          And Stylish Too
        </div>
        <div className={`fadeInAfterZoomFour ${styles.fadeInAfterZoomThree}`}
        
         style={{color:'white',fontWeight:'900',fontSize:'50px',opacity:'0',
          background:'white',color:'black'
         }}>
          <MobileLandingPageHeader/>
        </div>
        <div className={`fadeInAfterZoomFive ${styles.fadeInAfterZoomThree}`}
         style={{fontWeight:'900',fontSize:'50px',opacity:'0',
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
          justifyContent:'center',

          }}>
            Get Started
          </div>

          
        </div>


        
      </section>

      <section>
        <div>
          <BestProducts/>
        </div>
      </section>


                  




    </div>
  );
};

export default Parallax;
