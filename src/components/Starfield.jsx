import { useRef, useEffect } from "react";

const Starfield = ({ count = 60, speed = 0.15 }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const frameSkip = useRef(0);

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
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.5 + 0.2,
        spd: Math.random() * 0.008 + 0.002,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    const animate = () => {
      frameSkip.current++;
      if (frameSkip.current % 3 !== 0) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.alpha += s.spd * speed;
        if (s.alpha > 0.8 || s.alpha < 0.15) s.spd *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199,210,254,${s.alpha})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [count, speed]);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
};

export default Starfield;
