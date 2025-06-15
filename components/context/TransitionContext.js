'use client';

import gsap from "gsap";
import React, { createContext, useState } from "react";

export const TransitionContext = createContext({});

export const TransitionProvider = ({ children }) => {
  const [timeline, setTimeline] = useState(() => {
    return gsap.timeline({ paused: true });
  });

  return (
    <TransitionContext.Provider value={{ timeline, setTimeline }}>
      {children}
    </TransitionContext.Provider>
  );
};
