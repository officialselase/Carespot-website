// src/components/AnimatedNumber.jsx

import React, { useState, useEffect, useRef } from "react";

const AnimatedNumber = ({ target, duration = 2000 }) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const observer = useRef(null);
  const animationFrameId = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          startCounting();
          hasAnimated.current = true;
          if (observer.current) {
            observer.current.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [target, duration]);

  const startCounting = () => {
    const start = 0;
    const end = parseInt(target.replace(/[^0-9]/g, ""), 10);
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCurrent(Math.floor(start + progress * (end - start)));
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        setCurrent(end);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  const displayValue =
    typeof current === "number" &&
    target.includes("+") &&
    current === parseInt(target.replace(/[^0-9]/g, ""), 10)
      ? `${current.toLocaleString()}+`
      : typeof current === "number"
      ? current.toLocaleString()
      : current;

  return <span ref={ref}>{displayValue}</span>;
};

export default AnimatedNumber;
