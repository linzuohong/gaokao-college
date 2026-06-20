import { useRef, useEffect } from "react";
import "./Starfield.css";

const Starfield = ({ count = 200, speed = 0.3 }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w, h;
    const stars = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      stars.length = 0;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.15,
          driftY: (Math.random() - 0.5) * 0.08 - 0.1,
        });
      }
    };

    init();
    window.addEventListener("resize", init);

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      stars.forEach((s) => {
        // 缓慢漂移
        s.x += s.driftX * speed;
        s.y += s.driftY * speed;
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        const alpha = 0.3 + 0.7 * Math.sin(frame * s.twinkleSpeed + s.twinkleOffset);
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
        glow.addColorStop(0, `rgba(199,210,254,${alpha * 0.9})`);
        glow.addColorStop(0.3, `rgba(165,180,252,${alpha * 0.4})`);
        glow.addColorStop(1, "rgba(99,102,241,0)");

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224,231,255,${alpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", init);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [count, speed]);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
};

export default Starfield;
