import { motion } from "framer-motion";
import "./GlassCard.css";

/**
 * GlassCard - 玻璃态高校卡片
 * 毛玻璃效果 + 3D 悬浮 + 渐变边框光晕
 */
const GlassCard = ({ university, index, onClick }) => {
  const { code, name, city, type, tier, salary, score2024, dormitory } = university;

  const tierColor = tier?.includes("211") ? "#f59e0b" : tier?.includes("双一流") ? "#f59e0b" : "#818cf8";

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onClick?.(university)}
      style={{ "--accent": tierColor }}
    >
      {/* 顶部渐变光条 */}
      <div className="gc-shine" />

      {/* 代码徽章 */}
      <div className="gc-header">
        <div className="gc-code-badge">
          <span className="gc-code">{code}</span>
        </div>
        <span className="gc-tier" style={{ color: tierColor, borderColor: tierColor }}>
          {tier}
        </span>
      </div>

      {/* 校名 */}
      <h3 className="gc-name">{name}</h3>

      {/* 城市 & 类型 */}
      <p className="gc-meta">{city} · {type}</p>

      {/* 关键数据 */}
      <div className="gc-stats">
        {score2024?.physics && (
          <div className="gc-stat">
            <span className="gc-stat-val">{score2024.physics.min}</span>
            <span className="gc-stat-label">物理/分</span>
          </div>
        )}
        {salary?.avg && (
          <div className="gc-stat">
            <span className="gc-stat-val">¥{Math.round(salary.avg / 1000)}k</span>
            <span className="gc-stat-label">月薪</span>
          </div>
        )}
        {dormitory?.rating && (
          <div className="gc-stat">
            <span className="gc-stat-val">
              {"★".repeat(Math.floor(dormitory.rating))}{"☆".repeat(5 - Math.floor(dormitory.rating))}
            </span>
            <span className="gc-stat-label">寝室</span>
          </div>
        )}
      </div>

      {/* hover 发光边框 */}
      <div className="gc-glow-border" />
    </motion.div>
  );
};

export default GlassCard;
