import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import universities from "../data/universities";
import "./OrbitalRing.css";

/**
 * OrbitalRing - 标志环组件
 * 参考 react-bits.dev OrbitImages 的标志环设计
 * 高校令牌在金属质感光环上持续旋转
 * hover 触发 TrueFocus：目标清晰 + 四角框 + 其他虚化
 */
const OrbitalRing = ({
  radius = 340,
  rotationSpeed = 60,
  onSelect,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const ringRef = useRef(null);
  const rotationRef = useRef(0);
  const animFrameRef = useRef(null);
  const isHoveredRef = useRef(false);
  const nodePosRef = useRef([]);

  const total = universities.length;

  // 持续旋转整个环
  useEffect(() => {
    let lastTime = performance.now();
    const speed = (2 * Math.PI) / rotationSpeed;

    const animate = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isHoveredRef.current) {
        rotationRef.current += speed * delta;
        if (ringRef.current) {
          ringRef.current.style.transform = `rotate(${rotationRef.current}rad)`;
        }
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [rotationSpeed]);

  const handleMouseEnter = (index) => {
    isHoveredRef.current = true;
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setHoveredIndex(null);
  };

  return (
    <div className="orbital-stage">
      {/* ===== 标志环主体 ===== */}
      <div className="token-ring-wrapper" ref={ringRef}>
        {/* 环本身 - 多层金属质感 */}
        <svg className="token-ring-svg" viewBox="0 0 800 800">
          <defs>
            {/* 金属渐变 */}
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="20%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
            </linearGradient>

            {/* 环形轨道渐变 */}
            <radialGradient id="trackGrad" cx="50%" cy="50%" r="50%">
              <stop offset="72%" stopColor="transparent" />
              <stop offset="73%" stopColor="rgba(99,102,241,0.15)" />
              <stop offset="75%" stopColor="rgba(139,92,246,0.5)" />
              <stop offset="77%" stopColor="rgba(99,102,241,0.15)" />
              <stop offset="78%" stopColor="transparent" />
            </radialGradient>

            {/* 发光滤镜 */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="glowStrong">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 轨道面 */}
          <circle cx="400" cy="400" r="345" fill="none" stroke="url(#metalGrad)" strokeWidth="24" opacity="0.3" />

          {/* 轨道边 - 外 */}
          <circle cx="400" cy="400" r="357" fill="none" stroke="rgba(139,92,246,0.4)" strokeWidth="2" filter="url(#glow)" />

          {/* 轨道边 - 内 */}
          <circle cx="400" cy="400" r="333" fill="none" stroke="rgba(99,102,241,0.4)" strokeWidth="2" filter="url(#glow)" />

          {/* 金属光泽线 */}
          <circle cx="400" cy="400" r="345" fill="none" stroke="url(#metalGrad)" strokeWidth="1.5" opacity="0.6" filter="url(#glow)" />
        </svg>

        {/* 闪光扫过轨道 */}
        <div className="track-shine-sweep" />

        {/* ===== 高校令牌 ===== */}
        {universities.map((uni, index) => {
          const angle = (2 * Math.PI / total) * index - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <div
              key={uni.code}
              className={`token-item ${isHovered ? "token-focused" : ""} ${
                isAnyHovered && !isHovered ? "token-blurred" : ""
              }`}
              style={{
                "--tx": `${x}px`,
                "--ty": `${y}px`,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onSelect?.(uni)}
            >
              {/* 令牌主体 */}
              <div className="token-body">
                {/* 令牌旋转光环 */}
                <div className="token-halo-ring" />

                {/* 令牌核心 */}
                <div className="token-core">
                  <span className="token-code">{uni.code}</span>
                </div>

                {/* 令牌外环 */}
                <div className="token-outer-ring" />
              </div>

              {/* TrueFocus 四角瞄准框 */}
              <motion.div
                className="token-focus-frame"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.85,
                }}
                transition={{ duration: 0.25 }}
              >
                <span className="tc tl" />
                <span className="tc tr" />
                <span className="tc bl" />
                <span className="tc br" />
              </motion.div>

              {/* 聚焦详情浮层 */}
              <motion.div
                className="token-detail"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.25 }}
              >
                <span className="td-name">{uni.name}</span>
                <span className="td-info">{uni.city} · {uni.tier}</span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitalRing;
