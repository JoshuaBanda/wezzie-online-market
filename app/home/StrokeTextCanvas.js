import React, { useRef, useEffect } from 'react';

const StrokeTextCanvas = ({ fontSize , text, textcolor = 'white' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

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

    ctx.strokeText(text, 0, fontSize); // draw at baseline = fontSize
  }, [fontSize, text, textcolor]);

  return <canvas ref={canvasRef}  />;
};

export default StrokeTextCanvas;
