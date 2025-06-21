"use client";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {ReactLenis } from "lenis/react"
import styles from "./styles/parallax.module.css";
import { useEffect } from "react";
import MobileLandingPageHeader from "../mobileLandiPageHeader/page";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const Parallax = ({swingProp}) => {
    useEffect(()=>{
        const ScrollTriggerSetting={
            trigger:".main",
            start:swingProp?"top 10%":"top 20%",
            toggleActions:"play reverse play reverse"
        };
        const leftXValues=[-800,-900,-400];
        const rightXValues=[800,900,400];
        const leftRotationValues=[-30,-30,-35];
        const rightRotationValues=[30,20,35];
        const yValues=[0,-50,-150]
        gsap.utils.toArray(".row").forEach((row,index)=>{
            const cardLeft=row.querySelector(".cardLeft");
            const cardRight=row.querySelector(".cardRight");
            gsap.to(cardLeft,{
                x:leftXValues[index],
                scrollTrigger:{
                    trigger:".main",
                    start:swingProp?"top 10%":"top 25%",
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
                duration:1,
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
      <div className={`${styles.row} row`}key={i}>
        <div className={`${styles.card} ${styles.cardLeft}  cardLeft`}>
          <Image src={`/img-${2 * i - 1}.jpg`} alt={`img-${2 * i - 1}`} 
            width={swingProp?250:350}
            height={swingProp?250:350}
            priority
          />
        </div>
        <div className={`${styles.card} ${styles.cardRight} cardRight`}>
          <Image src={`/img-${2 * i}.jpg`} alt={`img-${2 * i}`}
          
            width={swingProp?250:350}
            height={swingProp?250:350}
            priority
          />
        </div>
      </div>
    );
  }

  return rows;
};


    return (
        <div className={styles.container}>
            <ReactLenis root>
                <section className={styles.hero}>
                    <div className={styles.img}>
                        
                        <img src="/bag.png" alt=""
                        style={{width:'100%',height:'100%',objectFit:'cover'}}
                        />
                    </div>
                </section>
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