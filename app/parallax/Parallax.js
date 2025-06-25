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



gsap.registerPlugin(ScrollTrigger);

const Parallax = ({swingProp}) => {


    useEffect(()=>{
        const ScrollTriggerSetting={
            trigger:".main",
            start:swingProp?"top 30%":"top 50%",
            toggleActions:"play reverse play reverse"
        };
        const leftXValues=[-200,-60,-50];
        const rightXValues=[80,150,0];
        const leftRotationValues=[-30,-120,-15];
        const rightRotationValues=[30,20,-60];
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
        <div className={`${styles.container}`}>
            <ReactLenis root className="snapCrollY">
                <motion.section className={`${styles.hero} panel`}
                    initial={{opacity:0,y:300}}
                    animate={{opacity:1,y:0}}
                    transition={{type:'keyframes',duration:1,delay:0.5}}
                >
                    <div className={styles.image} style={{justifyContent:'center',display:'flex'}}>
                        <img src="wezzie2.png" alt=""
                        style={{width:swingProp?"100%":'100%',height:swingProp?"100%":'150%',objectFit:'cover'}}

                        />
                        <motion.div id=""
                        style={{position:'absolute',top:'60vh',
                            display:'flex',
                            justifyContent:'center',
                            flexDirection:'column'
                        }}
                        initial={{y:0,opacity:0}}
                        animate={{y:-200,opacity:1}}
                        transition={{type:'spring'}}
                        >
                            <h1>
                                Welcome,
                            </h1>
                            <h3 style={{fontSize:'20px'}}>
                                Our Fashion App
                            </h3>
                        </motion.div>
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