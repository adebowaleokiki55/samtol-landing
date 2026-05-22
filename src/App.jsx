import { useState, useEffect, useRef } from "react";

const G = "#C9A84C";
const GL = "#E8C97A";

const IMGS = {
  hero:  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=80",
  about: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80",
  steel: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&q=80",
  stats: "https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=1600&q=80",
  testi: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
  s1: "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600&q=80",
  s2: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  s3: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
  s4: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  s5: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&q=80",
  s6: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80",
  p1: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&q=80",
  p2: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80",
  p3: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=700&q=80",
  p4: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&q=80",
  p5: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=700&q=80",
  p6: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=700&q=80",
};

const injectCSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@500;600;700&display=swap');

.s-root { background:#080808; color:#f0ede8; font-family:'Barlow',sans-serif; font-weight:300; }
.s-root * { box-sizing:border-box; }
.s-fd { font-family:'Cormorant Garamond',serif; }
.s-fc { font-family:'Barlow Condensed',sans-serif; }
.s-gg { background:linear-gradient(135deg,#C9A84C 0%,#E8C97A 50%,#C9A84C 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.s-glass { background:rgba(255,255,255,.035); backdrop-filter:blur(18px); border:1px solid rgba(201,168,76,.15); }
.s-gdark { background:rgba(8,8,8,.8); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,.08); }
.s-gline { height:1px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); }
.s-gbg { background-image:linear-gradient(rgba(201,168,76,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.045) 1px,transparent 1px); background-size:55px 55px; }
.s-tag { font-family:'Barlow Condensed',sans-serif; font-weight:600; letter-spacing:.15em; text-transform:uppercase; font-size:.6rem; color:#C9A84C; background:rgba(201,168,76,.08); border:1px solid rgba(201,168,76,.22); padding:4px 12px; border-radius:2px; display:inline-block; }
.s-ey { display:flex; align-items:center; gap:12px; margin-bottom:18px; }
.s-ey::before { content:''; width:32px; height:1px; background:#C9A84C; }
.s-lift { transition:transform .36s cubic-bezier(.22,1,.36,1),box-shadow .36s,border-color .3s; }
.s-lift:hover { transform:translateY(-8px); box-shadow:0 28px 64px rgba(201,168,76,.13),0 8px 20px rgba(0,0,0,.5); border-color:rgba(201,168,76,.44)!important; }
.s-izoom { overflow:hidden; }
.s-izoom img { transition:transform .6s cubic-bezier(.22,1,.36,1); width:100%; height:100%; object-fit:cover; display:block; }
.s-lift:hover .s-izoom img { transform:scale(1.06); }
.s-btng { background:linear-gradient(135deg,#C9A84C,#E8C97A,#C9A84C); background-size:200%; color:#080808; font-family:'Barlow Condensed',sans-serif; font-weight:700; letter-spacing:.12em; text-transform:uppercase; border:none; cursor:pointer; transition:background-position .4s,transform .2s,box-shadow .3s; text-decoration:none; display:inline-block; }
.s-btng:hover { background-position:right center; transform:translateY(-2px); box-shadow:0 8px 28px rgba(201,168,76,.38); }
.s-btno { border:1px solid rgba(201,168,76,.45); color:#C9A84C; font-family:'Barlow Condensed',sans-serif; font-weight:700; letter-spacing:.12em; text-transform:uppercase; background:transparent; cursor:pointer; transition:all .3s; text-decoration:none; display:inline-block; }
.s-btno:hover { background:rgba(201,168,76,.07); border-color:#C9A84C; }
.s-nav-a { font-family:'Barlow Condensed',sans-serif; font-weight:600; letter-spacing:.1em; text-transform:uppercase; font-size:.72rem; color:#ccc; transition:color .2s; position:relative; text-decoration:none; }
.s-nav-a::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:1px; background:#C9A84C; transition:width .3s; }
.s-nav-a:hover { color:#C9A84C; } .s-nav-a:hover::after { width:100%; }
.s-fin { background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.09); color:#f0ede8; font-family:'Barlow',sans-serif; font-weight:300; font-size:.88rem; padding:13px 15px; border-radius:2px; width:100%; outline:none; transition:border-color .3s; }
.s-fin::placeholder { color:#666; } .s-fin:focus { border-color:rgba(201,168,76,.5); }
.s-iol { position:absolute; inset:0; background:linear-gradient(to top,rgba(8,8,8,.88) 0%,rgba(8,8,8,.2) 55%,transparent 100%); }

@keyframes s-fadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
@keyframes s-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes s-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes s-spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
@keyframes s-dot { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(14px);opacity:0} }

.s-afu { animation:s-fadeUp .8s cubic-bezier(.22,1,.36,1) both; }
.s-afloat { animation:s-float 5s ease-in-out infinite; }
.s-aspin { animation:s-spin 28s linear infinite; }
.s-adot { animation:s-dot 1.6s ease infinite; }
.s-d1{animation-delay:.1s} .s-d2{animation-delay:.25s} .s-d3{animation-delay:.42s} .s-d4{animation-delay:.58s} .s-d5{animation-delay:.75s}

.s-ticker-w { overflow:hidden; background:rgba(201,168,76,.05); border-top:1px solid rgba(201,168,76,.15); border-bottom:1px solid rgba(201,168,76,.15); padding:9px 0; }
.s-ticker-t { display:flex; animation:s-ticker 32s linear infinite; white-space:nowrap; }

.s-mob { transform:translateX(100%); transition:transform .4s cubic-bezier(.22,1,.36,1); position:fixed; top:0; right:0; bottom:0; width:70vw; max-width:290px; background:#0f0f0f; border-left:1px solid rgba(201,168,76,.15); z-index:9100; padding:76px 26px 36px; display:flex; flex-direction:column; gap:4px; }
.s-mob.open { transform:translateX(0); }

.s-wrap { max-width:1280px; margin:0 auto; padding:0 32px; }

@media(max-width:860px) {
  .s-hd { display:none !important; }
  .s-hb { display:flex !important; }
  .s-g2 { grid-template-columns:1fr !important; }
  .s-g3 { grid-template-columns:1fr 1fr !important; }
  .s-g4 { grid-template-columns:1fr 1fr !important; }
}
@media(max-width:560px) {
  .s-g3 { grid-template-columns:1fr !important; }
  .s-g4 { grid-template-columns:1fr !important; }
  .s-hcta { flex-direction:column; }
}
`;

/* ── NAV ── */
const Nav = () => {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const el = document.querySelector(".s-root");
    if (!el) return;
    const fn = () => setSc(el.scrollTop > 50);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  const links = ["Services","About","Projects","Stats","Testimonials","Contact"];
  const scrollTo = (id) => {
    document.getElementById("s-" + id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
    setOp(false);
  };

  return (
    <>
      <nav style={{ position:"sticky", top:0, zIndex:9000, padding:sc?"11px 0":"20px 0", background:sc?"rgba(8,8,8,.95)":"transparent", backdropFilter:sc?"blur(20px)":"none", borderBottom:sc?"1px solid rgba(201,168,76,.1)":"none", transition:"all .4s" }}>
        <div className="s-wrap" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={() => document.getElementById("s-hero")?.scrollIntoView({behavior:"smooth"})}>
            <div style={{ width:34, height:34, background:`linear-gradient(135deg,${G},${GL})`, clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }}/>
            <div>
              <div className="s-fd" style={{ fontWeight:700, fontSize:"1rem", letterSpacing:".08em", color:"#f0ede8" }}>SAMTOL</div>
              <div className="s-fc" style={{ fontSize:".46rem", letterSpacing:".25em", color:G, textTransform:"uppercase" }}>General Supplies</div>
            </div>
          </div>
          <div className="s-hd" style={{ display:"flex", gap:26 }}>
            {links.map(l => <span key={l} className="s-nav-a" style={{ cursor:"pointer" }} onClick={() => scrollTo(l)}>{l}</span>)}
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <span className="s-btng s-hd" style={{ padding:"10px 22px", borderRadius:2, fontSize:".67rem", cursor:"pointer" }} onClick={() => scrollTo("Contact")}>Get a Quote</span>
            <button className="s-hb" onClick={() => setOp(!op)} style={{ background:"none", border:"1px solid rgba(201,168,76,.25)", borderRadius:2, padding:"7px 9px", cursor:"pointer", display:"none" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                {[0,1,2].map(i => <span key={i} style={{ display:"block", width:20, height:1, background:G }}/>)}
              </div>
            </button>
          </div>
        </div>
      </nav>
      <div className={`s-mob ${op?"open":""}`}>
        <button onClick={() => setOp(false)} style={{ position:"absolute", top:18, right:18, background:"none", border:"none", color:G, cursor:"pointer", fontSize:"1.3rem" }}>✕</button>
        {links.map(l => (
          <span key={l} onClick={() => scrollTo(l)} style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"1.25rem", letterSpacing:".1em", textTransform:"uppercase", color:"#f0ede8", padding:"11px 0", borderBottom:"1px solid rgba(255,255,255,.05)", cursor:"pointer" }}>{l}</span>
        ))}
        <span className="s-btng" style={{ marginTop:26, padding:"13px 22px", borderRadius:2, fontSize:".7rem", textAlign:"center", cursor:"pointer" }} onClick={() => scrollTo("Contact")}>Get a Quote</span>
      </div>
    </>
  );
};

/* ── TICKER ── */
const Ticker = () => {
  const items = ["Construction Materials","Industrial Equipment","Logistics Solutions","Procurement Services","Steel & Structural","Safety Equipment","Heavy Machinery","Bulk Supplies","Project Management"];
  const d = [...items, ...items];
  return (
    <div className="s-ticker-w">
      <div className="s-ticker-t">
        {d.map((it, i) => (
          <span key={i} className="s-fc" style={{ fontWeight:600, letterSpacing:".15em", textTransform:"uppercase", fontSize:".65rem", color:G, padding:"0 34px", display:"flex", alignItems:"center", gap:34 }}>
            {it}<span style={{ width:4, height:4, borderRadius:"50%", background:G, display:"inline-block", opacity:.5 }}/>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── HERO ── */
const Hero = () => (
  <section id="s-hero" style={{ minHeight:"100vh", position:"relative", display:"flex", flexDirection:"column", justifyContent:"center", overflow:"hidden" }}>
    <img src={IMGS.hero} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }}/>
    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(8,8,8,.93) 0%,rgba(8,8,8,.6) 55%,rgba(8,8,8,.25) 100%)" }}/>
    <div className="s-gbg" style={{ position:"absolute", inset:0, opacity:.6 }}/>
    <div style={{ position:"absolute", top:"25%", left:"35%", width:"55vw", height:"55vh", background:"radial-gradient(ellipse,rgba(201,168,76,.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
    <div className="s-aspin" style={{ position:"absolute", top:"8%", right:"4%", width:320, height:320, border:"1px solid rgba(201,168,76,.07)", borderRadius:"50%" }}/>
    <div style={{ position:"absolute", top:"13%", right:"8.5%", width:230, height:230, border:"1px solid rgba(201,168,76,.04)", borderRadius:"50%" }}/>

    <div className="s-wrap" style={{ position:"relative", zIndex:2, paddingTop:130, paddingBottom:110 }}>
      <div style={{ maxWidth:740 }}>
        <div className="s-afu s-d1 s-ey"><span className="s-tag">Est. 2008 · Pan-African Operations</span></div>
        <h1 className="s-afu s-d2 s-fd" style={{ fontWeight:700, fontSize:"clamp(2.6rem,5.5vw,5.5rem)", lineHeight:1.02, marginBottom:4 }}>Building the</h1>
        <h1 className="s-afu s-d3 s-fd s-gg" style={{ fontWeight:700, fontStyle:"italic", fontSize:"clamp(2.6rem,5.5vw,5.5rem)", lineHeight:1.02, marginBottom:4 }}>Infrastructure</h1>
        <h1 className="s-afu s-d3 s-fd" style={{ fontWeight:700, fontSize:"clamp(2.6rem,5.5vw,5.5rem)", lineHeight:1.02, marginBottom:34 }}>of Tomorrow.</h1>
        <p className="s-afu s-d4" style={{ fontSize:"1.02rem", lineHeight:1.82, color:"#ccc", maxWidth:510, marginBottom:44, fontWeight:300 }}>
          Samtol General Supplies delivers world-class construction materials, industrial equipment, logistics, and procurement solutions to enterprises and contractors across the continent.
        </p>
        <div className="s-afu s-d5 s-hcta" style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          <span className="s-btng" style={{ padding:"15px 34px", borderRadius:2, fontSize:".7rem", cursor:"pointer" }}>Request a Proposal</span>
          <span className="s-btno" style={{ padding:"15px 34px", borderRadius:2, fontSize:".7rem", cursor:"pointer" }}>Explore Services →</span>
        </div>
        <div className="s-afu" style={{ marginTop:56, display:"flex", gap:44, flexWrap:"wrap", animationDelay:".9s" }}>
          {[["500+","Projects Delivered"],["18+","Years in Business"],["40+","Industry Partners"]].map(([n,l]) => (
            <div key={l}>
              <div className="s-fd" style={{ fontWeight:700, fontSize:"2.1rem", color:G }}>{n}</div>
              <div className="s-fc" style={{ fontSize:".64rem", color:"#555", letterSpacing:".1em", textTransform:"uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{ position:"absolute", bottom:84, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:7, zIndex:2 }}>
      <span className="s-fc" style={{ fontSize:".54rem", letterSpacing:".22em", color:"#444", textTransform:"uppercase" }}>Scroll</span>
      <div style={{ width:1, height:42, background:"rgba(201,168,76,.18)", position:"relative", overflow:"hidden" }}>
        <div className="s-adot" style={{ width:"100%", background:G, height:"40%" }}/>
      </div>
    </div>
    <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:3 }}><Ticker/></div>
  </section>
);

/* ── SERVICES ── */
const SVCS = [
  { img:IMGS.s1, icon:"◈", title:"Construction Materials", desc:"Premium-grade cement, steel, rebar, aggregates, timber, roofing systems, and specialist building compounds sourced globally.", tags:["Cement & Steel","Roofing","Aggregates"] },
  { img:IMGS.s2, icon:"⬡", title:"Industrial Equipment", desc:"Heavy machinery, generators, compressors, lifting equipment, and precision tools from world-leading OEM brands.", tags:["Heavy Machinery","Generators","Lifting"] },
  { img:IMGS.s3, icon:"◇", title:"Logistics & Freight", desc:"End-to-end logistics including last-mile delivery, bulk freight coordination, and project cargo handling.", tags:["Freight","Last-Mile","Project Cargo"] },
  { img:IMGS.s4, icon:"✦", title:"Procurement Services", desc:"Strategic sourcing, vendor management, tender management, and contract administration for large-scale projects.", tags:["Sourcing","Vendor Mgmt","Contracts"] },
  { img:IMGS.s5, icon:"◉", title:"Safety & PPE", desc:"Certified personal protective equipment, site safety installations, and compliance consulting for industrial environments.", tags:["PPE","Site Safety","Compliance"] },
  { img:IMGS.s6, icon:"◻", title:"Project Consultancy", desc:"Expert advisory on procurement strategy, supply chain optimisation, and materials planning for large-scale projects.", tags:["Advisory","Supply Chain","Planning"] },
];

const Services = () => (
  <section id="s-services" style={{ padding:"100px 0", background:"#0f0f0f", position:"relative" }}>
    <div style={{ position:"absolute", top:0, left:0, right:0 }} className="s-gline"/>
    <div className="s-wrap">
      <div style={{ marginBottom:60 }}>
        <div className="s-ey"><span className="s-tag">What We Offer</span></div>
        <h2 className="s-fd" style={{ fontWeight:700, fontSize:"clamp(2rem,4.5vw,3.6rem)", lineHeight:1.1, marginBottom:14 }}>Core Services & <span className="s-gg">Capabilities</span></h2>
        <p style={{ fontSize:".92rem", fontWeight:300, color:"#666", maxWidth:420 }}>Comprehensive supply chain solutions built for modern construction and heavy industry.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }} className="s-g3">
        {SVCS.map(s => (
          <div key={s.title} className="s-glass s-lift" style={{ borderRadius:4, overflow:"hidden", border:"1px solid rgba(201,168,76,.12)" }}>
            <div className="s-izoom" style={{ height:190, position:"relative" }}>
              <img src={s.img} alt={s.title}/>
              <div className="s-iol"/>
              <div style={{ position:"absolute", bottom:13, left:16, fontSize:"1.4rem", color:G }}>{s.icon}</div>
            </div>
            <div style={{ padding:"22px 24px" }}>
              <h3 className="s-fc" style={{ fontWeight:700, fontSize:"1.05rem", letterSpacing:".05em", textTransform:"uppercase", marginBottom:8 }}>{s.title}</h3>
              <p style={{ fontSize:".84rem", lineHeight:1.74, color:"#aaa", marginBottom:16, fontWeight:300 }}>{s.desc}</p>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{s.tags.map(t => <span key={t} className="s-tag" style={{ fontSize:".55rem" }}>{t}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ position:"absolute", bottom:0, left:0, right:0 }} className="s-gline"/>
  </section>
);

/* ── ABOUT ── */
const About = () => (
  <section id="s-about" style={{ padding:"110px 0", background:"#080808", position:"relative", overflow:"hidden" }}>
    <div className="s-wrap" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }} >
      <div className="s-g2" style={{ position:"relative", minHeight:500 }}>
        <div style={{ position:"absolute", top:0, left:0, right:"12%", bottom:"13%", borderRadius:4, overflow:"hidden", border:"1px solid rgba(201,168,76,.18)" }}>
          <img src={IMGS.about} alt="Samtol" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 40%,rgba(8,8,8,.74))" }}/>
          <div style={{ position:"absolute", bottom:22, left:22 }}>
            <div className="s-fd" style={{ fontSize:"4.5rem", fontWeight:300, color:"rgba(201,168,76,.22)", lineHeight:1 }}>18</div>
            <div className="s-fc" style={{ fontSize:".6rem", letterSpacing:".2em", textTransform:"uppercase", color:G }}>Years of Excellence</div>
          </div>
        </div>
        <div className="s-gdark s-afloat" style={{ position:"absolute", bottom:0, right:0, width:"50%", padding:20, borderRadius:4, border:"1px solid rgba(201,168,76,.2)", overflow:"hidden" }}>
          <img src={IMGS.steel} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.1 }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <div className="s-fc" style={{ fontSize:".56rem", letterSpacing:".15em", textTransform:"uppercase", color:G, marginBottom:12 }}>Delivery Performance</div>
            {[{l:"On-Time Delivery",w:98},{l:"Quality Compliance",w:100},{l:"Client Retention",w:94}].map(({l,w}) => (
              <div key={l} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontSize:".62rem", color:"#bbb" }}>{l}</span>
                  <span className="s-fc" style={{ fontSize:".62rem", color:G, fontWeight:700 }}>{w}%</span>
                </div>
                <div style={{ height:2, background:"rgba(201,168,76,.13)", borderRadius:1 }}>
                  <div style={{ height:"100%", width:`${w}%`, background:`linear-gradient(90deg,${G},${GL})`, borderRadius:1 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:"absolute", top:"18%", left:-8, width:3, height:"42%", background:`linear-gradient(180deg,transparent,${G},transparent)`, borderRadius:2 }}/>
      </div>
      <div>
        <div className="s-ey"><span className="s-tag">Our Story</span></div>
        <h2 className="s-fd" style={{ fontWeight:700, fontSize:"clamp(1.9rem,3.8vw,3.3rem)", lineHeight:1.12, marginBottom:24 }}>Built on Trust,<br/>Driven by <span className="s-gg">Excellence</span></h2>
        <p style={{ fontSize:".93rem", lineHeight:1.85, color:"#ccc", marginBottom:16, fontWeight:300 }}>Founded in 2008, Samtol General Supplies has grown from a regional materials distributor into a comprehensive supply chain partner for large-scale construction and industrial projects.</p>
        <p style={{ fontSize:".93rem", lineHeight:1.85, color:"#666", marginBottom:38, fontWeight:300 }}>Our commitment to quality, reliability, and innovation has made us the preferred partner for government contractors, real estate developers, and industrial operators.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:11 }}>
          {[["ISO 9001 Certified","Quality Management"],["40+ Suppliers","Global Network"],["24/7 Support","Always Available"],["Pan-African","Reach & Coverage"]].map(([t,s]) => (
            <div key={t} style={{ padding:"14px 16px", border:"1px solid rgba(201,168,76,.16)", borderRadius:2, background:"rgba(201,168,76,.02)", transition:"border-color .3s", cursor:"default" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(201,168,76,.42)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(201,168,76,.16)"}>
              <div className="s-fc" style={{ fontWeight:700, fontSize:".8rem", letterSpacing:".04em", marginBottom:2 }}>{t}</div>
              <div style={{ fontSize:".68rem", color:"#555" }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── STATS ── */
const STATS = [{n:"500+",l:"Projects Completed",s:"Across 5 states"},{n:"₦50B+",l:"Materials Procured",s:"Total value 2023"},{n:"98%",l:"On-Time Delivery",s:"Client satisfaction"},{n:"200+",l:"Active Clients",s:"Enterprise & govt"}];

const Stats = () => (
  <section id="s-stats" style={{ padding:"90px 0", position:"relative", overflow:"hidden" }}>
    <img src={IMGS.stats} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
    <div style={{ position:"absolute", inset:0, background:"rgba(8,8,8,.85)" }}/>
    <div className="s-gbg" style={{ position:"absolute", inset:0, opacity:.45 }}/>
    <div style={{ position:"absolute", top:0, left:0, right:0 }} className="s-gline"/>
    <div className="s-fd" style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:"16vw", fontWeight:700, color:"rgba(201,168,76,.025)", pointerEvents:"none", whiteSpace:"nowrap", userSelect:"none" }}>SAMTOL</div>
    <div className="s-wrap" style={{ position:"relative", zIndex:1 }}>
      <div style={{ textAlign:"center", marginBottom:52 }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}><span className="s-tag">By the Numbers</span></div>
        <h2 className="s-fd" style={{ fontWeight:700, fontSize:"clamp(1.9rem,3.8vw,2.9rem)" }}>The Samtol <span className="s-gg">Advantage</span></h2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2 }} className="s-g4">
        {STATS.map((s,i) => (
          <div key={s.l} className="s-glass s-lift" style={{ padding:"40px 20px", textAlign:"center", border:"1px solid rgba(201,168,76,.1)", borderRadius:i===0?"4px 0 0 4px":i===3?"0 4px 4px 0":0 }}>
            <div className="s-fd s-gg" style={{ fontWeight:700, fontSize:"clamp(2rem,3.2vw,3rem)", lineHeight:1, marginBottom:10 }}>{s.n}</div>
            <div className="s-fc" style={{ fontWeight:700, fontSize:".78rem", letterSpacing:".1em", textTransform:"uppercase", marginBottom:5 }}>{s.l}</div>
            <div style={{ fontSize:".68rem", color:"#555" }}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ position:"absolute", bottom:0, left:0, right:0 }} className="s-gline"/>
  </section>
);

/* ── PROJECTS ── */
const PROJ = [
  {title:"Lagos–Ibadan Expressway",cat:"Road Infrastructure",val:"₦2.4B",img:IMGS.p1,tag:"Materials Supply"},
  {title:"Eko Atlantic Phase III",cat:"Commercial Real Estate",val:"₦1.8B",img:IMGS.p2,tag:"Procurement"},
  {title:"Dangote Refinery Fit-Out",cat:"Industrial / Oil & Gas",val:"₦5.1B",img:IMGS.p3,tag:"Equipment Supply"},
  {title:"NNPC Depot Expansion",cat:"Energy Infrastructure",val:"₦890M",img:IMGS.p4,tag:"Logistics"},
  {title:"Abuja Metro Extension",cat:"Transport Infrastructure",val:"₦3.2B",img:IMGS.p5,tag:"Materials + Logistics"},
  {title:"Lekki Free Zone Build-out",cat:"Industrial Estate",val:"₦1.2B",img:IMGS.p6,tag:"Full Procurement"},
];

const Projects = () => (
  <section id="s-projects" style={{ padding:"100px 0", background:"#0f0f0f" }}>
    <div className="s-wrap">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:52, flexWrap:"wrap", gap:18 }}>
        <div>
          <div className="s-ey"><span className="s-tag">Portfolio</span></div>
          <h2 className="s-fd" style={{ fontWeight:700, fontSize:"clamp(1.9rem,3.8vw,3.3rem)", lineHeight:1.1 }}>Featured <span className="s-gg">Projects</span></h2>
        </div>
        <span className="s-btno" style={{ padding:"11px 24px", borderRadius:2, fontSize:".65rem", cursor:"pointer", whiteSpace:"nowrap" }}>View All →</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }} className="s-g3">
        {PROJ.map((p,i) => (
          <div key={p.title} className="s-lift s-glass" style={{ borderRadius:4, overflow:"hidden", border:"1px solid rgba(201,168,76,.12)", cursor:"pointer" }}>
            <div className="s-izoom" style={{ height:210, position:"relative" }}>
              <img src={p.img} alt={p.title}/>
              <div className="s-iol"/>
              <div style={{ position:"absolute", top:13, left:13 }}><span className="s-tag" style={{ fontSize:".54rem" }}>{p.tag}</span></div>
              <div className="s-fd" style={{ position:"absolute", top:9, right:13, fontSize:"2.6rem", fontWeight:300, color:"rgba(201,168,76,.22)", lineHeight:1 }}>{String(i+1).padStart(2,"0")}</div>
            </div>
            <div style={{ padding:"20px 24px" }}>
              <div className="s-fc" style={{ fontSize:".6rem", color:G, letterSpacing:".12em", textTransform:"uppercase", marginBottom:5 }}>{p.cat}</div>
              <h3 className="s-fc" style={{ fontWeight:700, fontSize:"1rem", letterSpacing:".04em", textTransform:"uppercase", marginBottom:13 }}>{p.title}</h3>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:11, borderTop:"1px solid rgba(255,255,255,.06)" }}>
                <span style={{ fontSize:".73rem", color:"#555", fontWeight:300 }}>Contract Value</span>
                <span className="s-fd" style={{ fontWeight:600, color:GL, fontSize:"1.05rem" }}>{p.val}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── TESTIMONIALS ── */
const TESTI = [
  {q:"Samtol delivered all our structural steel and cement requirements for a major housing estate on time and within spec. Their procurement team is absolutely exceptional.",name:"Engr. Chidi Okonkwo",role:"Project Director, Okonkwo & Associates",init:"CO"},
  {q:"We've partnered with Samtol on five major government infrastructure contracts. Their reliability and quality standards are unmatched across the entire industry.",name:"Mrs. Fatima Al-Hassan",role:"Director of Procurement, Federal Works",init:"FA"},
  {q:"From equipment to logistics, Samtol handles everything with a professionalism that made our refinery project run smoothly from the very first day.",name:"Mr. Emeka Adeyemi",role:"VP Operations, Allied Energy Corp",init:"EA"},
];

const Testimonials = () => {
  const [a, setA] = useState(0);
  useEffect(() => { const t = setInterval(() => setA(x => (x+1)%TESTI.length), 5500); return () => clearInterval(t); }, []);
  return (
    <section id="s-testimonials" style={{ padding:"100px 0", position:"relative", overflow:"hidden" }}>
      <img src={IMGS.testi} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}/>
      <div style={{ position:"absolute", inset:0, background:"rgba(8,8,8,.88)" }}/>
      <div style={{ position:"absolute", top:0, left:0, right:0 }} className="s-gline"/>
      <div className="s-wrap" style={{ position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}><span className="s-tag">Client Voices</span></div>
          <h2 className="s-fd" style={{ fontWeight:700, fontSize:"clamp(1.9rem,3.8vw,3.3rem)" }}>What Our <span className="s-gg">Partners</span> Say</h2>
        </div>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div className="s-glass" style={{ padding:"46px 44px 40px", borderRadius:4, border:"1px solid rgba(201,168,76,.18)", position:"relative", minHeight:240 }}>
            <div className="s-fd" style={{ position:"absolute", top:16, left:30, fontSize:"5.5rem", lineHeight:1, color:"rgba(201,168,76,.1)", userSelect:"none" }}>"</div>
            <p className="s-fd" style={{ fontSize:"1.25rem", fontWeight:300, fontStyle:"italic", lineHeight:1.78, color:"#f0ede8", marginBottom:30, position:"relative", zIndex:1 }}>{TESTI[a].q}</p>
            <div style={{ display:"flex", alignItems:"center", gap:13 }}>
              <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,rgba(201,168,76,.3),rgba(201,168,76,.08))", border:"1px solid rgba(201,168,76,.38)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, color:G, fontSize:".78rem", flexShrink:0 }}>{TESTI[a].init}</div>
              <div>
                <div className="s-fc" style={{ fontWeight:700, fontSize:".83rem", letterSpacing:".04em" }}>{TESTI[a].name}</div>
                <div style={{ fontSize:".68rem", color:"#555" }}>{TESTI[a].role}</div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:9, marginTop:22 }}>
            {TESTI.map((_,i) => <button key={i} onClick={() => setA(i)} style={{ width:i===a?26:8, height:8, borderRadius:4, background:i===a?G:"rgba(201,168,76,.2)", border:"none", cursor:"pointer", transition:"all .3s" }}/>)}
          </div>
        </div>
        <div style={{ marginTop:68, borderTop:"1px solid rgba(255,255,255,.06)", paddingTop:40 }}>
          <div className="s-fc" style={{ textAlign:"center", fontSize:".58rem", letterSpacing:".22em", textTransform:"uppercase", color:"#444", marginBottom:26 }}>Trusted By Leading Organisations</div>
          <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"9px 38px" }}>
            {["Julius Berger","Dangote Group","LASG Works","Total Energies","FCDA","NNPC Projects"].map(n => <div key={n} className="s-fc" style={{ fontWeight:700, fontSize:".75rem", letterSpacing:".1em", color:"rgba(255,255,255,.16)", textTransform:"uppercase" }}>{n}</div>)}
          </div>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0 }} className="s-gline"/>
    </section>
  );
};

/* ── CONTACT ── */
const Contact = () => {
  const [f, setF] = useState({name:"",company:"",email:"",service:"",message:""});
  const [sent, setSent] = useState(false);
  const up = (k,v) => setF(x => ({...x,[k]:v}));
  const sub = () => { if(f.name && f.email){ setSent(true); setTimeout(()=>setSent(false),4500); setF({name:"",company:"",email:"",service:"",message:""}); }};
  return (
    <section id="s-contact" style={{ padding:"100px 0", background:"#0f0f0f", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"15%", right:"-5%", width:460, height:460, background:"radial-gradient(circle,rgba(201,168,76,.04),transparent)", pointerEvents:"none" }}/>
      <div className="s-wrap">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:64, alignItems:"start" }} className="s-g2">
          <div>
            <div className="s-ey"><span className="s-tag">Get in Touch</span></div>
            <h2 className="s-fd" style={{ fontWeight:700, fontSize:"clamp(1.9rem,3.8vw,3.3rem)", lineHeight:1.1, marginBottom:20 }}>Start Your<br/><span className="s-gg">Project Today</span></h2>
            <p style={{ fontSize:".91rem", lineHeight:1.82, color:"#666", marginBottom:40, fontWeight:300 }}>Whether you need a material supply quote, procurement support, or a full logistics solution — our team is ready to deliver.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {[["📍","Head Office","14 Adeola Odeku Street, Victoria Island, Lagos"],["📞","Phone","+234 (0) 802 000 0000"],["✉","Email","info@samtolsupplies.com"],["🕐","Hours","Mon–Fri: 8am – 6pm WAT"]].map(([icon,label,val]) => (
                <div key={label} style={{ display:"flex", gap:13, alignItems:"flex-start" }}>
                  <div style={{ width:35, height:35, background:"rgba(201,168,76,.07)", border:"1px solid rgba(201,168,76,.15)", borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
                  <div>
                    <div className="s-fc" style={{ fontSize:".58rem", letterSpacing:".15em", textTransform:"uppercase", color:G, marginBottom:2 }}>{label}</div>
                    <div style={{ fontSize:".81rem", color:"#ccc" }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="s-glass" style={{ padding:40, borderRadius:4, border:"1px solid rgba(201,168,76,.16)" }}>
            {sent ? (
              <div style={{ textAlign:"center", padding:"46px 0" }}>
                <div style={{ fontSize:"2.2rem", marginBottom:14, color:G }}>✦</div>
                <div className="s-fd" style={{ fontSize:"1.8rem", marginBottom:10, color:G }}>Message Received</div>
                <div style={{ fontSize:".84rem", color:"#555" }}>Our team will be in touch within 24 hours.</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <input className="s-fin" placeholder="Full Name" value={f.name} onChange={e=>up("name",e.target.value)}/>
                  <input className="s-fin" placeholder="Company" value={f.company} onChange={e=>up("company",e.target.value)}/>
                </div>
                <input className="s-fin" type="email" placeholder="Email Address" value={f.email} onChange={e=>up("email",e.target.value)}/>
                <select className="s-fin" value={f.service} onChange={e=>up("service",e.target.value)} style={{cursor:"pointer"}}>
                  <option value="">Select Service</option>
                  {["Construction Materials","Industrial Equipment","Logistics & Freight","Procurement Services","Safety & PPE","Project Consultancy"].map(o=><option key={o} value={o} style={{background:"#161616"}}>{o}</option>)}
                </select>
                <textarea className="s-fin" rows={5} placeholder="Describe your project requirements..." value={f.message} onChange={e=>up("message",e.target.value)} style={{resize:"vertical"}}/>
                <button className="s-btng" onClick={sub} style={{ padding:"15px", borderRadius:2, fontSize:".7rem", marginTop:4, width:"100%" }}>Submit Request</button>
                <p style={{ fontSize:".64rem", color:"#444", textAlign:"center" }}>We typically respond within 24 business hours.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── FOOTER ── */
const Footer = () => (
  <footer style={{ background:"#080808", borderTop:"1px solid rgba(201,168,76,.1)", padding:"56px 0 28px" }}>
    <div className="s-wrap">
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:36, marginBottom:48 }} className="s-g4">
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:16 }}>
            <div style={{ width:30, height:30, background:`linear-gradient(135deg,${G},${GL})`, clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }}/>
            <div>
              <div className="s-fd" style={{ fontWeight:700, fontSize:".95rem", letterSpacing:".08em" }}>SAMTOL</div>
              <div className="s-fc" style={{ fontSize:".44rem", letterSpacing:".25em", color:G, textTransform:"uppercase" }}>General Supplies</div>
            </div>
          </div>
          <p style={{ fontSize:".78rem", lineHeight:1.8, color:"#555", maxWidth:250, fontWeight:300 }}>Your trusted partner for construction materials, industrial equipment, logistics, and procurement solutions.</p>
          <div style={{ display:"flex", gap:8, marginTop:18 }}>
            {["Li","Tw","Fb"].map(s=>(
              <div key={s} style={{ width:30, height:30, border:"1px solid rgba(201,168,76,.2)", borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:".55rem", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, color:G, cursor:"pointer", transition:"all .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(201,168,76,.08)";e.currentTarget.style.borderColor=G}} onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor="rgba(201,168,76,.2)"}}>{s}</div>
            ))}
          </div>
        </div>
        {[["Services",["Construction Materials","Industrial Equipment","Logistics & Freight","Procurement","Safety & PPE"]],["Company",["About Us","Projects","Careers","News & Updates","Contact"]],["Legal",["Privacy Policy","Terms of Use","Certifications","ISO Docs"]]].map(([title,items])=>(
          <div key={title}>
            <div className="s-fc" style={{ fontWeight:700, fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:G, marginBottom:16 }}>{title}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {items.map(item=><span key={item} style={{ fontSize:".75rem", color:"#555", cursor:"pointer", transition:"color .2s", fontWeight:300 }} onMouseEnter={e=>e.currentTarget.style.color=G} onMouseLeave={e=>e.currentTarget.style.color="#555"}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="s-gline" style={{ marginBottom:24 }}/>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:9 }}>
        <div style={{ fontSize:".68rem", color:"#444" }}>© 2024 Samtol General Supplies Ltd. All rights reserved. RC 1234567</div>
        <div className="s-fc" style={{ fontSize:".58rem", letterSpacing:".14em", textTransform:"uppercase", color:"rgba(201,168,76,.28)" }}>ISO 9001:2015 Certified · Pan-African Operations</div>
      </div>
    </div>
  </footer>
);

/* ── APP ── */
export default function App() {
  return (
    <div className="s-root" style={{ overflowY:"auto", height:"100vh" }}>
      <style>{injectCSS}</style>
      <Nav/>
      <Hero/>
      <Services/>
      <About/>
      <Stats/>
      <Projects/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  );
}