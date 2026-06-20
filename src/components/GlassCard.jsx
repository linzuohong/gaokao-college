import { useEffect, useRef, useState } from "react";
import "./GlassCard.css";

const GlassCard = ({ uni, index, onClick }) => {
  const {c:code,n:name,t:city,y:type,r:tier,s:sc,sa:salary,d:dorm,ar:arts,fo:food,co:color} = uni;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.unobserve(el);}},{rootMargin:"30px"});
    obs.observe(el); return ()=>obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`gc ${visible?"gcv":""}`}
      style={{"--ac":color, transitionDelay:`${index*25}ms`}}
      onClick={()=>onClick?.(uni)}
    >
      <div className="gc-shine"/>
      <div className="gc-h">
        <div className="gc-cb"><span className="gc-c">{code}</span></div>
        <span className="gc-r" style={{color,borderColor:color}}>{tier}</span>
      </div>
      <h3 className="gc-n">{name}</h3>
      <p className="gc-m">{city} · {type}</p>

      {(sc?.p||sc?.h) && <div className="gc-s">
        {sc?.p && <div className="gc-si"><span className="gc-sl">物理</span><span className="gc-sv">{sc.p.m}<small>分</small></span></div>}
        {sc?.h && <div className="gc-si"><span className="gc-sl">历史</span><span className="gc-sv">{sc.h.m}<small>分</small></span></div>}
      </div>}

      <div className="gc-st">
        {salary?.a && <div className="gc-str"><span className="gc-stv">¥{Math.round(salary.a/1000)}k</span><span className="gc-stl">月薪</span></div>}
        {dorm?.r && <div className="gc-str"><span className="gc-stv dm">{"★".repeat(Math.floor(dorm.r))}</span><span className="gc-stl">寝室</span></div>}
        {food && <div className="gc-str"><span className="gc-stv fo">🍜</span><span className="gc-stl">周边</span></div>}
      </div>

      {arts && <div className="gc-ar"><span className="gc-ari">📖</span><span className="gc-art">{arts.slice(0,40)}</span></div>}
      <div className="gc-gb"/>
    </div>
  );
};

export default GlassCard;
