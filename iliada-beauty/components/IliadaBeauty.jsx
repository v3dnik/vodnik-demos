"use client";

/**
 * Iliada Beauty — Premium Beauty Salon, Strengelbach (CH)
 * Light luxury · video-led scrollytelling.
 *
 * Stack:  Next.js (App Router) · React · Tailwind · Framer Motion
 * Fonts:  Bodoni Moda (display) + Jost (body)
 * Assets: /public/logo.png · /public/salon.jpg · /public/salon.mp4
 *
 * Orthography: Swiss German — always "ss", never "ß".
 *
 * To add per-category videos: drop nails.mp4 / brows.mp4 / peeling.mp4 in
 * /public and set `video` on the matching SERVICES entry below.
 */

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ----------------------------- styles ----------------------------- */
function Styles() {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Jost:wght@300;400;500&display=swap");
      :root {
        --bg: #fbf9f6; --paper: #fff; --ink: #2b2521; --inkSoft: #6f655c;
        --gold: #b8975e; --goldDeep: #9c7f4c; --blush: #d9a6a0; --wood: #2b221b;
      }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; background: var(--bg); color: var(--ink);
        font-family: "Jost", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
      .serif { font-family: "Bodoni Moda", Georgia, serif; }
      ::selection { background: var(--blush); color: #fff; }
      a { color: inherit; text-decoration: none; }
      .ib-wrap { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
      .eb { font-size: .66rem; text-transform: uppercase; letter-spacing: .4em; color: var(--goldDeep); }

      /* nav */
      .ib-header { position: fixed; inset: 0 0 auto 0; z-index: 50; transition: background .5s, box-shadow .5s; }
      .ib-header.scrolled { background: rgba(251,249,246,.86); backdrop-filter: blur(12px); box-shadow: 0 1px 0 rgba(184,151,94,.18); }
      .ib-nav { display: flex; align-items: center; justify-content: space-between; max-width: 1280px; margin: 0 auto; padding: 16px 32px; }
      .ib-nav .logo { height: 50px; width: auto; display: block; transition: filter .5s; }
      .ib-links { display: flex; align-items: center; gap: 40px; }
      .ib-links a { font-size: .72rem; text-transform: uppercase; letter-spacing: .2em; color: var(--ink); transition: color .4s; }
      .ib-header:not(.scrolled) .ib-links a { color: #fff; text-shadow: 0 1px 8px rgba(0,0,0,.35); }
      .ib-header:not(.scrolled) .logo { filter: brightness(0) invert(1) drop-shadow(0 1px 6px rgba(0,0,0,.4)); }
      .ib-links a:hover { color: var(--gold); }
      .ib-links .cta { color: var(--gold) !important; }
      @media (max-width: 860px) { .ib-links a:not(.cta) { display: none; } }

      /* hero */
      .ib-hero { position: relative; height: 100vh; min-height: 620px; overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center; }
      .ib-hero .media { position: absolute; inset: 0; overflow: hidden; }
      .ib-hero .media video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .ib-hero .media::after { content: ""; position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(43,37,33,.34) 0%, rgba(43,37,33,.12) 38%, rgba(43,37,33,.5) 100%); }
      .ib-hero .inner { position: relative; z-index: 4; color: #fff; padding: 0 24px; max-width: 880px; }
      .ib-hero .heroLogo { height: 160px; width: auto; margin: 0 auto 6px; display: block;
        filter: brightness(0) invert(1) drop-shadow(0 4px 24px rgba(0,0,0,.4)); }
      @media (max-width: 600px) { .ib-hero .heroLogo { height: 112px; } }
      .ib-hero .sub { margin: 18px auto 0; max-width: 30rem; color: rgba(255,255,255,.92);
        font-weight: 300; font-size: 1.05rem; line-height: 1.7; text-shadow: 0 1px 10px rgba(0,0,0,.4); }
      .ib-btn { display: inline-flex; align-items: center; gap: 13px; border: 1px solid #fff; color: #fff;
        padding: 16px 38px; font-size: .72rem; text-transform: uppercase; letter-spacing: .22em; transition: all .5s; background: transparent; }
      .ib-btn:hover { background: #fff; color: var(--ink); }
      .ib-btn .arr { transition: transform .5s; } .ib-btn:hover .arr { transform: translateX(5px); }
      .ib-cue { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 4;
        display: flex; flex-direction: column; align-items: center; gap: 9px; color: #fff; }
      .ib-cue small { font-size: .58rem; letter-spacing: .3em; text-transform: uppercase; opacity: .8; }
      .ib-cue i { width: 1px; height: 40px; background: linear-gradient(#fff, transparent); animation: ibbob 2s ease-in-out infinite; }
      @keyframes ibbob { 0%,100% { transform: translateY(0); opacity: .4; } 50% { transform: translateY(8px); opacity: 1; } }

      /* intro */
      .ib-intro { text-align: center; padding: 104px 0 20px; }
      .ib-intro .mark { height: 74px; width: auto; margin: 0 auto 26px; display: block; opacity: .92; }
      .ib-intro p { font-family: "Bodoni Moda", serif; font-style: italic; font-size: clamp(1.5rem,3.6vw,2.5rem);
        line-height: 1.42; max-width: 46rem; margin: 0 auto; color: var(--ink); }
      .ib-intro p span { color: var(--goldDeep); }

      /* category */
      .ib-cat { padding: 84px 0; }
      .ib-cat .head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: 34px; }
      .ib-cat .head h2 { font-family: "Bodoni Moda", serif; font-weight: 500; font-size: clamp(2.3rem,5.4vw,3.9rem); line-height: 1.02; margin: 12px 0 0; }
      .ib-cat .head h2 em { font-style: italic; color: var(--goldDeep); }
      .ib-cat .head .meta { font-size: .7rem; letter-spacing: .16em; text-transform: uppercase; color: var(--inkSoft); text-align: right; max-width: 18rem; line-height: 1.7; }
      .ib-stage { position: relative; aspect-ratio: 16/9; overflow: hidden; background: #eee; }
      .ib-stage video, .ib-stage .m { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .ib-stage .m { inset: -6%; width: 112%; height: 112%; background-size: 200% 200%; }
      .ib-stage::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(43,37,33,.05), rgba(43,37,33,.4)); }
      .ib-stage .edge { position: absolute; inset: 15px; border: 1px solid rgba(255,255,255,.5); z-index: 2; }
      .ib-stage .lbl { position: absolute; left: 22px; bottom: 20px; z-index: 3; color: #fff; font-size: .62rem;
        letter-spacing: .26em; text-transform: uppercase; display: flex; align-items: center; gap: 9px; }
      .ib-stage .lbl::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #ff5a4d; animation: iblive 1.8s ease-out infinite; }
      @keyframes iblive { 0% { box-shadow: 0 0 0 0 rgba(255,90,77,.5); } 70% { box-shadow: 0 0 0 8px rgba(255,90,77,0); } 100% { box-shadow: 0 0 0 0 rgba(255,90,77,0); } }
      .m-nails { background: linear-gradient(135deg,#e9d4c4,#d9a6a0 40%,#f3e3d6 70%,#c9a36f); animation: ibpan 17s ease-in-out infinite; }
      .m-eyes { background: linear-gradient(135deg,#efe2d2,#cbb39e 40%,#e7d3c4 70%,#b8975e); animation: ibpan 19s ease-in-out infinite; }
      .m-skin { background: linear-gradient(135deg,#f1e4d6,#dcc3b0 40%,#f3e6d8 70%,#caa98e); animation: ibpan 21s ease-in-out infinite; }
      @keyframes ibpan { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      .ib-cat .body { display: grid; grid-template-columns: .85fr 1.15fr; gap: 56px; margin-top: 42px; align-items: start; }
      @media (max-width: 900px) { .ib-cat .body { grid-template-columns: 1fr; gap: 34px; } }
      .ib-cat .body p { color: var(--inkSoft); font-weight: 300; line-height: 1.85; font-size: .97rem; max-width: 26rem; }
      .ib-tags { display: flex; flex-wrap: wrap; gap: 8px 20px; list-style: none; margin: 24px 0 0; padding: 0; }
      .ib-tags li { font-size: .65rem; text-transform: uppercase; letter-spacing: .2em; }
      .ib-tags li b { color: var(--goldDeep); font-weight: 400; margin-right: 6px; }
      .ib-galh { font-size: .64rem; letter-spacing: .3em; text-transform: uppercase; color: var(--goldDeep); margin-bottom: 14px; }
      .ib-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 11px; }
      @media (max-width: 900px) { .ib-grid { grid-template-columns: repeat(2,1fr); } }
      .ib-shot { aspect-ratio: 3/4; overflow: hidden; position: relative; background: #eee; }
      .ib-shot .g { position: absolute; inset: 0; transition: transform 1s cubic-bezier(.2,1,.3,1); }
      .ib-shot:hover .g { transform: scale(1.08); }
      .ib-shot .tag { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 10px; font-size: .5rem;
        letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.92); background: linear-gradient(transparent 55%, rgba(43,37,33,.42)); }
      .ib-divider { height: 1px; background: rgba(184,151,94,.2); margin: 0 32px; }

      /* about */
      .ib-about { background: var(--paper); padding: 128px 0; }
      .ib-about .grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 80px; align-items: center; }
      @media (max-width: 900px) { .ib-about .grid { grid-template-columns: 1fr; gap: 48px; } }
      .ib-about h2 { font-family: "Bodoni Moda", serif; font-weight: 500; font-size: clamp(2.3rem,5.2vw,3.5rem); line-height: 1.08; margin: 18px 0 0; }
      .ib-about h2 em { display: block; font-style: italic; color: var(--goldDeep); }
      .ib-about p { max-width: 28rem; margin-top: 26px; color: var(--inkSoft); font-weight: 300; line-height: 1.85; }
      .ib-pledges { list-style: none; margin: 36px 0 0; padding: 0; }
      .ib-pledges li { display: flex; gap: 16px; margin-bottom: 15px; font-size: .9rem; font-weight: 300; }
      .ib-pledges li i { margin-top: 10px; width: 26px; height: 1px; background: var(--gold); flex: none; }
      .ib-av { position: relative; aspect-ratio: 4/5; overflow: hidden; }
      .ib-av img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .ib-av .edge { position: absolute; inset: 16px; border: 1px solid rgba(255,255,255,.6); z-index: 2; }

      /* footer */
      .ib-footer { background: var(--wood); color: #f3ece2; }
      .ib-foot { max-width: 1280px; margin: 0 auto; padding: 100px 32px 54px; }
      .ib-foot .top { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; border-bottom: 1px solid rgba(184,151,94,.24); padding-bottom: 52px; }
      @media (max-width: 760px) { .ib-foot .top { flex-direction: column; align-items: flex-start; } }
      .ib-foot .top h2 { font-family: "Bodoni Moda", serif; font-weight: 500; font-size: clamp(2rem,4.6vw,3.2rem); line-height: 1.12; margin: 12px 0 0; }
      .ib-foot .top h2 em { display: block; font-style: italic; color: var(--gold); }
      .ib-foot .mid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 44px; padding: 54px 0; }
      @media (max-width: 760px) { .ib-foot .mid { grid-template-columns: 1fr 1fr; } }
      .ib-foot h3 { font-size: .62rem; text-transform: uppercase; letter-spacing: .3em; color: var(--gold); }
      .ib-foot .footLogo { height: 64px; filter: brightness(0) invert(1); opacity: .9; }
      .ib-foot p, .ib-foot address, .ib-foot li { font-size: .85rem; font-weight: 300; color: rgba(243,236,226,.78); font-style: normal; line-height: 1.9; list-style: none; }
      .ib-foot .lead p { margin-top: 16px; max-width: 17rem; color: rgba(243,236,226,.64); }
      .ib-foot .mt { margin-top: 18px; }
      .ib-foot .hours div { display: flex; justify-content: space-between; gap: 20px; }
      .ib-foot .hours div span { color: rgba(243,236,226,.5); }
      .ib-foot .bot { display: flex; justify-content: space-between; gap: 12px; border-top: 1px solid rgba(184,151,94,.16); padding-top: 32px; font-size: .72rem; color: rgba(243,236,226,.46); }
      @media (max-width: 760px) { .ib-foot .bot { flex-direction: column; } }
      .ib-btn.gold { border-color: var(--gold); color: var(--gold); }
      .ib-btn.gold:hover { background: var(--gold); color: var(--wood); }
    `}</style>
  );
}

/* --------------------------- helpers ------------------------------ */
function Reveal({ children, delay = 0, y = 32, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay, ease: [0.2, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}

function GoldLine({ delay = 0.1, style }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      style={{ display: "block", height: 1, width: "5.5rem", transformOrigin: "left",
        background: "linear-gradient(90deg,#b8975e,rgba(184,151,94,0))", ...style }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.3, delay, ease: [0.2, 1, 0.3, 1] }}
    />
  );
}

/* --------------------------- data --------------------------------- */
const SERVICES = [
  {
    id: "leistungen",
    eb: "Hände & Nägel",
    title: ["Hände & ", "Nägel"],
    meta: "Maniküre · Modellage · Pflege",
    label: "Modellage — live im Salon",
    mClass: "m-nails",
    video: null, // e.g. "/nails.mp4"
    body: "Von der klassischen Maniküre bis zur langlebigen Modellage — gestaltet mit ruhiger Hand und einem Blick für das feine Detail. Im Video sehen Sie, wie geformt und versiegelt wird.",
    tags: ["Maniküre", "Modellage", "Gel & Pflege"],
    shots: [
      ["Nude French", "radial-gradient(circle at 40% 30%,#f7e4dc,#d9a6a0 75%)"],
      ["Soft Gold", "radial-gradient(circle at 50% 30%,#fbeede,#caa98e 75%)"],
      ["Blush", "radial-gradient(circle at 45% 30%,#f3dada,#cf9f9b 75%)"],
      ["Glanz", "radial-gradient(circle at 50% 30%,#f6efe7,#b8975e 80%)"],
    ],
  },
  {
    id: "augen",
    eb: "Augen & Augenbrauen",
    title: ["Augen & ", "Brauen"],
    meta: "Wimpern- & Brow-Lifting · Permanent Make-up",
    label: "Brow-Lifting — live im Salon",
    mClass: "m-eyes",
    video: null,
    body: "Wir betonen Ihren natürlichen Ausdruck: definierte Brauen, geschwungene Wimpern und fein abgestimmtes Permanent Make-up. Subtil, harmonisch und ganz auf Ihre Züge abgestimmt.",
    tags: ["Wimpern-Lifting", "Brow-Lifting", "Permanent Make-up"],
    shots: [
      ["Brow Lift", "radial-gradient(circle at 45% 30%,#efe0d0,#c8a98f 75%)"],
      ["Lash Lift", "radial-gradient(circle at 50% 30%,#f3e6d8,#b8957c 75%)"],
      ["PMU Brauen", "radial-gradient(circle at 45% 30%,#f1ddd2,#a87d68 78%)"],
      ["Detail", "radial-gradient(circle at 50% 30%,#f6efe7,#b8975e 80%)"],
    ],
  },
  {
    id: "haut",
    eb: "Hautpflege & Kosmetik",
    title: ["Hautpflege & ", "Laser"],
    meta: "Aqua Peeling · Laser",
    label: "Aqua Peeling — live im Salon",
    mClass: "m-skin",
    video: null,
    body: "Tiefenreinigung mit Aqua Peeling und präzise Laser-Behandlungen für ein sichtbar feineres, frischeres Hautbild. Sanfte Verfahren auf höchstem Schweizer Standard.",
    tags: ["Aqua Peeling", "Laser", "Kosmetik"],
    shots: [
      ["Aqua Peeling", "radial-gradient(circle at 45% 30%,#f7ece0,#d6b9a4 75%)"],
      ["Glow", "radial-gradient(circle at 50% 30%,#f3e6d8,#c2a98f 75%)"],
      ["Laser", "radial-gradient(circle at 45% 30%,#f1ddd2,#b08a72 78%)"],
      ["Pflege", "radial-gradient(circle at 50% 30%,#f6efe7,#b8975e 80%)"],
    ],
  },
];

/* --------------------------- sections ----------------------------- */
function Nav() {
  return (
    <header className="ib-header" id="ib-header">
      <nav className="ib-nav">
        <a href="#top"><img className="logo" src="/logo.png" alt="Iliada Beauty" /></a>
        <div className="ib-links">
          <a href="#leistungen">Leistungen</a>
          <a href="#ueber-uns">Salon</a>
          <a href="#kontakt">Kontakt</a>
          <a href="#kontakt" className="cta">Termin buchen</a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.2, 1, 0.3, 1] } },
  };
  return (
    <section id="top" className="ib-hero">
      <div className="media">
        <video autoPlay muted loop playsInline poster="/salon.jpg">
          <source src="/salon.mp4" type="video/mp4" />
        </video>
      </div>
      <motion.div className="inner" variants={stagger} initial="hidden" animate="show">
        <motion.img variants={item} className="heroLogo" src="/logo.png" alt="Iliada Beauty" />
        <motion.p variants={item} className="sub">
          Ihr Premium Beauty Salon in Strengelbach.
        </motion.p>
        <motion.div variants={item}>
          <a href="#kontakt" className="ib-btn" style={{ marginTop: 38 }}>
            Termin buchen <span className="arr">→</span>
          </a>
        </motion.div>
      </motion.div>
      <div className="ib-cue"><small>Scrollen</small><i /></div>
    </section>
  );
}

function Intro() {
  return (
    <section className="ib-intro">
      <div className="ib-wrap">
        <Reveal>
          <img className="mark" src="/logo.png" alt="" />
        </Reveal>
        <Reveal>
          <p>
            Wahre Schönheit braucht keine Lautstärke — nur <span>Sorgfalt</span>,
            Zeit und ein feines Gespür für das Detail.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Category({ s, last }) {
  return (
    <>
      <section id={s.id} className="ib-cat" style={last ? { paddingBottom: 120 } : undefined}>
        <div className="ib-wrap">
          <div className="head">
            <div>
              <Reveal className="eb">{s.eb}</Reveal>
              <Reveal>
                <h2>{s.title[0]}<em>{s.title[1]}</em></h2>
              </Reveal>
            </div>
            <Reveal className="meta">{s.meta}</Reveal>
          </div>

          <Reveal>
            <div className="ib-stage">
              {s.video ? (
                <video autoPlay muted loop playsInline poster="/salon.jpg">
                  <source src={s.video} type="video/mp4" />
                </video>
              ) : (
                <div className={`m ${s.mClass}`} />
              )}
              <div className="edge" />
              <div className="lbl">{s.label}</div>
            </div>
          </Reveal>

          <div className="body">
            <Reveal>
              <p>{s.body}</p>
              <GoldLine style={{ margin: "18px 0 0" }} />
              <ul className="ib-tags">
                {s.tags.map((t) => (<li key={t}><b>—</b>{t}</li>))}
              </ul>
            </Reveal>
            <Reveal>
              <div className="ib-galh">Unsere Arbeiten</div>
              <div className="ib-grid">
                {s.shots.map(([tag, bg]) => (
                  <div className="ib-shot" key={tag}>
                    <div className="g" style={{ background: bg }} />
                    <div className="tag">{tag}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {!last && <div className="ib-divider" />}
    </>
  );
}

function About() {
  const pledges = [
    "Schweizer Qualitätsstandard in jeder Behandlung",
    "Hochwertige, sorgfältig ausgewählte Produkte",
    "Diskretion, Ruhe und persönliche Beratung",
  ];
  return (
    <section id="ueber-uns" className="ib-about">
      <div className="ib-wrap grid">
        <div>
          <Reveal className="eb">Schweizer Präzision</Reveal>
          <Reveal><h2>Qualität, die man <em>spüren kann.</em></h2></Reveal>
          <Reveal><GoldLine style={{ marginTop: 24 }} /></Reveal>
          <Reveal>
            <p>
              Bei Iliada Beauty verbinden wir höchste Sorgfalt mit echter Leidenschaft
              für Ästhetik. Jede Behandlung folgt klaren Massstäben — Präzision, Hygiene
              und ein feines Gespür für das Detail. So entsteht ein Ergebnis, das nicht
              nur gepflegt aussieht, sondern sich auch so anfühlt.
            </p>
          </Reveal>
          <Reveal>
            <ul className="ib-pledges">
              {pledges.map((p) => (<li key={p}><i />{p}</li>))}
            </ul>
          </Reveal>
        </div>
        <Reveal>
          <div className="ib-av">
            <img src="/salon.jpg" alt="Iliada Beauty Salon in Strengelbach" />
            <div className="edge" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="kontakt" className="ib-footer">
      <div className="ib-foot">
        <Reveal>
          <div className="top">
            <div>
              <div className="eb" style={{ color: "#b8975e" }}>Reservierung</div>
              <h2>Wir freuen uns auf <em>Ihren Besuch.</em></h2>
            </div>
            <a href="#" className="ib-btn gold">Termin buchen <span className="arr">→</span></a>
          </div>
        </Reveal>
        <div className="mid">
          <div className="lead">
            <img className="footLogo" src="/logo.png" alt="Iliada Beauty" />
            <p>Premium Beauty Salon — Nägel, Wimpern & Brauen, Permanent Make-up, Aqua Peeling und Laser.</p>
          </div>
          <div>
            <h3>Kontakt</h3>
            <address className="mt">
              Musterstrasse 1<br />4802 Strengelbach<br /><br />
              <a href="tel:+41000000000">+41 00 000 00 00</a><br />
              <a href="mailto:hallo@iliada-beauty.ch">hallo@iliada-beauty.ch</a>
            </address>
          </div>
          <div>
            <h3>Öffnungszeiten</h3>
            <div className="hours mt">
              <div>Mo – Fr <span>09:00 – 19:00</span></div>
              <div>Samstag <span>09:00 – 16:00</span></div>
              <div>Sonntag <span>Geschlossen</span></div>
            </div>
          </div>
          <div>
            <h3>Folgen</h3>
            <ul className="mt">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="bot">
          <p>© {new Date().getFullYear()} Iliada Beauty · Strengelbach</p>
          <p>Mit Sorgfalt gestaltet in der Schweiz.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- page -------------------------------- */
export default function IliadaBeauty() {
  useEffect(() => {
    const onScroll = () => {
      const h = document.getElementById("ib-header");
      if (h) h.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div>
      <Styles />
      <Nav />
      <main>
        <Hero />
        <Intro />
        {SERVICES.map((s, i) => (
          <Category key={s.id} s={s} last={i === SERVICES.length - 1} />
        ))}
        <About />
      </main>
      <Footer />
    </div>
  );
}
