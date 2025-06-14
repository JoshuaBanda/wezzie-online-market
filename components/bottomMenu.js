"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../app/Styles/BottomMain.module.css";
import Link from "next/link";
import { FaAddressBook, FaBox, FaCog, FaHome, FaSearch, FaSignInAlt, FaUser } from "react-icons/fa";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const BottomMenu = () => {
  const router = useRouter();
  const [showMenuPopUp, setShowMenPopUp] = useState(false);
  const menuRef = useRef(null); // Ref to detect outside click

  const handleHomeClick = () => {
    router.push("/home");
  };
  const menuIcons = {
    Products: <FaBox />,
    Settings: <FaCog />,
    Profile: <FaUser />,
    PurchaseHistory:<FaAddressBook/>,
    SignIn: <FaSignInAlt />,
  };
  
  const menu = ["Products", "Settings", "Profile","PurchaseHistory","SignIn"];
  const handleMenuPopItems=(item)=>{
    if (item=="SignIn"){
      router.push("/login")
    }
    else if(item=="Products"){
      router.push('/productList');
    }
    else if(item=="Settings"){
      router.push('/adminPrivileges');
    }else if (item=="PurchaseHistory"){
      router.push('/purchaseHistory')
    }
  }
  const menuPopUp = menu.map((item, index) => (
    <li key={index} onClick={() => handleMenuPopItems(item)} className={styles.menuItem}>
      <span className={styles.menuIcon}>{menuIcons[item]}</span><span>
  {
    (item === "SignIn") ? (
      <>Sign In</>
    ) : (
      (item === "PurchaseHistory") ? (
        <>Purchase History</>
      ) : (
        <>{item}</>
      )
    )
  }
</span>

    </li>
  ));
  
  

  const handleMenuToggle = () => {
    setShowMenPopUp(!showMenuPopUp);
  };

  // 🔁 Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenPopUp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart",handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart",handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.div className={styles.main} id="customizedbackground">
        <div onClick={handleHomeClick}>
          <FaHome className={styles.icons} id=""/>
        </div>

        <div>
          <FaSearch className={styles.icons} id="" />
        </div>

        <div>
          <FaCartShopping className={styles.icons} onClick={()=>{
            
            router.push("/cart");
          }}
            id=""
          />
        </div>

        <div ref={menuRef} onClick={handleMenuToggle} id="">
          <FaBars className={styles.icons} />
          {/* Menu Pop Up */}
          {showMenuPopUp && (
            <ul className={styles.menuPopUp}>{menuPopUp}</ul>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default BottomMenu;
