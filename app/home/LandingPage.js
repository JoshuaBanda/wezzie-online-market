"use client";
import { useEffect, useState } from "react";
import { FaBarsStaggered, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "../Styles/LandingPage.module.css";
import style from "../Styles/HomeItems.module.css";
import HomeOptions from "./HomeOptions";
import Image from "next/image";
import HomePage from "./Home";
import { useRouter } from "next/navigation";
import Sticky from "../sticky/Sticky";

const LandingPage = ({user}) => {
  const items = [
    { name: "ToteBags",imgSrc:'/bag.png',alt:'pic' },
    { name: "Dresses",imgSrc:'/dress2.png',alt:'pic' },
    { name: "Shirts" ,imgSrc:'/shirt2.png',alt:'pic'},
    { name: "Skirts" ,imgSrc:'/Skirt.png',alt:'pic'},
    { name: "Blacelets" ,imgSrc:'/bracelets.png',alt:'pic'},
  ];
  const route=useRouter();

  const [search, setSearch] = useState("Avon");
  const [listItemBorder, setListItemBorder] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

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


  return (
    <div className={styles.container}>
      {/* Top Icons */}
      <section className={styles.iconContainer}>
        <div className={styles.icon1} id="customizedbackground">
          <FaBarsStaggered className={styles.inIcon} />
        </div>
        <div className={styles.icon2} onClick={()=>{
          route.push('/profile')
        }}>
          <FaUser className={styles.userIcon} />
        </div>
      </section>

      {/* Branding */}
      <div className={styles.topBranding}>
        <span className={styles.welcome} id="secondCustomizedColor">Welcome,</span>
        <span className={styles.brandName} id="customizedColor">
        Wezzie Online Market</span>
      </div>

      {/* Search Bar */}
      <div className={styles.wrapper}>
        <section
          className={styles.sectionSearch}
          id="customizedbackground"
          role="search"
          aria-label="Search input"
        >
          <label htmlFor="searchInput" className={styles.icon}>
            <FaSearch className={styles.iconSearch} />
          </label>
          <input
            type="text"
            id="customizedbackground"
            className={styles.inputSearch}
            placeholder="Search..."
            aria-label="Search"
            maxLength={20}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
      </div>

      {/* List of Items */}
      <section>
        <div className={styles.itemsListContainer}>
          <ul>
            {items.map((item, index) => {
              const isSelected = selectedItem?.name === item.name;
              const myBackgroudColor = isSelected
                ? "rgba(255,255,255)"
                : "rgba(44,54,57)";
              const myTextColor = isSelected ? "#333" : "white";

              return (
                <motion.li id="customizedbackground"
                  key={index}
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
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
                            id="customizedColor">
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
        </div>
      </section>
      <HomePage user={user}/>
      <Sticky/>
    </div>
  );
};

export default LandingPage;
