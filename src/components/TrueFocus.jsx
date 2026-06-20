import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./TrueFocus.css";

/**
 * TrueFocus - 真正的焦点文字动画
 * 基于 react-bits.dev TrueFocus 组件
 * 词与词之间切换焦点，未聚焦的词虚化，聚焦词带四角边框
 */
const TrueFocus = ({
  sentence = "真正 焦点",
  blurAmount = 4,
  borderColor = "#6366f1",
  glowColor = "#818cf8",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.5,
  fontSize = "2.5rem",
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);
    return () => clearInterval(interval);
  }, [animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex < 0) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect =
      wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  return (
    <div className="focus-container" ref={containerRef} style={{ fontSize }}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${isActive ? "active" : ""}`}
            style={{
              filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
            }}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x - 8,
          y: focusRect.y - 8,
          width: focusRect.width + 16,
          height: focusRect.height + 16,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={{
          "--border-color": borderColor,
          "--glow-color": glowColor,
        }}
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </motion.div>
    </div>
  );
};

export default TrueFocus;
