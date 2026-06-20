import { useState, useMemo, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import GlassCard from "./components/GlassCard";
import DetailPanel from "./components/DetailPanel";
import universities, { cityGroups } from "./data/universities";
import "./App.css";

function App() {
  const [selectedUni, setSelectedUni] = useState(null);
  const [activeTab, setActiveTab] = useState("全部");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === "全部") return universities;
    if (cityGroups.find(g => g.city === activeTab)) return universities.filter(u => u.city === activeTab);
    return universities.filter(u => u.tier === activeTab);
  }, [activeTab]);

  const stats = useMemo(() => ({
    total: universities.length,
    cities: cityGroups.length,
  }), []);

  return (
    <div className="app">
      {/* ColorBends 风格纯色渐变背景 */}
      <div className="cb-bg" />

      <header className="topbar">
        <div className="topbar-inner">
          <div className="logo"><span className="logo-icon">✦</span><span className="logo-text">星辰择校</span></div>
          <nav className="topbar-nav">
            {["全部",...cityGroups.map(g=>g.city)].slice(0,6).map(t=>(
              <button key={t} className={`tn-link ${activeTab===t?"active":""}`} onClick={()=>setActiveTab(t)}>{t}</button>
            ))}
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">2025 · 江西高考志愿填报</p>
          <h1 className="hero-title">探索<em>六座城市</em>的<em>星辰大海</em></h1>
          <p className="hero-desc">福州·厦门·南京·上海·武汉·长沙——{stats.total}所本科院校全覆盖，一本二本皆有。</p>
        </div>
        <div className="scroll-hint"><span className="scroll-line"/><span className="scroll-text">向下探索</span></div>
      </section>

      <section className="filter-section">
        <div className="filter-bar">
          {["全部",...cityGroups.map(g=>g.city),"985/双一流","211/双一流","省重点","双一流","民办","独立学院"].map(t=>(
            <button key={t} className={`filter-chip ${activeTab===t?"active":""}`} onClick={()=>setActiveTab(t)}>{t}</button>
          ))}
        </div>
        <p className="filter-count"><strong>{filtered.length}</strong> 所院校</p>
      </section>

      {(["全部","省重点","民办","独立学院"].includes(activeTab)) ? cityGroups.map(group=>{
        const unis = activeTab==="全部"?group.unis:group.unis.filter(u=>u.tier===activeTab);
        if(!unis.length) return null;
        return (
          <section key={group.city} className="city-section">
            <div className="city-header">
              <div className="city-dot" style={{background:group.color,boxShadow:`0 0 12px ${group.color}80`}}/>
              <h2 className="city-name">{group.city}</h2><span className="city-count">{unis.length}所</span>
              <div className="city-line"/>
            </div>
            <div className="bento-grid">{unis.map((uni,i)=><GlassCard key={uni.code} university={uni} index={i} onClick={setSelectedUni}/>)}</div>
          </section>
        );
      }) : (
        <section className="bento-grid" style={{paddingTop:0}}>
          {filtered.map((uni,i)=><GlassCard key={uni.code} university={uni} index={i} onClick={setSelectedUni}/>)}
        </section>
      )}

      <footer className="footer">
        <p>数据整理自江西省教育考试院 · 薪酬参考中国薪酬网 · 代码以当年招生计划为准</p>
        <p className="footer-sub">每一次选择，都是一次发现 ✦</p>
      </footer>

      <AnimatePresence>{selectedUni&&<DetailPanel university={selectedUni} onClose={()=>setSelectedUni(null)}/>}</AnimatePresence>
    </div>
  );
}

export default App;
