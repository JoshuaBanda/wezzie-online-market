import React, { useRef, useEffect } from 'react';

const MixedTextCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const width = 600;
    const height = 150;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Draw background color on left half
    ctx.fillStyle = '#3333cc';
    ctx.fillRect(0, 0, width / 2, height);

    // Set font
    ctx.font = '18px sans-serif';
    ctx.lineWidth = 2;

    // Draw filled text on dark background
    ctx.fillStyle = 'white';
    ctx.fillText('Filled', 20, 50);

    // Draw stroked (outlined) text on right side
    ctx.strokeStyle = '#3333cc';
    ctx.strokeText('Outlined', 320, 90);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: '1px solid #ccc' }}
    />
  );
};

export default MixedTextCanvas;
