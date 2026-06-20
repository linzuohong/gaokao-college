import { useState, useMemo, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import GlassCard from "./components/GlassCard";
import DetailPanel from "./components/DetailPanel";
import U, { cityGroups } from "./data/universities";
import "./App.css";

function App() {
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState("全部");

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, smoothTouch: true, touchMultiplier: 1.5 });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const flt = useMemo(() => {
    if (tab === "全部") return U;
    if (cityGroups.find(g => g.c === tab)) return U.filter(u => u.t === tab);
    return U.filter(u => u.r === tab);
  }, [tab]);

  return (
    <div className="app">
      {/* Galaxy 风格星空背景 */}
      <div className="galaxy-bg"><div className="galaxy-layer"/></div>

      <header className="tb"><div className="tbi">
        <div className="logo"><span className="loi">✦</span><span className="lot">星辰择校</span></div>
        <nav className="tbn">{["全部",...cityGroups.map(g=>g.c)].slice(0,8).map(t=>(
          <button key={t} className={`tnl ${tab===t?"a":""}`} onClick={()=>setTab(t)}>{t}</button>
        ))}</nav>
      </div></header>

      <section className="hr">
        <div className="hrc">
          <p className="hre">2025 · 江西高考志愿填报 · 文科向</p>
          <h1 className="hrt">探索<em>十座城市</em>的<em>星辰大海</em></h1>
          <p className="hrd">{U.length}所本科院校 · 十城全覆盖 · 文科特色数据 · 一键查询</p>
        </div>
        <div className="sh"><span className="shl"/><span className="sht">向下探索</span></div>
      </section>

      <section className="fs"><div className="fb">
        {["全部",...cityGroups.map(g=>g.c),"985/双一流","211/双一流","省重点","双一流","中外合作"].map(t=>(
          <button key={t} className={`fc ${tab===t?"a":""}`} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div><p className="fct"><strong>{flt.length}</strong> 所院校</p></section>

      {(["全部","省重点","中外合作","民办"].includes(tab)) ? cityGroups.map(g=>{
        const us = tab==="全部"?g.u:g.u.filter(u=>u.r===tab);
        if(!us.length) return null;
        return <section key={g.c} className="cs">
          <div className="ch"><div className="cd" style={{background:g.co,boxShadow:`0 0 12px ${g.co}80`}}/><h2 className="cn">{g.c}</h2><span className="cc">{us.length}所</span><div className="cl"/></div>
          <div className="bg">{us.map((u,i)=><GlassCard key={u.c} uni={u} index={i} onClick={setSel}/>)}</div>
        </section>;
      }) : <section className="bg" style={{paddingTop:0}}>{flt.map((u,i)=><GlassCard key={u.c} uni={u} index={i} onClick={setSel}/>)}</section>}

      <footer className="ft"><p>数据整理自各省教育考试院 · 薪酬参考中国薪酬网 · 代码以当年招生计划为准</p><p className="fts">每一次选择，都是一次发现 ✦</p></footer>
      <AnimatePresence>{sel && <DetailPanel university={sel} onClose={()=>setSel(null)}/>}</AnimatePresence>
    </div>
  );
}

export default App;
