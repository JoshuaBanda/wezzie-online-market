"use client";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {ReactLenis } from "lenis/react"
import styles from "./styles/parallax.module.css";
import { useEffect } from "react";
import MobileLandingPageHeader from "../mobileLandiPageHeader/page";
import Image from "next/image";
import { motion } from "framer-motion";

import Lenis from '@studio-freight/lenis';


gsap.registerPlugin(ScrollTrigger);

const Parallax = ({swingProp}) => {

//i think this is subject, you ca choose to use this or the <reactlenis roo>
useEffect(() => {


  const lenis = new Lenis({
    smooth: true,
    syncTouch: true, // This is CRITICAL for mobile
  });
  

  function raf(time) {
    
  lenis.raf(time);
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Sync ScrollTrigger if you're using it
  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.defaults({
    scroller: document.querySelector(".lenis"),
  });

  ScrollTrigger.refresh();

  return () => {
    lenis.destroy();
  };
}, []);

    useEffect(()=>{
        const ScrollTriggerSetting={
            trigger:".main",
            start:swingProp?"top 30%":"top 50%",
            toggleActions:"play reverse play reverse"
        };
        const leftXValues=[-800,-900,-50];
        const rightXValues=[800,900,0];
        const leftRotationValues=[-30,-30,-15];
        const rightRotationValues=[30,20,35];
        const yValues=[0,-50,-150]
        gsap.utils.toArray(".row").forEach((row,index)=>{
            const cardLeft=row.querySelector(".cardLeft");
            const cardRight=row.querySelector(".cardRight");
            gsap.to(cardLeft,{
                x:leftXValues[index],
                scrollTrigger:{
                    trigger:".main",
                    start:swingProp?"top 40%":"top 25%",
                    end:"150% bottom",
                    scrub:true,
                    onUpdate: (self)=>{
                        const progress=self.progress;
                        cardLeft.style.transform = `translateX(${
                            progress * leftXValues[index]
                        }px) translateY(${progress * yValues[index]}px) rotate(${
                            progress * leftRotationValues[index]
                        }deg)`;
                        cardRight.style.transform = `translateX(${
                            progress * rightXValues[index]
                        }px) translateY(${progress * yValues[index]}px) rotate(${
                            progress * rightRotationValues[index]}deg)`;

                    }
                }
            });
            gsap.to(".logo",{
                scale:1,
                duration:2,
                ease:"power1.out",
                scrollTrigger:ScrollTriggerSetting,
            });
            gsap.to(".line p",{
                y:0,
                stagger:0.1,
                duration:0.5,
                ease:"power1.out",
                scrollTrigger:ScrollTriggerSetting,
            });

            
        });
        



        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    },[])






const generateRows = () => {

  const rows = [];

  for (let i = 1; i <= 3; i++) {
    rows.push(
      <div className={`${styles.row} row`}key={i}
      style={{transform:swingProp?"scale(0.9)":""}}>
        <div className={`${styles.card} ${styles.cardLeft}  cardLeft`}>
          <Image src={`/img-${2 * i - 1}.jpg`} alt={`img-${2 * i - 1}`} 
            width={swingProp?250:700}
            height={swingProp?250:400}
            priority
          />
        </div>
        <div className={`${styles.card} ${styles.cardRight} cardRight`}>
          <Image src={`/img-${2 * i}.jpg`} alt={`img-${2 * i}`}
            width={swingProp?250:700}
            height={swingProp?250:400}
            priority
          />
        </div>
      </div>
    );
  }

  return rows;
};


    return (
        <div className={`${styles.container} lenis`}>
            <ReactLenis root>
                <motion.section className={styles.hero}
                    initial={{opacity:0,y:300}}
                    animate={{opacity:1,y:0}}
                    transition={{type:'keyframes',duration:1,delay:0.5}}
                >
                    <div className={styles.image}>
                        <img src={swingProp?"wezzie2.png": "/logo2.jpg"} alt=""
                        style={{width:swingProp?"100%":'100%',height:swingProp?"100%":'150%',objectFit:'cover'}}
                        />
                    </div>
                </motion.section>
                <section className={`${styles.main} main`}>
                    <div className={styles.mainContent}>
                        <div className={`${styles.logo} logo`}>
                            <Image src="/wezzie3.png" alt=""
                            width={150}
                            height={150}
                            priority
            />
                        </div>
                        <div className={styles.copy}>
                            <div className={`${styles.line} line`}>
                                <p>
                                    Cheap
                                </p>
                            </div>
                            <div className={`${styles.line} line`}>
                                <p>
                                    Affodable
                                </p>
                            </div>
                            <div className={`${styles.line} line`}>
                                <p>
                                    And stylish too
                                </p>
                            </div>
                        </div>
                    </div>
                        {generateRows()}
                    
                </section>
                <section className={`${styles.content} content`}
                >
                    <MobileLandingPageHeader/>
                </section>
            </ReactLenis>
        </div>
    );
}
 
export default Parallax;