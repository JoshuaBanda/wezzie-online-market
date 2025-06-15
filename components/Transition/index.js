'use client';
import { useRef, useEffect, useState, useContext } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TransitionContext } from '../context/TransitionContext';
import Home from '@/app/page';

const Index = ({ children }) => {
  const container = useRef();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const previousPath = useRef(pathname);
    const {timeline}=useContext(TransitionContext);
  useGSAP(() => {
    if (pathname !== previousPath.current && !isAnimating) {
        
    console.log('......................')
        timeline.play().then(()=>{
            setDisplayChildren(children)
            timeline.pause().clear();
        })
      /*setIsAnimating(true);
      console.log("........");

      gsap.to(container.current, {
        opacity: 0,
        duration: 2,
        onComplete: () => {
          previousPath.current = pathname;
          setDisplayChildren(children); // swap page content
        },
      });*/
    }
  }, [pathname, children, isAnimating]);

  useEffect(() => {
    // Only animate in when new children are rendered
    if (isAnimating) {
    /*   gsap.fromTo(
        container.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          onComplete: () => {
            setIsAnimating(false);
          },
        }
      );*/
    }
  }, [displayChildren, isAnimating]);

  return (
    <div ref={container}>
      {displayChildren}
    </div>
  );
};

export default Index;
