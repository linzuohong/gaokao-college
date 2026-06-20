import { motion } from "framer-motion";
import "./DetailPanel.css";

const DetailPanel = ({ university, onClose }) => {
  if (!university) return null;
  const {c:code,n:name,t:city,y:type,r:tier,s:sc,sa:salary,d:dorm,hi:history,ar:arts,fo:food,co:color} = university;

  return (
    <motion.div className="dp-o" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
      <motion.div className="dp-p" initial={{opacity:0,scale:.95,y:30}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.95,y:30}} transition={{duration:.35,ease:[.25,.46,.45,.94]}} onClick={e=>e.stopPropagation()}>
        <button className="dp-x" onClick={onClose}>✕</button>
        <div className="dp-b">
          <div className="dp-cb"><span className="dp-cn">{code}</span></div>
          <div><h2 className="dp-n">{name}</h2><p className="dp-sb">{city} · {type} · <span className="dp-tb">{tier}</span></p></div>
        </div>
        <div className="dp-d"/>

        {(sc?.p||sc?.h) && <section className="dp-sec"><h3 className="dp-st">江西省录取数据</h3>
          <div className="dp-sc">
            {sc?.h && <div className="dp-sb2"><span className="dp-ss">历史类(文科)</span>
              <div className="dp-pt"><motion.div className="dp-pf h" initial={{width:0}} animate={{width:`${(sc.h.m/620)*100}%`}} transition={{duration:.7}}/></div>
              <div className="dp-sd"><span className="dp-sbv">{sc.h.m}<small>分</small></span><span className="dp-sr">位次 {sc.h.rank?.toLocaleString()}</span></div>
            </div>}
            {sc?.p && <div className="dp-sb2"><span className="dp-ss">物理类</span>
              <div className="dp-pt"><motion.div className="dp-pf" initial={{width:0}} animate={{width:`${(sc.p.m/650)*100}%`}} transition={{duration:.7,delay:.1}}/></div>
              <div className="dp-sd"><span className="dp-sbv">{sc.p.m}<small>分</small></span><span className="dp-sr">位次 {sc.p.rank?.toLocaleString()}</span></div>
            </div>}
          </div>
        </section>}

        {history && <section className="dp-sec"><h3 className="dp-st">🏛️ 大学简介</h3><p className="dp-tx">{history}</p></section>}
        {arts && <section className="dp-sec"><h3 className="dp-st">📖 文科优势</h3><p className="dp-tx">{arts}</p></section>}
        {food && <section className="dp-sec"><h3 className="dp-st">🍜 周边美食</h3><p className="dp-tx">{food}</p></section>}

        <div className="dp-g2">
          {salary?.a && <section className="dp-sec"><h3 className="dp-st">💰 毕业生薪酬</h3>
            <div className="dp-sl"><div className="dp-slr">
              <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(99,102,241,.1)" strokeWidth="7"/>
                <motion.circle cx="50" cy="50" r="40" fill="none" stroke="url(#g)" strokeWidth="7" strokeLinecap="round"
                  strokeDasharray={`${((salary.a||7000)/15000)*251} 251`} transform="rotate(-90 50 50)"
                  initial={{strokeDasharray:"0 251"}} animate={{strokeDasharray:`${((salary.a||7000)/15000)*251} 251`}} transition={{duration:1,delay:.3}}/>
                <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#a78bfa"/></linearGradient></defs>
              </svg>
              <div className="dp-slc"><span className="dp-sln">¥{salary.a?.toLocaleString()||"—"}</span><span className="dp-slu">/月</span></div>
            </div><span className="dp-slnote">全国排名 {salary.k||"—"}</span></div>
          </section>}
          {dorm?.r && <section className="dp-sec"><h3 className="dp-st">🏠 寝室住宿</h3>
            <div className="dp-ds">{[1,2,3,4,5].map(i=><motion.span key={i} className={`dp-dst ${i<=Math.floor(dorm.r)?"on":""}`}
              initial={{scale:0,rotate:-30}} animate={{scale:1,rotate:0}} transition={{delay:.35+i*.08}}>★</motion.span>)}
              <span className="dp-dn">{dorm.r}/5</span></div>
            <p className="dp-dd">{dorm.x||"暂无数据"}</p>
          </section>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailPanel;
