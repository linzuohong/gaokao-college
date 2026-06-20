import { motion } from "framer-motion";
import "./CircularHalo.css";

/**
 * CircularHalo - 圆形光环 / 目标光环组件
 * 带旋转渐变光环和脉冲波纹的圆形装饰
 * 用于卡片 hover 状态或独立装饰元素
 */
const CircularHalo = ({
  active = false,
  size = 120,
  ringColor = "#6366f1",
  ringWidth = 2,
  pulseSpeed = 2,
  rotateSpeed = 8,
  className = "",
  children,
}) => {
  return (
    <motion.div
      className={`circular-halo ${active ? "halo-active" : ""} ${className}`}
      style={{
        width: size,
        height: size,
        "--ring-color": ringColor,
        "--ring-width": `${ringWidth}px`,
      }}
      animate={
        active
          ? {
              scale: [1, 1.05, 1],
              boxShadow: [
                `0 0 0 0 ${ringColor}40`,
                `0 0 0 ${size * 0.35}px ${ringColor}00`,
                `0 0 0 0 ${ringColor}00`,
              ],
            }
          : {}
      }
      transition={{
        scale: {
          duration: pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        },
        boxShadow: {
          duration: pulseSpeed,
          repeat: Infinity,
          ease: "easeOut",
        },
      }}
    >
      {/* 旋转光环 */}
      <div
        className="halo-ring"
        style={{
          animationDuration: `${rotateSpeed}s`,
        }}
      />
      {/* 脉冲波纹 */}
      <div
        className="halo-pulse"
        style={{
          animationDuration: `${pulseSpeed}s`,
        }}
      />
      {/* 内容 */}
      <div className="halo-content">{children}</div>
    </motion.div>
  );
};

export default CircularHalo;
