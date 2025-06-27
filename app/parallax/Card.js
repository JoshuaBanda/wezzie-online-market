import Image from "next/image";
import styles from "./styles/parallax.module.css";
import {motion } from 'framer-motion';

const Card = () => {

    
    return (
        <div>
        <motion.div className={styles.heroImage} style={{ justifyContent: "center", display: "flex" }}
            
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: -300 }}
        transition={{ type: "spring",stiffness:200, duration: 0.5, delay: 0.5 }}>
          
            <span className={styles.heroImageSpan}/>
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
            animate={{ y: -400, opacity: 1 }}
            transition={{ type: "spring" ,duration:1,delay:0.5,stiffness:120}}
          >
            <div className={styles.cardBigFont}
             style={{
              position:'absolute',
              margin:'20px',
              width:'100%',
              display:'flex',
              flexDirection:'column',
              alignContent:'center',justifyContent:'center',
              fontWeight:'900',}}>
              Fashion App
            </div>
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
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: -350, opacity: 1 }}
            transition={{ type: "spring" ,duration:1,delay:1.5,stiffness:150}}
          >
            <div 
            className={styles.cardSmallFont}
            style={{
              position:'absolute',
              margin:'20px',
              width:'100%',
              display:'flex',
              flexDirection:'column',
              alignContent:'center',justifyContent:'center',
              
              fontWeight:'900',}}>
              <span>
                Cheap
              </span>
              <span>
                Affordable
              </span>
              <span>
                $ stylish too
              </span>
            </div>
          </motion.div>




          <img
            src="/Shirt2.png"
            alt=""
            height={120}
            width={80}
            style={{backgroundColor:'',
                right:'50px',position:'absolute',
            top:'90px'}}
          />
        </motion.div>
        </div>
    );
}
 
export default Card;