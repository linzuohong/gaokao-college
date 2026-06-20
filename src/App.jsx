import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Starfield from "./components/Starfield";
import GlassCard from "./components/GlassCard";
import DetailPanel from "./components/DetailPanel";
import universities from "./data/universities";
import "./App.css";

const TIERS = [
  { key: "全部", label: "全部院校" },
  { key: "211/双一流", label: "211 / 双一流" },
  { key: "双一流", label: "双一流" },
  { key: "省重点", label: "省重点" },
];

function App() {
  const [activeTier, setActiveTier] = useState("全部");
  const [selectedUni, setSelectedUni] = useState(null);

  const filtered = useMemo(() => {
    if (activeTier === "全部") return universities;
    return universities.filter((u) => u.tier === activeTier);
  }, [activeTier]);

  return (
    <div className="app">
      {/* 星空背景 */}
      <Starfield count={180} speed={0.35} />

      {/* 氛围光晕 */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      {/* 顶部导航 */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="logo">
            <span className="logo-icon">✦</span>
            <span className="logo-text">星辰择校</span>
          </div>
          <span className="topbar-count">收录 {universities.length} 所高校</span>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="hero-eyebrow">2025 · 江西高考志愿填报</p>
          <h1 className="hero-title">
            探索你的<em>星辰大海</em>
          </h1>
          <p className="hero-desc">
            每一次选择都是一颗星。25所高校的录取数据、薪酬水平与寝室条件，
            助你找到最闪亮的那一颗。
          </p>
        </motion.div>

        {/* 滚动指示器 */}
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="scroll-line" />
          <span className="scroll-text">向下探索</span>
        </motion.div>
      </section>

      {/* 筛选栏 */}
      <section className="filter-section">
        <div className="filter-bar">
          {TIERS.map((t) => (
            <button
              key={t.key}
              className={`filter-chip ${activeTier === t.key ? "active" : ""}`}
              onClick={() => setActiveTier(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="filter-count">共 <strong>{filtered.length}</strong> 所院校</p>
      </section>

      {/* Bento 网格 */}
      <section className="bento-grid">
        {filtered.map((uni, i) => (
          <GlassCard
            key={uni.code}
            university={uni}
            index={i}
            onClick={setSelectedUni}
          />
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>数据整理自江西省教育考试院公开信息 · 薪酬数据参考中国薪酬网 · 院校代码以当年招生计划为准</p>
        <p className="footer-sub">每一次点击都是一次发现</p>
      </footer>

      {/* 详情面板 */}
      <AnimatePresence>
        {selectedUni && (
          <DetailPanel
            university={selectedUni}
            onClose={() => setSelectedUni(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
