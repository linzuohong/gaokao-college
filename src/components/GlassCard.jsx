import { motion } from "framer-motion";
import "./GlassCard.css";

const GlassCard = ({ university, index, onClick }) => {
  const { code, name, city, type, tier, score2024, salary, dormitory, history, liberalArts, color } = university;

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
      onClick={() => onClick?.(university)}
      style={{ "--accent": color }}
    >
      <div className="gc-shine" />

      {/* 头部 */}
      <div className="gc-header">
        <div className="gc-code-badge">
          <span className="gc-code">{code}</span>
        </div>
        <div className="gc-badges">
          <span className="gc-tier" style={{ color, borderColor: color }}>{tier}</span>
        </div>
      </div>

      <h3 className="gc-name">{name}</h3>
      <p className="gc-meta">{city} · {type}</p>

      {/* 分数行 - 物理 + 历史并列 */}
      <div className="gc-scores">
        {score2024?.physics && (
          <div className="gc-score-item">
            <span className="gc-score-label">物理</span>
            <span className="gc-score-val">{score2024.physics.min}<small>分</small></span>
            <span className="gc-score-rank">#{score2024.physics.rank?.toLocaleString()}</span>
          </div>
        )}
        {score2024?.history && (
          <div className="gc-score-item">
            <span className="gc-score-label">历史</span>
            <span className="gc-score-val">{score2024.history.min}<small>分</small></span>
            <span className="gc-score-rank">#{score2024.history.rank?.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* 薪酬 + 寝室 */}
      <div className="gc-stats">
        {salary?.avg && (
          <div className="gc-stat">
            <span className="gc-stat-val">¥{Math.round(salary.avg / 1000)}k</span>
            <span className="gc-stat-label">月薪</span>
          </div>
        )}
        {dormitory?.rating && (
          <div className="gc-stat">
            <span className="gc-stat-val dorm">
              {"★".repeat(Math.floor(dormitory.rating))}
            </span>
            <span className="gc-stat-label">寝室</span>
          </div>
        )}
      </div>

      {/* 一句话特色 或 文科提示 */}
      {liberalArts && (
        <div className="gc-liberal">
          <span className="gc-liberal-icon">📖</span>
          <span className="gc-liberal-text">{liberalArts.slice(0, 45)}...</span>
        </div>
      )}

      <div className="gc-glow-border" />
    </motion.div>
  );
};

export default GlassCard;
