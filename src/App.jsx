import { useState, useMemo, useRef, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Starfield from "./components/Starfield";
import GlassCard from "./components/GlassCard";
import DetailPanel from "./components/DetailPanel";
import universities, { cityGroups } from "./data/universities";
import "./App.css";

function App() {
  const [selectedUni, setSelectedUni] = useState(null);
  const [activeTab, setActiveTab] = useState("全部");

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.92]);

  const filtered = useMemo(() => {
    if (activeTab === "全部") return universities;
    if (cityGroups.find(g => g.city === activeTab))
      return universities.filter(u => u.city === activeTab);
    return universities.filter(u => u.tier === activeTab);
  }, [activeTab]);

  // 统计
  const stats = useMemo(() => ({
    total: universities.length,
    cities: cityGroups.length,
    avgSalary: Math.round(universities.reduce((s, u) => s + (u.salary?.avg || 7000), 0) / universities.length),
    maxScore: Math.max(...universities.map(u => u.score2024?.physics?.min || 0)),
  }), []);

  return (
    <div className="app">
      <Starfield count={200} speed={0.35} />
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />
      <div className="ambient-glow glow-3" />

      {/* 顶部导航 */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="logo">
            <span className="logo-icon">✦</span>
            <span className="logo-text">星辰择校</span>
          </div>
          <nav className="topbar-nav">
            {["全部", ...cityGroups.map(g => g.city)].slice(0, 5).map(t => (
              <button key={t} className={`tn-link ${activeTab === t ? "active" : ""}`}
                onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <motion.section className="hero" ref={heroRef} style={{ opacity: heroOpacity, scale: heroScale }}>
        <motion.div className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="hero-eyebrow">2025 · 江西高考志愿填报</p>
          <h1 className="hero-title">
            探索<em>六座城市</em>的<em>星辰大海</em>
          </h1>
          <p className="hero-desc">
            福州 · 厦门 · 南京 · 上海 · 武汉 · 长沙——25所高校，
            录取数据、薪酬水平、文科优势、寝室条件，助你精准择校。
          </p>
        </motion.div>

        {/* 统计数字 */}
        <motion.div className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { label: "高校", value: stats.total },
            { label: "城市", value: stats.cities },
            { label: "平均月薪", value: `¥${Math.round(stats.avgSalary / 1000)}k` },
            { label: "最高录取", value: `${stats.maxScore}分` },
          ].map((s, i) => (
            <motion.div key={s.label} className="hero-stat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <span className="hero-stat-val">{s.value}</span>
              <span className="hero-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="scroll-hint"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        >
          <span className="scroll-line" />
          <span className="scroll-text">向下探索</span>
        </motion.div>
      </motion.section>

      {/* 筛选栏 */}
      <section className="filter-section">
        <div className="filter-bar">
          {["全部", ...cityGroups.map(g => g.city), "985/双一流", "211/双一流", "省重点"].map(t => (
            <button key={t}
              className={`filter-chip ${activeTab === t ? "active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="filter-count"><strong>{filtered.length}</strong> 所院校</p>
      </section>

      {/* 城市分组展示 */}
      {(activeTab === "全部" || activeTab === "省重点") && activeTab !== "985/双一流" && activeTab !== "211/双一流" ? (
        cityGroups.map((group, gi) => {
          const groupUnis = activeTab === "全部" ? group.unis : group.unis.filter(u => u.tier === activeTab);
          if (groupUnis.length === 0) return null;
          return (
            <section key={group.city} className="city-section">
              <motion.div className="city-header"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="city-dot" style={{ background: group.color, boxShadow: `0 0 16px ${group.color}80` }} />
                <h2 className="city-name">{group.city}</h2>
                <span className="city-count">{groupUnis.length} 所</span>
                <div className="city-line" />
              </motion.div>

              <div className="bento-grid">
                {groupUnis.map((uni, i) => (
                  <GlassCard key={uni.code} university={uni} index={i} onClick={setSelectedUni} />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <section className="bento-grid" style={{ paddingTop: 0 }}>
          {filtered.map((uni, i) => (
            <GlassCard key={uni.code} university={uni} index={i} onClick={setSelectedUni} />
          ))}
        </section>
      )}

      <footer className="footer">
        <p>数据整理自江西省教育考试院公开信息 · 薪酬参考中国薪酬网2024排行 · 院校代码以当年官方招生计划为准</p>
        <p className="footer-sub">每一次选择，都是一次发现 ✦</p>
      </footer>

      <AnimatePresence>
        {selectedUni && <DetailPanel university={selectedUni} onClose={() => setSelectedUni(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
