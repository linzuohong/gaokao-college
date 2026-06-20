import { useRef, useEffect } from "react";
import "./LightRays.css";

/**
 * LightRays - 光线背景组件
 * 从中心向四周发射动态光线，360度覆盖
 * 用于环形布局的背景氛围
 */
const LightRays = ({
  intensity = 0.18,
  speed = 0.2,
  color = "#6366f1",
  rayCount = 48,
}) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height, centerX, centerY;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      centerX = width / 2;
      centerY = height / 2;
    };

    resize();
    window.addEventListener("resize", resize);

    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgb = hexToRgb(color);
    const angleStep = (2 * Math.PI) / rayCount;

    const animate = () => {
      timeRef.current += 0.004 * speed;
      ctx.clearRect(0, 0, width, height);

      const maxLen = Math.max(width, height) * 1.2;

      for (let i = 0; i < rayCount; i++) {
        const angle = i * angleStep;
        const flicker =
          1 +
          Math.sin(timeRef.current * 2.5 + i * 0.5) * 0.4 +
          Math.cos(timeRef.current * 1.3 + i * 0.8) * 0.3 +
          Math.sin(timeRef.current * 4 + i * 1.3) * 0.2;

        const alpha = intensity * flicker * 0.9;

        const gradient = ctx.createLinearGradient(
          centerX,
          centerY,
          centerX + Math.cos(angle) * maxLen,
          centerY + Math.sin(angle) * maxLen
        );

        gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
        gradient.addColorStop(0.25, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`);
        gradient.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);

        const halfWidth = angleStep * 0.45;

        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle - halfWidth) * 80,
          centerY + Math.sin(angle - halfWidth) * 80
        );
        ctx.lineTo(
          centerX + Math.cos(angle + halfWidth) * maxLen,
          centerY + Math.sin(angle + halfWidth) * maxLen
        );
        ctx.lineTo(
          centerX + Math.cos(angle - halfWidth) * maxLen,
          centerY + Math.sin(angle - halfWidth) * maxLen
        );
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [color, intensity, speed, rayCount]);

  return <canvas ref={canvasRef} className="light-rays-canvas" />;
};

export default LightRays;
