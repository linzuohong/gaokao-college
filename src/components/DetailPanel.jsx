import { motion } from "framer-motion";
import "./DetailPanel.css";

const DetailPanel = ({ university, onClose }) => {
  if (!university) return null;
  const { name, code, city, type, tier, score2024, salary, dormitory, tags } = university;

  return (
    <motion.div
      className="dp-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="dp-panel"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="dp-close" onClick={onClose}>✕</button>

        {/* 顶部横幅 */}
        <div className="dp-banner">
          <div className="dp-code-hero">
            <span className="dp-code-num">{code}</span>
          </div>
          <div className="dp-title-area">
            <h2 className="dp-name">{name}</h2>
            <p className="dp-subtitle">{city} · {type} · <span className="dp-tier-badge">{tier}</span></p>
            <div className="dp-tags">
              {tags?.map((t) => <span key={t} className="dp-tag">{t}</span>)}
            </div>
          </div>
        </div>

        <div className="dp-divider" />

        {/* 录取数据 */}
        <section className="dp-section">
          <h3 className="dp-section-title">江西省录取数据</h3>
          <div className="dp-scores">
            {score2024?.physics && (
              <div className="dp-score-block">
                <span className="dp-score-subject">物理类</span>
                <div className="dp-score-progress">
                  <div className="dp-progress-track">
                    <motion.div
                      className="dp-progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(score2024.physics.min / 650) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                </div>
                <div className="dp-score-data">
                  <span className="dp-score-big">{score2024.physics.min}<small>分</small></span>
                  <span className="dp-score-rank">位次 {score2024.physics.rank?.toLocaleString()}</span>
                </div>
              </div>
            )}
            {score2024?.history && (
              <div className="dp-score-block">
                <span className="dp-score-subject">历史类</span>
                <div className="dp-score-progress">
                  <div className="dp-progress-track">
                    <motion.div
                      className="dp-progress-fill hist"
                      initial={{ width: 0 }}
                      animate={{ width: `${(score2024.history.min / 620) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
                <div className="dp-score-data">
                  <span className="dp-score-big">{score2024.history.min}<small>分</small></span>
                  <span className="dp-score-rank">位次 {score2024.history.rank?.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 薪酬 + 寝室 */}
        <div className="dp-grid-2">
          <section className="dp-section">
            <h3 className="dp-section-title">毕业生薪酬</h3>
            <div className="dp-salary">
              <div className="dp-salary-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="7" />
                  <motion.circle
                    cx="50" cy="50" r="40"
                    fill="none" stroke="url(#dpGrad)" strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${((salary?.avg || 7000) / 15000) * 251} 251`}
                    transform="rotate(-90 50 50)"
                    initial={{ strokeDasharray: "0 251" }}
                    animate={{ strokeDasharray: `${((salary?.avg || 7000) / 15000) * 251} 251` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                  <defs>
                    <linearGradient id="dpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#a78bfa"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="dp-salary-center">
                  <span className="dp-salary-num">¥{salary?.avg?.toLocaleString() || "—"}</span>
                  <span className="dp-salary-unit">/月</span>
                </div>
              </div>
              <span className="dp-salary-note">全国排名 {salary?.rank || "—"}</span>
            </div>
          </section>

          <section className="dp-section">
            <h3 className="dp-section-title">寝室住宿</h3>
            <div className="dp-dorm">
              <div className="dp-dorm-stars">
                {[1,2,3,4,5].map((i) => (
                  <motion.span
                    key={i}
                    className={`dp-star ${i <= Math.floor(dormitory?.rating || 3) ? "on" : ""}`}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                  >★</motion.span>
                ))}
                <span className="dp-dorm-num">{dormitory?.rating || "—"}/5</span>
              </div>
              <p className="dp-dorm-desc">{dormitory?.desc || "暂无数据"}</p>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailPanel;
