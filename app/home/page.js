"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Welcome from "../welcome/Welcome";
import LandingPage from "./LandingPage";
import { useUser } from "../userContext";

const FrontPage = () => {
  const [showLanding, setShowLanding] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  
    const {person}=useUser();
    
    const [user,setUser]=useState(person);
      useEffect(()=>{
    //console.log("updatting");
    setUser(person);
  //  console.log('user',user,"person",person);
  },[person]);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (hasVisited) {
      setShowLanding(true); // Skip welcome if visited
    }

    setInitialCheckDone(true);
  }, []);

  const handleEnter = () => {
    localStorage.setItem("hasVisited", "true"); // Save visit
    setShowLanding(true);
  };

  if (!initialCheckDone) return null; // Prevent render flicker

  return (
    <div onClick={!showLanding ? handleEnter : undefined}>
      <AnimatePresence mode="wait">
        {!showLanding ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Welcome />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FrontPage;
