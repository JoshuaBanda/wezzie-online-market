"use client";
import styles from './styles/canvaText.module.css';
import React, { useRef, useEffect } from 'react';

const CanvaText = ({
  fontSize = 50,
  text = "WEZZIE",
  textcolor = 'rgba(255,0,255,1)',

  secondTextfontSize = 60,
  secondTexttext = "Online",
  secondTexttextcolor = 'rgb(94, 218, 100)',

  thirdTextfontSize = 40,
  thirdTexttext = "SHOP",
  thirdTexttextcolor = 'black',
}) => {
  const canvasRef = useRef(null);
  const secondCanvasRef = useRef(null);
  const thirdCanvasRef = useRef(null);

  // First text effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.font = `${fontSize}px sans-serif`;
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize * 1.2;

    canvas.width = textWidth * dpr;
    canvas.height = textHeight * dpr;
    canvas.style.width = `${textWidth}px`;
    canvas.style.height = `${textHeight}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px sans-serif`;
    ctx.strokeStyle = textcolor;
    ctx.lineWidth = 1;
    ctx.textBaseline = 'top';
    ctx.strokeText(text, 0, 0);
  }, [fontSize, text, textcolor]);

  // Second text effect
  useEffect(() => {
    const canvas = secondCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.font = `${secondTextfontSize}px sans-serif`;
    const textMetrics = ctx.measureText(secondTexttext);
    const textWidth = textMetrics.width;
    const textHeight = secondTextfontSize * 1.2;

    canvas.width = textWidth * dpr;
    canvas.height = textHeight * dpr;
    canvas.style.width = `${textWidth}px`;
    canvas.style.height = `${textHeight}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${secondTextfontSize}px sans-serif`;
    ctx.strokeStyle = secondTexttextcolor;
    ctx.lineWidth = 1;
    ctx.textBaseline = 'top';
    ctx.strokeText(secondTexttext, 0, 0);
  }, [secondTextfontSize, secondTexttext, secondTexttextcolor]);

  // Third text effect
  useEffect(() => {
    const canvas = thirdCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.font = `${thirdTextfontSize}px sans-serif`;
    const textMetrics = ctx.measureText(thirdTexttext);
    const textWidth = textMetrics.width;
    const textHeight = thirdTextfontSize * 1.2;

    canvas.width = textWidth * dpr;
    canvas.height = textHeight * dpr;
    canvas.style.width = `${textWidth}px`;
    canvas.style.height = `${textHeight}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${thirdTextfontSize}px sans-serif`;
    ctx.strokeStyle = thirdTexttextcolor;
    ctx.lineWidth = 1;
    ctx.textBaseline = 'top';
    ctx.strokeText(thirdTexttext, 0, 0);
  }, [thirdTextfontSize, thirdTexttext, thirdTexttextcolor]);

  return (
    <div className={styles.container}>
      <div className={styles.firsttextWrapper}>
        <canvas ref={canvasRef} className={styles.firststokeText} />
        <div className={styles.firstfullText} style={{
          fontSize: `${fontSize}px`,
          fontFamily: 'sans-serif',
          color:`${textcolor}`
        }}>
          {text}
        </div>
      </div>

      <div className={styles.secondtextWrapper}>
        <canvas ref={secondCanvasRef} className={styles.secondstokeText} />
        <div className={styles.secondfullText} style={{
          fontSize: `${secondTextfontSize}px`,
          fontFamily: 'sans-serif',
          color: secondTexttextcolor,
        }}>
          {secondTexttext}
        </div>
      </div>

      <div className={styles.thirdtextWrapper}>
        <canvas ref={thirdCanvasRef} className={styles.thirdstokeText} />
        <div className={styles.thirdfullText} style={{
          fontSize: `${thirdTextfontSize}px`,
          fontFamily: 'sans-serif',
          color: thirdTexttextcolor,
        }}>
          {thirdTexttext}
        </div>
      </div>
    </div>
  );
};

export default CanvaText;
