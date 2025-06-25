import { useEffect, useState } from "react";
import styles from "./styles/loginPage.module.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import {motion} from "framer-motion";
import Image from "next/image";

const LoginAnimation = ({ motionProp,onButtonClick }) => {
  const [displayIcon, setDisplayIcon] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    console.log(motionProp);
    if(motionProp!=="landing"){
        setDisplayIcon(true);
    }else{
        setDisplayIcon(false);
    }
  }, [motionProp]);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300); // animation duration in ms
    
    onButtonClick();

  };

  return (
    <motion.div className={styles.box}
        initial={{opacity:0,x:200}}
        animate={{opacity:1,x:0}}
        transition={{type:'tween',duration:1,}}
    >

      <div
        onClick={handleClick}
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          backgroundColor: "white",
          left: 20,
          top: 10,
          display: displayIcon ? "flex" : "none",
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          userSelect: "none",
          zIndex:100
        }}
      >
        <img src="/leftArrow.gif" alt="My animation"  className={styles.icon}/>
      </div>

      <motion.div
        initial={{x:0,scale:1}}
        animate={{x:displayIcon?80:0,scale:displayIcon?0.65:1}}
        transition={{type:'spring',stiffness:300,duration:0.025}}
            id="thirdCustomizedBackGroundColor"
      style={{          
        position: "absolute",
          width: 250,
          height: 250,
          right:0,
          top: 10,
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transform: isClicked ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.3s ease",
          userSelect: "none",
          overflow:'hidden',
          zIndex:100


          
        }}/>

        <motion.div
            initial={{x:150,y:0}}
            animate={{x:displayIcon?150:80,scale:displayIcon?0.8:1.2,y:-50}}
            
        transition={{type:'spring',stiffness:180,duration:0.25}}
            style={{
                position:'absolute',
                right:'120px',top:'-40px',
                width:'150px',
                height:'150px',
                display:'flex',
                justifyContent:'center',
                zIndex:100
            }}
        >
            <Image
            src="/wezzie2.png"
            alt="login"
            width={450}
            height={450}
            priority
            />
        </motion.div>
    </motion.div>
  );
};

export default LoginAnimation;
