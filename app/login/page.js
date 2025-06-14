"use client";
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import styles from "../Styles/decoratedBorder.module.css";
import Spinner from '../home/Spinning';
import Image from 'next/image';
// Lazy load components
const LoginPart = dynamic(() => import('./LoginPart'));
const SignUpPage = dynamic(() => import('../userAunthentication/SignUpPage'));

export default function LoginPage() {
  const [selectedSide, setSelectedSide] = useState('left');
  const [showClass, setShowClass] = useState(true);

  const [swing,setSwing]=useState(false);

  
  useEffect(() => {
    setShowClass(true)
    const timer = setTimeout(() => {
      setShowClass(false);
    }, 5000); // remove after 6 seconds

    return () => clearTimeout(timer); // cleanup on unmount
  }, [selectedSide]);


  const handleSelect = (side) => {
    setSelectedSide(side);
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 50) {
      handleSelect('left');
    } else if (info.offset.x < -50) {
      handleSelect('right');
    }
  };

  // Dynamic styles based on side selection
  const isLeftSelected = selectedSide === 'left';

  const leftStyles = {
    width: isLeftSelected ? '80%' : '25%',
    zIndex: isLeftSelected ? 1 : 0,
    //left: isLeftSelected ? '20px' : '0px',
    borderTopLeftRadius: isLeftSelected ? '20px' : '20px',
    borderBottomLeftRadius: isLeftSelected ? '20px' : '20px',
    borderTopRightRadius: isLeftSelected ? '0px' : '0px',
    borderBottomRightRadius: isLeftSelected ? '0px' : '0px',
    backgroundColor:isLeftSelected?"": 'rgba(255,255,255,0.5)',
    
    color:isLeftSelected? 'rgba(255,255,255,1)':"rgba(0,0,0)",
  };

  const rightStyles = {
    width: isLeftSelected ? '20%' : '75%',
    zIndex: isLeftSelected ? 0 : 1,
   // right: isLeftSelected ? '0px' : '15px',
    borderTopRightRadius: isLeftSelected ? '20px' : '20px',
    borderBottomRightRadius: isLeftSelected ? '20px' : '20px',
    borderTopLeftRadius: isLeftSelected ? '0px' : '0px',
    borderBottomLeftRadius: isLeftSelected ? '0px' : '0px',
    
    backgroundColor:isLeftSelected? 'rgba(255,255,255,0.5)':"",
    
    color:isLeftSelected? 'rgba(0,0,0)':"rgba(255,255,255,1)",
  };


  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      //console.log("Current screen width:", screenWidth);
  
      if (screenWidth < 400) {
        //console.log("Setting swing to TRUE (screen is narrow)");
        setSwing(true);
      } else {
        //console.log("Setting swing to FALSE (screen is wide)");
        setSwing(false);
      }
    };
  
    // Initial check
    handleResize();
  
    // Listen for window resize
    window.addEventListener("resize", handleResize);
    //console.log("Added resize listener");
  
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    //  console.log("Removed resize listener");
    };
  }, []);
  console.log(swing);

  return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 0,
          display:'flex',
          flexDirection:'column',
          width:'100%',height:'110%',
        }}
        className={styles.wrapper}
      >
        <div style={{
          position:'fixed',
          top:'0px',
          height:"40%",
          padding:'50px',width:'100%'}}>
          <h3 style={{position:'absolute',top:'10px',
            left:'20px',
            color:'white',
          }}
          
          id='customizedColor'>
            Wezzie Online Market
          </h3>
          <motion.div style={{
            position:'fixed',
            top:'80px',left:'-50px',zIndex:-9,
            display:swing?"flex":"none",
          }}
          initial={{x:0,y:0}}
          animate={{x:isLeftSelected?0:200,y:isLeftSelected?0:-100,scale:isLeftSelected?0.7:1}}
          transition={{
            type:'spring',duration:3
          }}
          
          >
            <Image
                src='/wezzie2.png'
                alt='brand'
                quality={100}
                width="250"
                height="350"
                sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                priority
            />
          </motion.div>

          <motion.div
            id='customizedbackground'
          style={{position:'fixed',top:'20px',
            width:'250px',height:'250px',right:'0px',
            zIndex:-10,borderRadius:'50%',
            display:swing?"flex":"none"
          }}
          initial={{opacity:0.75}}
          animate={{opacity:isLeftSelected?0.7:1,scale:isLeftSelected?0.9:1.2}}
          transition={{
            duration:2
          }}
          >

          </motion.div>

        </div>




        <div style={{
          width:'100%',
          display:'flex',
          alignItems:'center',justifyContent:'center',
          top:'50px',
          position:'relative'
        }}>
          <ul
            style={{
              position: 'relative',
              display: 'flex',
              listStyle: 'none',
              padding: 0,
              height: '250px',
              width: swing?'300px':'500px',
              alignItems: 'stretch',
              borderRadius:"20px",
              boxShadow:"1px 1px 10px 1px rgba(0,0,0,0.5)",
            }}
            //className={showClass ? styles.contain : ''}
          >
            {/* LEFT PANEL (Login) */}
            <motion.li
              style={{
                ...leftStyles,
              }}
              
              className={isLeftSelected ? styles.inActiveContainer : styles.inActiveContainer}
              
              id='customizedbackground'
              onClick={() => handleSelect('left')}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              {isLeftSelected ? (
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 20 }}
                >
                  <Suspense fallback={<div > 
                    <Spinner/>
                  </div>}>
                    <LoginPart />
                  </Suspense>
                </motion.div>
              ) : (
                <div >Login</div>
              )}
            </motion.li>

            {/* RIGHT PANEL (Sign Up) */}
            <motion.li
              style={{
                backdropFilter: 'blur(15px)',
                height: '100%',
                transition: 'width 0.3s ease, right 0.3s ease',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...rightStyles,
              }}
              onClick={() => handleSelect('right')}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              
                  id='customizedbackground'
            >
              {!isLeftSelected ? (
                <motion.div
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 20 }}
                >
                  <Suspense fallback={<div style={{ color: 'black' }}><Spinner/></div>}>
                    <SignUpPage />
                  </Suspense>
                </motion.div>
              ) : (
                <div>Sign Up</div>
              )}
            </motion.li>
          </ul>
        </div>
        <div style={{
          position:'fixed',
          bottom:'0px',
          height:"10%",width:'200px'}}>
            <ul className={styles.bottomSelection}>
              <li
                id={isLeftSelected?"customizedbackground":""}
                style={{
                  ...leftStyles,width:'100px'
                }}
                
              onClick={() => handleSelect('left')}
              >
                Login
              </li>
              <li
                id={isLeftSelected?"":"customizedbackground"}
                style={{
                  ...rightStyles,width:'100px'
                }}
                
              onClick={() => handleSelect('right')}
              >
                Sign up
              </li>
            </ul>
        </div>
        

        <div className={styles.backgroundblur}/>
      </div>
  );
}
