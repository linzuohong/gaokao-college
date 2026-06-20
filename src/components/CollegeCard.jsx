import { useState } from "react";
import { motion } from "framer-motion";
import CircularHalo from "./CircularHalo";
import "./CollegeCard.css";

/**
 * CollegeCard - 高校信息卡片
 * 集成圆形光环效果，hover 时激活光环和目标焦点
 */
const CollegeCard = ({ university, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const tierColors = {
    "211/双一流": "#f59e0b",
    "双一流": "#f59e0b",
    "省重点": "#6366f1",
  };

  const accentColor = tierColors[university.tier] || "#6366f1";

  return (
    <motion.div
      className="college-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* 背景微光 */}
      <div
        className="card-glow"
        style={{
          "--glow-color": accentColor,
          opacity: isHovered ? 0.15 : 0.04,
        }}
      />

      {/* 左上角光环装饰 */}
      <div className="card-halo-wrapper">
        <CircularHalo
          active={isHovered}
          size={60}
          ringColor={accentColor}
          ringWidth={1.5}
          pulseSpeed={2.5}
          rotateSpeed={6}
        />
        <div className="card-code-circle">
          <span className="card-code">{university.code}</span>
        </div>
      </div>

      {/* 院校名称 */}
      <h3 className="card-name">{university.name}</h3>

      {/* 城市 & 类型 */}
      <div className="card-info">
        <span className="card-city">{university.city}</span>
        <span className="card-divider">·</span>
        <span className="card-type">{university.type}</span>
      </div>

      {/* 层次标签 */}
      <span
        className="card-tier"
        style={{
          color: accentColor,
          borderColor: accentColor,
          background: `${accentColor}15`,
        }}
      >
        {university.tier}
      </span>

      {/* hover 时的瞄准框效果 */}
      <motion.div
        className="card-focus-overlay"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="card-corner tl" />
        <span className="card-corner tr" />
        <span className="card-corner bl" />
        <span className="card-corner br" />
      </motion.div>
    </motion.div>
  );
};

export default CollegeCard;
