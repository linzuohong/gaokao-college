import { useEffect, useRef, useState } from "react";
import "./GlassCard.css";

const GlassCard = ({ university, index, onClick }) => {
  const { code, name, city, type, tier, score2024, salary, dormitory, liberalArts, color } = university;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { rootMargin: "40px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`glass-card ${visible ? "gc-visible" : ""}`}
      style={{ "--accent": color, transitionDelay: `${index * 40}ms` }}
      onClick={() => onClick?.(university)}
    >
      <div className="gc-shine" />
      <div className="gc-header">
        <div className="gc-code-badge"><span className="gc-code">{code}</span></div>
        <div className="gc-badges"><span className="gc-tier" style={{ color, borderColor: color }}>{tier}</span></div>
      </div>
      <h3 className="gc-name">{name}</h3>
      <p className="gc-meta">{city} · {type}</p>
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
      <div className="gc-stats">
        {salary?.avg && <div className="gc-stat"><span className="gc-stat-val">¥{Math.round(salary.avg/1000)}k</span><span className="gc-stat-label">月薪</span></div>}
        {dormitory?.rating && <div className="gc-stat"><span className="gc-stat-val dorm">{"★".repeat(Math.floor(dormitory.rating))}</span><span className="gc-stat-label">寝室</span></div>}
      </div>
      {liberalArts && (
        <div className="gc-liberal"><span className="gc-liberal-icon">📖</span><span className="gc-liberal-text">{liberalArts.slice(0,42)}...</span></div>
      )}
      <div className="gc-glow-border" />
    </div>
  );
};

export default GlassCard;
