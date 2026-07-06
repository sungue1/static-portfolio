import React, { useEffect, useRef, useState, ReactNode } from "react";

const STYLES = `
:root{
  --bg:#0B1120;
  --panel:#101B30;
  --panel-2:#0E1729;
  --line:#22314C;
  --line-soft:#1A2740;
  --text:#E8EDF5;
  --muted:#8DA0BE;
  --amber:#FF9900;
  --amber-dim:#8f5a12;
  --teal:#4FD1C5;
  --radius:10px;
  --mono:'JetBrains Mono', ui-monospace, monospace;
  --sans:'IBM Plex Sans KR', 'Pretendard', sans-serif;
}
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto;}
  *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;}
}
.aws-landing{
  background:
    linear-gradient(180deg, rgba(11,17,32,0) 0%, rgba(11,17,32,0.6) 60%, var(--bg) 100%),
    repeating-linear-gradient(0deg, transparent 0 39px, var(--line-soft) 39px 40px),
    repeating-linear-gradient(90deg, transparent 0 39px, var(--line-soft) 39px 40px),
    var(--bg);
  color:var(--text);
  font-family:var(--sans);
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  min-height:100vh;
}
.aws-landing a{color:inherit; text-decoration:none;}
.aws-landing ::selection{background:var(--amber); color:#0B1120;}
.aws-landing .wrap{max-width:1140px; margin:0 auto; padding:0 28px;}

header.nav{
  position:sticky; top:0; z-index:50;
  background:rgba(11,17,32,0.82);
  backdrop-filter:blur(10px);
  border-bottom:1px solid var(--line);
}
.nav-inner{
  display:flex; align-items:center; justify-content:space-between;
  padding:16px 28px; max-width:1140px; margin:0 auto;
}
.logo{font-family:var(--mono); font-weight:700; font-size:15px; letter-spacing:0.5px; display:flex; align-items:center; gap:8px;}
.logo .dot{width:8px; height:8px; border-radius:50%; background:var(--amber); box-shadow:0 0 8px var(--amber); display:inline-block;}
.nav-links{display:flex; gap:28px; font-family:var(--mono); font-size:13px; color:var(--muted);}
.nav-links a{transition:color .2s;}
.nav-links a:hover{color:var(--amber);}
.aws-landing a:focus-visible, .aws-landing button:focus-visible{outline:2px solid var(--teal); outline-offset:3px; border-radius:4px;}

.hero{padding:96px 0 80px; position:relative;}
.hero-grid{display:grid; grid-template-columns:1.15fr 0.85fr; gap:48px; align-items:center;}
.eyebrow{font-family:var(--mono); font-size:12px; color:var(--teal); letter-spacing:2px; text-transform:uppercase; margin-bottom:18px; display:flex; align-items:center; gap:10px;}
.eyebrow::before{content:"//"; color:var(--amber-dim);}

.terminal{background:var(--panel); border:1px solid var(--line); border-radius:var(--radius); box-shadow:0 20px 60px rgba(0,0,0,0.35); overflow:hidden;}
.terminal-bar{display:flex; align-items:center; gap:8px; padding:10px 14px; background:var(--panel-2); border-bottom:1px solid var(--line);}
.terminal-bar span.dotc{width:10px; height:10px; border-radius:50%; display:inline-block;}
.terminal-bar .r{background:#FF5F56;}
.terminal-bar .y{background:#FFBD2E;}
.terminal-bar .g{background:#27C93F;}
.terminal-bar .title{margin-left:8px; font-family:var(--mono); font-size:12px; color:var(--muted);}
.terminal-body{padding:26px 24px 30px; font-family:var(--mono); font-size:15px; min-height:210px;}
.terminal-body .prompt{color:var(--teal);}
.terminal-body .cmd{color:var(--text);}
#typed-line{white-space:pre-wrap; word-break:keep-all;}
.cursor{display:inline-block; width:9px; height:18px; background:var(--amber); margin-left:2px; vertical-align:-3px; animation:blink 1s steps(1) infinite;}
@keyframes blink{50%{opacity:0;}}
.terminal-out{margin-top:14px; color:var(--muted); font-size:13.5px; line-height:1.8; opacity:0; transition:opacity .6s ease;}
.terminal-out.show{opacity:1;}
.terminal-out .k{color:var(--amber);}

h1.headline{font-family:var(--mono); font-weight:800; font-size:clamp(30px, 4vw, 46px); line-height:1.25; letter-spacing:-0.5px; margin-bottom:22px;}
h1.headline .hl{color:var(--amber);}
.lede{color:var(--muted); font-size:16px; max-width:520px; margin-bottom:30px;}
.tag-row{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:34px;}
.tag{font-family:var(--mono); font-size:12px; color:var(--teal); border:1px solid var(--line); padding:6px 12px; border-radius:20px; background:var(--panel);}
.cta-row{display:flex; gap:14px; flex-wrap:wrap;}
.btn{font-family:var(--mono); font-size:14px; font-weight:500; padding:13px 22px; border-radius:8px; border:1px solid transparent; display:inline-flex; align-items:center; gap:8px; transition:transform .15s ease, background .2s, border-color .2s;}
.btn:hover{transform:translateY(-2px);}
.btn-primary{background:var(--amber); color:#0B1120; font-weight:700;}
.btn-primary:hover{background:#ffab2e;}
.btn-ghost{border-color:var(--line); color:var(--text);}
.btn-ghost:hover{border-color:var(--teal); color:var(--teal);}

.aws-landing section{padding:90px 0;}
.section-head{margin-bottom:48px;}
.section-head .eyebrow{margin-bottom:12px;}
.section-title{font-family:var(--mono); font-weight:700; font-size:clamp(24px, 3vw, 32px);}
.section-sub{color:var(--muted); margin-top:10px; max-width:600px; font-size:15px;}
.divider{border:none; border-top:1px solid var(--line);}

.about-grid{display:grid; grid-template-columns:0.9fr 1.1fr; gap:56px; align-items:start;}
.about-card{background:var(--panel); border:1px solid var(--line); border-radius:var(--radius); padding:26px;}
.about-card .label{font-family:var(--mono); font-size:12px; color:var(--amber); margin-bottom:16px; letter-spacing:1px;}
.field-row{display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px dashed var(--line); font-size:14px;}
.field-row:last-child{border-bottom:none;}
.field-row .k{color:var(--muted); font-family:var(--mono);}
.field-row .v{color:var(--text); font-weight:500; text-align:right;}
.about-copy p{color:var(--muted); margin-bottom:18px; font-size:15.5px;}
.about-copy strong{color:var(--text); font-weight:600;}
.about-copy .highlight{color:var(--teal);}
.why-aws{margin-top:22px; display:grid; grid-template-columns:repeat(3,1fr); gap:14px;}
.why-item{background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:16px;}
.why-item .num{font-family:var(--mono); color:var(--amber-dim); font-size:12px;}
.why-item h4{font-size:14.5px; margin:8px 0 6px; color:var(--text);}
.why-item p{font-size:13px; color:var(--muted); margin:0;}

.skill-groups{display:grid; grid-template-columns:repeat(3,1fr); gap:20px;}
.skill-panel{background:var(--panel); border:1px solid var(--line); border-radius:var(--radius); padding:22px; transition:border-color .2s, transform .2s;}
.skill-panel:hover{border-color:var(--amber-dim); transform:translateY(-4px);}
.skill-panel .sp-title{font-family:var(--mono); color:var(--amber); font-size:13px; margin-bottom:14px; display:flex; align-items:center; gap:8px;}
.skill-panel .sp-title .bracket{color:var(--muted);}
.chip-list{display:flex; flex-wrap:wrap; gap:8px;}
.chip{font-size:12.5px; font-family:var(--mono); color:var(--text); background:var(--panel-2); border:1px solid var(--line); padding:6px 10px; border-radius:6px;}

.project{display:grid; grid-template-columns:1.05fr 0.95fr; gap:40px; align-items:center; padding:42px 0; border-bottom:1px solid var(--line);}
.project:last-child{border-bottom:none;}
.project.reverse{grid-template-columns:0.95fr 1.05fr;}
.project.reverse .project-media{order:2;}
.project.reverse .project-info{order:1;}
.project-media{border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; background:var(--panel-2); box-shadow:0 18px 50px rgba(0,0,0,0.35);}
.project-media .media-bar{display:flex; align-items:center; justify-content:space-between; padding:9px 14px; background:var(--panel); border-bottom:1px solid var(--line); font-family:var(--mono); font-size:11px; color:var(--muted);}
.project-media img{display:block; width:100%; height:auto; aspect-ratio:16/10; object-fit:cover; background:repeating-linear-gradient(45deg, #0E1729, #0E1729 10px, #101B30 10px, #101B30 20px);}
.project-tag{font-family:var(--mono); font-size:11px; color:var(--amber); letter-spacing:1px; text-transform:uppercase; margin-bottom:10px; display:block;}
.project-info h3{font-size:21px; margin-bottom:12px; color:var(--text);}
.project-info p{color:var(--muted); font-size:14.5px; margin-bottom:16px;}
.project-info ul{list-style:none; margin-bottom:20px; padding-left:0;}
.project-info li{font-size:13.5px; color:var(--muted); padding-left:20px; position:relative; margin-bottom:8px;}
.project-info li::before{content:"›"; position:absolute; left:0; color:var(--teal); font-family:var(--mono); font-weight:700;}
.repo-link{display:inline-flex; align-items:center; gap:8px; font-family:var(--mono); font-size:13px; color:var(--text); border:1px solid var(--line); padding:10px 16px; border-radius:8px; transition:border-color .2s, color .2s;}
.repo-link:hover{border-color:var(--teal); color:var(--teal);}
.repo-link svg{width:16px; height:16px; fill:currentColor;}

.contact-panel{background:var(--panel); border:1px solid var(--line); border-radius:var(--radius); padding:48px; text-align:center; background-image:radial-gradient(circle at 20% 20%, rgba(255,153,0,0.06), transparent 40%), radial-gradient(circle at 80% 80%, rgba(79,209,197,0.06), transparent 40%);}
.contact-panel h2{font-family:var(--mono); font-size:clamp(22px,3vw,30px); margin-bottom:14px;}
.contact-panel p{color:var(--muted); margin-bottom:26px;}
.contact-links{display:flex; gap:14px; justify-content:center; flex-wrap:wrap;}

footer.site-footer{padding:32px 0; border-top:1px solid var(--line); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;}
footer.site-footer p{font-family:var(--mono); font-size:12px; color:var(--muted);}

.reveal{opacity:0; transform:translateY(18px); transition:opacity .6s ease, transform .6s ease;}
.reveal.in{opacity:1; transform:translateY(0);}

@media (max-width:860px){
  .hero-grid, .about-grid, .project, .project.reverse{grid-template-columns:1fr;}
  .project.reverse .project-media, .project.reverse .project-info{order:initial;}
  .skill-groups{grid-template-columns:1fr;}
  .why-aws{grid-template-columns:1fr;}
  .nav-links{display:none;}
  .aws-landing section{padding:64px 0;}
}
`;

function GithubIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function useReveal<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

interface RevealProps {
  children: ReactNode;
  className?: string;
}

function Reveal({ children, className = "" }: RevealProps): JSX.Element {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${visible ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Terminal(): JSX.Element {
  const line = "> 신입 Cloud/MSP 엔지니어 지원자";
  const [typed, setTyped] = useState<string>("");
  const [showOut, setShowOut] = useState<boolean>(false);

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (i <= line.length) {
        setTyped(line.slice(0, i));
        i++;
        timer = setTimeout(step, 45);
      } else {
        setTimeout(() => setShowOut(true), 200);
      }
    };
    step();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="dotc r"></span>
        <span className="dotc y"></span>
        <span className="dotc g"></span>
        <span className="title">sungue1 — zsh</span>
      </div>
      <div className="terminal-body">
        <div>
          <span className="prompt">$</span> <span className="cmd">whoami --role</span>
        </div>
        <div id="typed-line">
          {typed}
          <span className="cursor"></span>
        </div>
        <div className={`terminal-out ${showOut ? "show" : ""}`}>
          <div><span className="k">role</span> : Cloud / MSP Engineer (신입)</div>
          <div><span className="k">stack</span> : EC2 · VPC · IAM · S3 · RDS · CloudWatch</div>
          <div><span className="k">tools</span> : Terraform · GitHub Actions · Docker</div>
          <div><span className="k">status</span> : 지원 중 — 함께 일할 팀을 찾고 있습니다</div>
        </div>
      </div>
    </div>
  );
}

interface Project {
  tag: string;
  badge: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string;
  repo: string;
  repoLabel: string;
  reverse: boolean;
}

const PROJECTS: Project[] = [
  {
    tag: "Team Project",
    badge: "team project",
    title: "하이브리드 금융 플랫폼",
    desc: "온프레미스와 AWS를 연계한 하이브리드 환경을 구성하고, 배포 자동화와 로그 기반 모니터링까지 구축한 팀 프로젝트입니다.",
    bullets: [
      "AWS 환경 구성 (VPC, 하이브리드 네트워크 연동)",
      "CI/CD 파이프라인 구현",
      "IaC 기반 로그 모니터링 시스템 구축",
    ],
    image: "/images/하이브리드_금융_플랫폼_아키텍처.png",
    repo: "https://github.com/sungue1/java_bank",
    repoLabel: "github.com/sungue1/java_bank",
    reverse: false,
  },
  {
    tag: "Solo Project",
    badge: "solo project",
    title: "WordPress 배포",
    desc: "AWS 환경 위에 WordPress를 직접 설치·배포하며 웹 서버, DB, 네트워크 구성 요소를 처음부터 구축한 개인 프로젝트입니다.",
    bullets: [
      "EC2 기반 웹 서버 구성 및 배포",
      "RDS 연동을 통한 DB 분리",
      "보안 그룹 및 네트워크 접근 제어 설정",
    ],
    image: "/images/wordpress_아키텍처.png",
    repo: "https://github.com/sungue1/wordpress",
    repoLabel: "github.com/sungue1/wordpress",
    reverse: true,
  },
  {
    tag: "Solo Project",
    badge: "solo project",
    title: "정적 웹사이트 배포",
    desc: "S3와 CloudFront를 활용해 정적 웹사이트를 배포하고, 캐싱과 HTTPS 적용까지 구성한 개인 프로젝트입니다.",
    bullets: [
      "S3 정적 웹 호스팅 구성",
      "CloudFront 배포 및 캐싱 최적화",
      "Route53 도메인 연결 및 HTTPS 적용",
    ],
    image: "/images/static_아키텍처.png",
    repo: "https://github.com/sungue1/static-portfolio",
    repoLabel: "github.com/sungue1/static-portfolio",
    reverse: false,
  },
];

export default function App(): JSX.Element {
  return (
    <div className="aws-landing">
      <style>{STYLES}</style>

      <header className="nav">
        <div className="nav-inner">
          <div className="logo">
            <span className="dot"></span>sungue1@cloud
          </div>
          <nav className="nav-links">
            <a href="#about">about</a>
            <a href="#skills">skills</a>
            <a href="#projects">projects</a>
            <a href="#contact">contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">CLOUD / MSP ENGINEER CANDIDATE</div>
              <h1 className="headline">
                인프라를 코드로 설계하고,
                <br />
                장애 앞에서도 <span className="hl">흔들리지 않는</span>
                <br />
                아키텍처를 만듭니다.
              </h1>
              <p className="lede">
                AWS 기반 아키텍처 설계와 운영을 좋아하는 취업준비생입니다. IaC, CI/CD, 모니터링까지 직접 구성한 경험으로 Cloud 엔지니어 / MSP 직무를 준비하고 있습니다.
              </p>
              <div className="tag-row">
                <span className="tag">#AWS</span>
                <span className="tag">#IaC</span>
                <span className="tag">#CI/CD</span>
                <span className="tag">#Monitoring</span>
                <span className="tag">#MSP</span>
              </div>
              <div className="cta-row">
                <a className="btn btn-primary" href="#projects">프로젝트 보기</a>
                <a className="btn btn-ghost" href="#contact">연락하기</a>
              </div>
            </div>
            <Terminal />
          </div>
        </section>

        <section id="about">
          <div className="wrap">
            <Reveal className="section-head">
              <div className="eyebrow">ABOUT</div>
              <h2 className="section-title">클라우드 위에서 문제를 해결하는 사람</h2>
              <p className="section-sub">단순히 서비스를 배포하는 것을 넘어, 안정성과 자동화를 갖춘 인프라를 설계하는 데 집중합니다.</p>
            </Reveal>

            <div className="about-grid">
              <Reveal className="about-card">
                <div className="label">PROFILE</div>
                <div className="field-row"><span className="k">position</span><span className="v">Cloud Engineer / MSP</span></div>
                <div className="field-row"><span className="k">focus</span><span className="v">AWS Architecture</span></div>
                <div className="field-row"><span className="k">interest</span><span className="v">IaC · CI/CD · Monitoring</span></div>
                <div className="field-row"><span className="k">status</span><span className="v">구직 중</span></div>
                <div className="field-row"><span className="k">location</span><span className="v">Republic of Korea</span></div>
              </Reveal>

              <Reveal className="about-copy">
                <p>
                  저는 <strong>AWS 기반 아키텍처</strong>를 설계하고 운영하는 일에 가장 큰 흥미를 느끼는 취업준비생입니다. 단일 서버 배포부터 다계층 하이브리드 시스템까지, 직접 구성하고 장애 상황을 재현하며 <span className="highlight">인프라의 동작 원리</span>를 이해하는 방식으로 학습해왔습니다.
                </p>
                <p>
                  특히 <strong>Infrastructure as Code</strong>로 환경을 재현 가능하게 만들고, <strong>CI/CD 파이프라인</strong>으로 배포를 자동화하며, <strong>로그 기반 모니터링</strong>으로 운영 중 발생하는 문제를 빠르게 파악하는 흐름을 좋아합니다. 이러한 경험을 바탕으로 Cloud 엔지니어 또는 MSP 직무에서 실제 서비스 운영에 기여하고 싶습니다.
                </p>
                <div className="why-aws">
                  <div className="why-item">
                    <div className="num">01</div>
                    <h4>설계 중심 사고</h4>
                    <p>가용성과 비용을 함께 고려한 아키텍처 설계</p>
                  </div>
                  <div className="why-item">
                    <div className="num">02</div>
                    <h4>자동화 지향</h4>
                    <p>수동 운영을 코드와 파이프라인으로 대체</p>
                  </div>
                  <div className="why-item">
                    <div className="num">03</div>
                    <h4>관찰 가능성</h4>
                    <p>로그와 지표로 시스템 상태를 항상 파악</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <hr className="divider wrap" />

        <section id="skills">
          <div className="wrap">
            <Reveal className="section-head">
              <div className="eyebrow">SKILL SET</div>
              <h2 className="section-title">다루는 서비스와 도구</h2>
            </Reveal>

            <div className="skill-groups">
              <Reveal className="skill-panel">
                <div className="sp-title"><span className="bracket">[</span>Compute / Network<span className="bracket">]</span></div>
                <div className="chip-list">
                  <span className="chip">EC2</span>
                  <span className="chip">VPC</span>
                  <span className="chip">Route53</span>
                  <span className="chip">ELB</span>
                  <span className="chip">Auto Scaling</span>
                </div>
              </Reveal>
              <Reveal className="skill-panel">
                <div className="sp-title"><span className="bracket">[</span>Storage / DB<span className="bracket">]</span></div>
                <div className="chip-list">
                  <span className="chip">S3</span>
                  <span className="chip">RDS</span>
                  <span className="chip">EBS</span>
                  <span className="chip">CloudFront</span>
                </div>
              </Reveal>
              <Reveal className="skill-panel">
                <div className="sp-title"><span className="bracket">[</span>Ops / IaC<span className="bracket">]</span></div>
                <div className="chip-list">
                  <span className="chip">IAM</span>
                  <span className="chip">CloudWatch</span>
                  <span className="chip">Terraform</span>
                  <span className="chip">GitHub Actions</span>
                  <span className="chip">Docker</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <hr className="divider wrap" />

        <section id="projects">
          <div className="wrap">
            <Reveal className="section-head">
              <div className="eyebrow">PROJECTS</div>
              <h2 className="section-title">직접 설계하고 배포한 아키텍처</h2>
              <p className="section-sub">각 프로젝트의 아키텍처 다이어그램과 GitHub 저장소를 확인할 수 있습니다.</p>
            </Reveal>

            {PROJECTS.map((p) => (
              <Reveal key={p.title} className={`project ${p.reverse ? "reverse" : ""}`}>
                <div className="project-media">
                  <div className="media-bar">
                    <span>architecture.png</span>
                    <span>{p.badge}</span>
                  </div>
                  <img src={p.image} alt={`${p.title} 아키텍처 다이어그램`} />
                </div>
                <div className="project-info">
                  <span className="project-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <ul>
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <a className="repo-link" href={p.repo} target="_blank" rel="noopener noreferrer">
                    <GithubIcon />
                    {p.repoLabel}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact">
          <div className="wrap">
            <Reveal className="contact-panel">
              <h2>함께 인프라를 만들어갈 팀을 찾고 있습니다</h2>
              <p>Cloud 엔지니어 / MSP 직무로 지원 중입니다. 편하게 연락 주세요.</p>
              <div className="contact-links">
                <a className="btn btn-primary" href="mailto:sungue1@example.com">이메일 보내기</a>
                <a className="btn btn-ghost" href="https://github.com/sungue1" target="_blank" rel="noopener noreferrer">GitHub 방문하기</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer wrap">
        <p>© 2026 sungue1. Built with AWS in mind.</p>
        <p>Cloud / MSP Engineer Candidate</p>
      </footer>
    </div>
  );
}
