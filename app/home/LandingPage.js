"use client";
import { useEffect, useState } from "react";
import { FaBarsStaggered, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { inView, motion } from "framer-motion";
import styles from "../Styles/LandingPage.module.css";
import style from "../Styles/HomeItems.module.css";
import HomeOptions from "./HomeOptions";
import Image from "next/image";
import HomePage from "./Home";
import { useRouter } from "next/navigation";
import Sticky from "../sticky/Sticky";
import StrokeTextCanvas from "./StrokeTextCanvas";
import AnimatedPictures from "../animatedPictures/AnimatedPictures";
import AdditionTopContentForComputers from "../additionalTopContentForComputers/AdditionTopContentForComputers";
import { useInView } from "react-intersection-observer";
import { useUser } from "../userContext";

const LandingPage = () => {
  const items = [
    { name: "ToteBags",imgSrc:'/bag.png',alt:'pic' },
    { name: "Dresses",imgSrc:'/dress2.png',alt:'pic' },
    { name: "Shirts" ,imgSrc:'/shirt2.png',alt:'pic'},
    { name: "Skirts" ,imgSrc:'/skirt.png',alt:'pic'},
    { name: "Blacelets" ,imgSrc:'/bracelets.png',alt:'pic'},
  ];
  const route=useRouter();

  const [profilePicture,setProfilePicture]=useState();
  const [swing,setSwing]=useState(false);
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


  const {person}=useUser();
  
  const [user,setUser]=useState(person);
  useEffect(()=>{
    //console.log("updatting");
    setUser(person);
  //console.log('user',user,"person",person);

  },[person]);
useEffect(()=>{
  setProfilePicture(user.photourl);
},[user]);



  const [search, setSearch] = useState("Avon");
  const [listItemBorder, setListItemBorder] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

    const { ref: homeOptionListRef, inView: homeOptionListInView } = useInView({
    threshold: 0.025,
  });
  
      const { ref: welcomeListRef, inView: welcomeInView } = useInView({
    threshold: 0.025,
  });
  

  const handleOnClick = (item) => {
    setSelectedItem(item);
    setSearch(item.name);
    

    switch (item.name) {
      case "ToteBags":
        setListItemBorder(0);
        route.push("/products/ToteBags")
        break;
      case "Dresses":
        setListItemBorder(1);
          
        route.push("/products/Dresses")
        break;
      case "Skirts":
        setListItemBorder(2);  
        route.push("/products/Skirts")
        break;
      case "Blacelets":
        setListItemBorder(2);  
        route.push("/products/Bracelets")
        break;
      default:
        setListItemBorder(3);
    }
  };

  const imageList = [
  '/dress2.png',
  '/Shirt2.png',
  '/bag.png',
  '/dress.png',
];


  return (
    <div className={styles.container}>

      {/* Top Icons */}
      <motion.section className={styles.iconContainer}
        
        ref={welcomeListRef}
        initial={{opacity:0,y:-100}}
        animate={{opacity:welcomeInView?1:0,y:swing?-10:0}}
        transition={{type:'tween',duration:1}}
      >
        <div className={styles.icon1} id="customizedbackground"
        style={{overflow:'hidden'}}>
          {/*<FaBarsStaggered className={styles.inIcon} />*/}
          {/*<div className={styles.brandLabal} id="accessoryColor"
          style={{top:"-30px"}}>
            w
          </div>*/}
          
            <Image
                src='/handbag.png'
                alt='brand'
                quality={100}
                width="40"
                height="40"
                sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                priority
            />
        </div>
        <div className={styles.icon3} onClick={()=>{
          route.push('/search')
        }}
        id="accessoryColorBackground"
        >
          <FaSearch className={styles.userchIcon} />
        </div>
        <div className={styles.icon2} onClick={()=>{
          route.push('/profile')
        }}
        id="accessoryColorBackground">
          {/*<FaUser className={styles.userIcon}/>*/}
          {profilePicture?(
            <Image
                src={profilePicture}
                alt='p'
                quality={100}
                width="40"
                height="40"
                sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                priority
            />):(<FaUser className={styles.userIcon}/>)}
        </div>
      </motion.section>

      {/* Branding */}
      <motion.div className={styles.brand}
      initial={{x:0}}
        animate={
    swing
      ? { x:[350,350,350,350,350,350.350,350,350,350,-80,-70,-70,-70,-70,-50,30,320,350,350,350,350,350,350] }
      : { x: 0 }
  }
  transition={{
    duration: 15,          // total duration of one cycle
    times: [0, 0.2, 0.4, 0.6, 0.8, 1], // controls timing of each step
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop",
    delay:5
  }}
      >
        
      <motion.div className={styles.topBranding} 
        
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:swing?-40:0}}
        transition={{type:'tween',duration:1}}
      >
        <div className={styles.WelcomeRemark}>            
          <motion.span
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:5,delay:1}}
          className={styles.welcome} id="secondCustomizedColor">Welcome,</motion.span>
          <span className={styles.brandName} id="customizedColor">
          Wezzie Online Market</span>
        </div>
        <div className={styles.topbrandSubContent} id=""
          
        >
          <ul
            
          >
          <li id="customizedColor">
            Cheap
          </li>
          <li id="thirdCustomizedColor">Affordable</li>
          <li id="">
            and Stylish too
          </li>
          </ul>
        </div>
        <AnimatedPictures images={imageList}/>
      </motion.div>
      
        <div className={styles.leftBranding}>
          <motion.div
          
          initial={{opacity:0,x:100}}
          animate={{opacity:1,x:swing?-35:0}}
          transition={{type:'tween',stiffness:50,duration:1}}
          >
            <div className={styles.brandPicContainer} id="">
              <motion.div initial={{x:200,y:20}}
              animate={{x:-25,y:20}}
              transition={{type:'keyframes',duration:0.5,delay:0.4}}
              className={styles.leftbrandimage} >
          
                <Image
                    src="/bag.png"
                    alt='bag'
                    quality={100}
                    width="230"
                    height="250"
                    sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                    priority
                    style={{zIndex:-10}}
                />
                <motion.div style={{display:'grid',gap:5,
                  gridTemplateColumns:"1fr 1fr"
                }}
                  initial={{x:300,y:-120}}
                  animate={{x:-50,y:-120}}
                  transition={{type:'spring',stiffness:120,duration:2,delay:2}}
                  
                    className={styles.leftStrokeText}
                >
                  <div style={{
                    position:'relative',
                    display:'flex',alignItems:'center',flexDirection:'column',top:"20px"
                  }}
                    >
                    
                  <StrokeTextCanvas fontSize={22} text={"Wezzie"} textcolor="orangered"/>
                  
                  <StrokeTextCanvas fontSize={20} text={"online"} textcolor="black" />
                  </div>
                  <div style={{
                    display:'flex',alignItems:'center'
                  }}>
                    
                  <StrokeTextCanvas fontSize={55} text={"Shop"} textcolor="rgb(255, 0, 170)" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className={styles.additionalTopContentForComputers}
            initial={{y:-380,x:0}}
            animate={{y:0,x:0}}
            transition={{type:'tween',stiffness:200}}
          >
              <AdditionTopContentForComputers/>
          </motion.div>

        </div>
      </motion.div>























      {/* List of Items */}
      <section>
        <motion.div className={styles.itemsListContainer}
          ref={homeOptionListRef}
          initial={{opacity:0,y:-100}}
          animate={{opacity:homeOptionListInView?1:0,y:homeOptionListInView?0:-100}}
          transition={{duration:1}}
        >
          <ul className={styles.brick}>
            {items.map((item, index) => {
              const isSelected = selectedItem?.name === item.name;
              const myBackgroudColor = isSelected
                ? "rgba(255,255,255)"
                : "rgba(44,54,57)";
              const myTextColor = isSelected ? "#333" : "white";

              return (
                <motion.li id=""
                  style={{
                    color:"#444"
                  }}
                  key={index}
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x:0 }}
                  transition={{ type: "spring", stiffness: 200,duration:1 }}
                  onClick={() => handleOnClick(item)}
                  
                >

                    
                <div className={styles.HomeOptionText}>
                    <span className={styles.discount}>
                        Get affordable prices
                    </span>
                    <p>check out our new {item.name}</p>
                    <div className={styles.itemName}>
                        <div 
                            className={`
                                ${listItemBorder === index  ? style.item : style.normalitem}
                            `}
                            id="">
                               <HomeOptions
                            text={item.name}
                            myBackgroudColor={myBackgroudColor}
                            myTextColor={myTextColor}
                        />
                                
                  </div>
               
                    </div>
                </div> 
                <motion.div className={styles.img}
                    initial={{
                        x:-30,y:60,
                    }}
                    animate={{
                        opacity:0.7,
                        //y:5,
                        scale:[2.0,2.01],
                    }}
                    transition={{
                        type: 'tween',
                        stiffness: 200,
                        repeat: Infinity, 
                        repeatType:'reverse',
                        duration:2
                        }}
                >
                    <Image
                        src={item.imgSrc}
                        alt='w'
                        quality={100}
                        width="120"
                        height="80"
                        sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                        priority
                        style={{zIndex:-10}}
                    />
                </motion.div>


                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </section>
      <HomePage user={user}/>
      <Sticky/>
    </div>
  );
};

export default LandingPage;
