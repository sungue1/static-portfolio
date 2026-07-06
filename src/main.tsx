import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function LandingPage() {
  const skills = [
    "Amazon EC2",
    "Amazon VPC",
    "Auto Scaling",
    "Elastic Load Balancer",
    "Amazon RDS",
    "Amazon S3",
    "CloudFront",
    "Route 53",
    "IAM",
    "CloudFormation",
    "Docker",
    "Kubernetes",
    "Argo CD",
    "GitHub Actions",
    "Jenkins",
    "Terraform",
    "Prometheus",
    "Grafana",
    "Loki",
    "Linux"
  ];

  const projects = [
    {
      title: "AWS Auto Scaling Web Service",
      desc: "CloudFormation을 활용하여 VPC부터 EC2, ALB, Auto Scaling, RDS까지 자동 구축하고 안정적인 웹 서비스를 운영했습니다."
    },
    {
      title: "CI/CD Pipeline",
      desc: "GitHub Actions, Jenkins, Argo CD를 활용하여 EC2와 Kubernetes 환경에 자동 배포 파이프라인을 구축했습니다."
    },
    {
      title: "Monitoring",
      desc: "Prometheus, Grafana, Loki를 이용하여 시스템과 애플리케이션의 상태 및 로그를 모니터링했습니다."
    },
    {
      title: "MSA Architecture",
      desc: "Docker와 Kubernetes 기반의 마이크로서비스 환경을 구성하고 AWS 인프라와 연동했습니다."
    }
  ];

  const architecture = [
    "User",
    "Route53",
    "CloudFront",
    "ALB",
    "Auto Scaling",
    "EC2",
    "Docker",
    "Kubernetes",
    "Application",
    "RDS",
    "S3"
  ];

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        html{
          scroll-behavior:smooth;
        }

        body{
          font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
          background:#050816;
          color:white;
          overflow-x:hidden;
        }

        a{
          color:inherit;
          text-decoration:none;
        }

        ::-webkit-scrollbar{
          width:8px;
        }

        ::-webkit-scrollbar-thumb{
          background:#2d6cdf;
          border-radius:20px;
        }

        .bg{
          position:fixed;
          inset:0;
          overflow:hidden;
          z-index:-2;
          background:
          radial-gradient(circle at top,#11376f 0,#050816 55%),
          #050816;
        }

        .circle{
          position:absolute;
          border-radius:50%;
          filter:blur(70px);
          animation:float 14s infinite ease-in-out;
        }

        .c1{
          width:350px;
          height:350px;
          background:#1f7aff55;
          left:-120px;
          top:100px;
        }

        .c2{
          width:450px;
          height:450px;
          background:#00d4ff22;
          right:-150px;
          top:300px;
          animation-delay:3s;
        }

        .c3{
          width:300px;
          height:300px;
          background:#3b82f622;
          bottom:-100px;
          left:40%;
          animation-delay:6s;
        }

        @keyframes float{
          0%{transform:translateY(0px);}
          50%{transform:translateY(-35px);}
          100%{transform:translateY(0px);}
        }

        nav{
          position:fixed;
          width:100%;
          top:0;
          backdrop-filter:blur(16px);
          background:rgba(5,8,22,.65);
          border-bottom:1px solid rgba(255,255,255,.08);
          z-index:999;
        }

        .nav-container{
          max-width:1300px;
          margin:auto;
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:18px 30px;
        }

        .logo{
          font-size:22px;
          font-weight:700;
          letter-spacing:1px;
          color:#5ca9ff;
        }

        .menu{
          display:flex;
          gap:28px;
        }

        .menu a{
          opacity:.8;
          transition:.3s;
        }

        .menu a:hover{
          color:#5ca9ff;
          opacity:1;
        }

        section{
          max-width:1300px;
          margin:auto;
          padding:100px 30px;
        }

        .hero{
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:60px;
        }

        .left{
          flex:1;
        }

        .badge{
          display:inline-block;
          background:#0f2348;
          color:#6bb4ff;
          border:1px solid #2f73ff;
          padding:10px 18px;
          border-radius:30px;
          margin-bottom:25px;
        }

        h1{
          font-size:68px;
          line-height:1.1;
          margin-bottom:25px;
        }

        .gradient{
          background:linear-gradient(90deg,#59b3ff,#ffffff,#63d8ff);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        .hero p{
          color:#b9c7e6;
          font-size:20px;
          line-height:1.9;
          max-width:700px;
        }

        .buttons{
          margin-top:45px;
          display:flex;
          gap:18px;
        }

        .btn{
          padding:16px 32px;
          border-radius:50px;
          cursor:pointer;
          font-weight:600;
          transition:.3s;
          border:none;
        }

        .primary{
          background:#2f73ff;
          color:white;
        }

        .primary:hover{
          transform:translateY(-4px);
          box-shadow:0 15px 40px rgba(47,115,255,.45);
        }

        .secondary{
          background:transparent;
          color:white;
          border:1px solid rgba(255,255,255,.25);
        }

        .secondary:hover{
          background:white;
          color:#111;
        }

        .right{
          flex:1;
          display:flex;
          justify-content:center;
        }

        .cloud{
          width:520px;
          background:rgba(255,255,255,.05);
          border:1px solid rgba(255,255,255,.08);
          border-radius:28px;
          padding:35px;
          backdrop-filter:blur(16px);
          box-shadow:0 0 60px rgba(0,120,255,.2);
        }

        .aws{
          text-align:center;
          font-size:34px;
          color:#ff9900;
          margin-bottom:25px;
          font-weight:bold;
        }

        .flow{
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:10px;
        }

        .node{
          background:#0b1b35;
          width:220px;
          text-align:center;
          padding:13px;
          border-radius:12px;
          border:1px solid rgba(255,255,255,.08);
        }

        .arrow{
          color:#5ca9ff;
          font-size:22px;
        }

        h2{
          font-size:42px;
          margin-bottom:45px;
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
          gap:25px;
        }

        .card{
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08);
          padding:30px;
          border-radius:20px;
          transition:.35s;
        }

        .card:hover{
          transform:translateY(-10px);
          border-color:#2f73ff;
          box-shadow:0 20px 45px rgba(47,115,255,.25);
        }

        .card h3{
          margin-bottom:15px;
          color:#6eb5ff;
        }

        .skills{
          display:flex;
          flex-wrap:wrap;
          gap:15px;
        }

        .skill{
          padding:12px 20px;
          border-radius:30px;
          background:#0f2246;
          color:#69b4ff;
          border:1px solid #1e4da6;
          transition:.3s;
        }

        .skill:hover{
          background:#2f73ff;
          color:white;
          transform:translateY(-4px);
        }

        footer{
          text-align:center;
          padding:60px 20px;
          color:#9eb2d6;
          border-top:1px solid rgba(255,255,255,.08);
        }

        @media(max-width:1000px){

          .hero{
            flex-direction:column;
            text-align:center;
          }

          .buttons{
            justify-content:center;
          }

          h1{
            font-size:50px;
          }

          .cloud{
            width:100%;
          }

          .menu{
            display:none;
          }
        }

      `}</style>

      <div className="bg">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>
      </div>

      <nav>
        <div className="nav-container">
          <div className="logo">Cloud Engineer</div>

          <div className="menu">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
          </div>
        </div>
      </nav>

      <section className="hero">

        <div className="left">
          <div className="badge">
            AWS • Cloud • DevOps • Kubernetes
          </div>

          <h1>
            안녕하세요.<br />
            <span className="gradient">
              AWS 기반 아키텍처
            </span>
            <br />
            설계하는 클라우드 엔지니어입니다.
          </h1>

          <p>
            AWS를 가장 좋아하는 클라우드 엔지니어를 목표로 하고 있습니다.
            단순히 서비스를 배포하는 것이 아니라 안정성, 확장성,
            자동화, 운영 효율성을 고려한 인프라를 구축하는 것을
            즐깁니다.
          </p>

          <div className="buttons">
            <button className="btn primary">
              Portfolio
            </button>

            <button className="btn secondary">
              GitHub
            </button>
          </div>
        </div>

        <div className="right">

          <div className="cloud">

            <div className="aws">
              AWS Architecture
            </div>

            <div className="flow">
              {architecture.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="node">{item}</div>
                  {index !== architecture.length - 1 &&
                    <div className="arrow">↓</div>}
                </React.Fragment>
              ))}
            </div>

          </div>

        </div>

      </section>

      <section id="about">

        <h2>About Me</h2>

        <div className="grid">

          <div className="card">
            <h3>Cloud</h3>
            <p>
              AWS 서비스를 중심으로 VPC, EC2, ALB,
              Auto Scaling, IAM, RDS 등을 직접 구축하며
              클라우드 인프라를 설계합니다.
            </p>
          </div>

          <div className="card">
            <h3>DevOps</h3>
            <p>
              Jenkins, GitHub Actions, Docker,
              Kubernetes, Argo CD를 활용하여
              자동화된 CI/CD 환경을 구축했습니다.
            </p>
          </div>

          <div className="card">
            <h3>IaC</h3>
            <p>
              CloudFormation과 Terraform을 활용하여
              반복 가능한 인프라를 코드로 관리합니다.
            </p>
          </div>

          <div className="card">
            <h3>Monitoring</h3>
            <p>
              Prometheus, Grafana, Loki를 이용해
              시스템과 애플리케이션을 지속적으로
              모니터링합니다.
            </p>
          </div>

        </div>

      </section>

      <section id="projects">

        <h2>Projects</h2>

        <div className="grid">

          {projects.map((project, index) => (
            <div className="card" key={index}>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </div>
          ))}

        </div>

      </section>

      <section id="skills">

        <h2>Tech Stack</h2>

        <div className="skills">

          {skills.map((skill, index) => (
            <div className="skill" key={index}>
              {skill}
            </div>
          ))}

        </div>

      </section>

      <footer>
        Designed for AWS Cloud Engineer Portfolio
      </footer>
    </>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);