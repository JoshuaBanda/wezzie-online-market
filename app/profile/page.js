"use client";
import Image from "next/image";
import CircularBackground from "./CircularBackground";
import styles from "./styles/profile.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const Profile = () => {
    const [userData,setUserData]=useState();
    const [loading,setLoading]=useState(false);
    const [notificationStatus,setNotificationStatus]=useState();
    
    const res={
  "status": "success",
  "message": "Profile.",
  "data": {
    "user": {
      "id": 1,
      "firstname": "Wezzie",
      "lastname": "Mwantenga",
      "defaultaddress":"blantyre",
      "phonecontact":"+265885249030",
      "notificationStatus":false,
      "paymentMethod":"payPal",
      "dateOfBirth":"15 june 2004",

    }
  }
}
useEffect(()=>{
    
    setUserData(res.data.user);
},[])

    const userDetails={}
    return (
        <div className={styles.container} id="customizedbackground">  
        <CircularBackground/>
        <h3 className={styles.header}>
            Profile
        </h3>

        <motion.div
            initial={{y:0}}
            animate={{y:0}}
            transition={{type:'spring',stiffness:300}}
            className={styles.profilePicture}
        >

            <Image
                src='/bag.png'
                alt={'profile'}
                quality={100}
                width={150}
                height={150}
                sizes="(max-width:768px)150vw, (max-width:1200px)50vw, 33vw"
                priority
            />
        </motion.div>
        {/*name */}

        <div className={styles.name}>
            <div>
                {userData?.firstname}
            </div>
            <div>
                {userData?.lastname}
            </div>
        </div>
        <motion.div
            initial={{y:0}}
            animate={{y:0}}
            transition={{type:'spring',stiffness:300}}
            className={styles.userDetails}
        >
            
            {/*address */}
            <div>
                <span>Address:</span>
                <p>{userData?.defaultaddress}</p>
            </div>
            {/*address */}
            <div>
                <span>Mobile:</span>
                <p>{userData?.phonecontact}</p>
            </div>
            
            <div>
                <span>payment option:</span>
                <p>{userData?.paymentMethod}</p>
            </div>
                        
            <div>
                <span>date of birth:</span>
                <p>{userData?.dateOfBirth}</p>
            </div>
            <div>
                <span>notification:</span>
                <label>
                    <input type="checkbox" onChange={()=>{setNotificationStatus(!notificationStatus)}}/>
                    
                </label>
            </div>
        </motion.div>

        
        <motion.div
            initial={{y:0}}
            animate={{y:0}}
            transition={{type:'spring',stiffness:300}}
            className={styles.editUserDetails}
        >
        </motion.div>
        </div>
    );
}
 
export default Profile;
