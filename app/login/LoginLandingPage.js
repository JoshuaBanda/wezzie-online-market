"use client";
import { useRef, useState } from "react";
import styles from "./styles/loginPage.module.css";
import { motion } from "framer-motion";
import LoginAnimation from "./LoginAnimation";
import LoginPart from "./LoginPart";
import SignUpPage from "../userAunthentication/SignUpPage";

const LoginPage = () => {
  const landingRef = useRef(null);
  const loginRef = useRef(null);
  const signUpRef = useRef(null);
  

  const [customizedBackGround,setCustomizedBackGround]=useState(true);

  const [currentSection,setCurrentSection]=useState("landing");
  const [isLoginDisplayed,setLoginDisplay]=useState(false);
  const [isSignUpDisplayed,setSignUpDisplay]=useState(true);

  
  const [animateLandingPage, setAnimateLandingPage]=useState(true);
  const handleScrollTo = (type) => {
    if (type === "login") {
      setAnimateLandingPage(false);
      loginRef.current?.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(type);
      setCustomizedBackGround(false);
      setLoginDisplay(true);
    } else if (type === "signUp") {
      setCustomizedBackGround(false);
      setSignUpDisplay(true);

      signUpRef.current?.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(type);
      setAnimateLandingPage(false);
    } else {
      landingRef.current?.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(type);
      setCustomizedBackGround(true);
      if(isLoginDisplayed){
        setLoginDisplay(false);
      }
      if(isSignUpDisplayed){
        setSignUpDisplay(false);
      }
      
      setAnimateLandingPage(true);
    }
  };

  const handleButton=()=>{
    handleScrollTo("landing");
  }
  return (
    <div>
      <div className={styles.coolContainer}>
        <LoginAnimation motionProp={currentSection} onButtonClick={handleButton}/>
      </div>
      <div
      className={styles.container}
        id={`${customizedBackGround&&"accessoryColorBackground"}`}
      >
      <section ref={landingRef} className={styles.landingPage}>

        <motion.div
          className={styles.welcomeContainer}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <div className={styles.welcome}>
            <motion.span className={styles.welcomeToOur}
          initial={{ y: 30,}}
          animate={{ y: animateLandingPage? 0:30, }}
          transition={{ type: "tween",delay:1.2 }}>Welcome To Our</motion.span>
            <motion.span id="customizedColor" 
          initial={{ y: 30, }}
          animate={{ y: animateLandingPage? 0:30, }}
          transition={{ type: "spring",delay:1.5 }}>Fashion App</motion.span>
            <motion.span 
          initial={{ y: 30, }}
          animate={{ y: animateLandingPage? 0:30, }}
          transition={{ type: "spring",delay:1.8 }}>Let's get started</motion.span>
            <motion.p 
          initial={{ y: 30, }}
          animate={{ y: animateLandingPage? 0:30,opacity:1 }}
          transition={{ type: "spring",delay:2,stiffness:200 }}>Everything starts from here</motion.p>
          </div>
        </motion.div>

        <motion.div className={styles.buttons}>
          <div id="customizedbackground" className={styles.loginButton} onClick={() => handleScrollTo("login")}>
            Login
          </div>
          <div id="thirdCustomizedBackGroundColor" className={styles.signUpButton} onClick={() => handleScrollTo("signUp")}>
            SignUp
          </div>
        </motion.div>
      </section>

      <section ref={loginRef} className={styles.loginPart}>
        <motion.div
        style={{
          display:isLoginDisplayed?'block':'none',
        }}
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{
            type:'tween',delay:1
          }}
          className={styles.inputPart}
        >
          
          <LoginPart/>
        </motion.div>
      </section>

      <section ref={signUpRef} className={styles.signUpPart}>
      <motion.div
        style={{
          display:isSignUpDisplayed?'block':'none',
        }}
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{
            type:'tween',delay:1
          }}
          className={styles.inputPart}
        >
          
          <SignUpPage/>
        </motion.div>
      </section>
    </div>
    </div>
  );
};

export default LoginPage;
