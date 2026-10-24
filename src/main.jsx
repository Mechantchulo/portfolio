import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { bio, certificates, contactEmail, githubUrl, highlights, linkedinUrl, projects, stack } from './content'
import './styles.css'

const icons = {
  terminal: <><path d="m4 6 5 5-5 5" /><path d="M11 17h9" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
  download: <><path d="M12 3v12m-4-4 4 4 4-4" /><path d="M4 17v3h16v-3" /></>,
  external: <><path d="M8 5h11v11M19 5 5 19" /></>,
  chevron: <><path d="m6 9 6 6 6-6" /></>,
}

function Icon({ name, size = 20, className = '' }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>
}

const initialLines = [
  { type: 'system', text: 'ERICK_OS v1.0.0  //  connection established' },
  { type: 'system', text: 'Type help to see available commands.' },
]

const helpLines = [
  'Available commands:',
  '  help            Show this list',
  '  whoami          About Erick',
  '  ls projects     List featured work',
  '  cat skills.txt  Show the toolkit',
  '  history         View the journey',
  '  nmap me         Simulated skill scan',
  '  sudo su         Test your privileges',
  '  cat flag.txt    Capture the flag',
  '  clear           Clear the terminal',
  '  reboot/startx   Enter Builder Mode',
]

const skillGroups = [
  { label: 'BACKEND', type: 'skill-backend', names: ['Python', 'FastAPI', 'Django', 'PostgreSQL'] },
  { label: 'SYSTEMS', type: 'skill-systems', names: ['Docker', 'Linux (Kali)', 'Bash'] },
  { label: 'VISION', type: 'skill-vision', names: ['YOLO'] },
  { label: 'AGENTS', type: 'skill-agents', names: ['MCP (Model Context Protocol)'] },
]

const scanPorts = [
  ['22', 'Linux (Kali)'], ['80', 'Python'], ['443', 'FastAPI'], ['8000', 'Django'],
  ['5432', 'PostgreSQL'], ['2375', 'Docker'], ['4444', 'Bash'], ['9000', 'YOLO'], ['3000', 'MCP (Model Context Protocol)'],
]

function Terminal({ onBuilderMode }) {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState(initialLines)
  const [activity, setActivity] = useState('idle')
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  const timersRef = useRef([])

  useEffect(() => { outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: 'smooth' }) }, [lines])
  useEffect(() => () => timersRef.current.forEach((timer) => window.clearTimeout(timer)), [])

  function append(...entries) { setLines((current) => [...current, ...entries]) }

  function runCommand(raw) {
    if (activity !== 'idle') return
    const command = raw.trim().replace(/\s+/g, ' ').toLowerCase()
    if (!command) return
    if (command === 'clear') { setLines([]); setInput(''); return }
    setInput('')
    append({ type: 'command', text: raw.trim() })

    if (command === 'nmap me') {
      setActivity('scanning')
      append({ type: 'scan-status', text: 'Starting simulated skill scan... no network requests are made.' }, { type: 'scan-status', text: 'PORT     STATE  SKILL' })
      const frames = [
        ...scanPorts.map(([port, skill]) => ({ type: 'scan-open', text: `${port.padEnd(8)} open   ${skill}` })),
        { type: 'scan-status', text: `Scan complete. ${scanPorts.length} skills discovered.` },
      ]
      frames.forEach((frame, index) => {
        const timer = window.setTimeout(() => {
          append(frame)
          if (index === frames.length - 1) setActivity('idle')
        }, 190 * (index + 1))
        timersRef.current.push(timer)
      })
      return
    }

    if (command === 'reboot' || command === 'startx') {
      setActivity('switching')
      append({ type: 'scan-status', text: 'Stopping terminal services...' }, { type: 'scan-open', text: 'Starting Minimal Builder environment.' })
      timersRef.current.push(window.setTimeout(onBuilderMode, 480))
      return
    }

    let result
    switch (command) {
      case 'help': result = helpLines.map((text) => ({ type: 'response', text })); break
      case 'whoami': result = [{ type: 'response', text: bio }]; break
      case 'ls projects': result = projects.map((project) => ({ type: 'response', text: `${project.number}  ${project.title}  ·  ${project.category}` })); break
      case 'cat skills.txt':
        result = [
          { type: 'scan-status', text: 'skills.txt  //  Erick’s toolkit' },
          ...skillGroups.flatMap((group) => group.names.filter((name) => stack.includes(name)).map((name) => ({ type: group.type, text: `${group.label.padEnd(9)} ${name}` }))),
        ]
        break
      case 'history':
        result = [
          { type: 'scan-status', text: 'milestones.log' },
          { type: 'response', text: '01  EUCOSSA DevOps Lead' },
          { type: 'response', text: '02  EUCOSSA Tech Lead' },
          { type: 'scan-open', text: '03  Connected Africa Summit 2026 CTF — Outstanding Performance' },
        ]
        break
      case 'sudo su': result = [{ type: 'error', text: 'Access Denied. This incident will be reported.' }, { type: 'response', text: 'Hint: root is unavailable, but a flag is hiding nearby.' }]; break
      case 'cat flag.txt': result = [{ type: 'flag', text: 'FLAG{thanks_for_playing_erick_os}' }, { type: 'response', text: 'Thanks for playing. Keep building, keep breaking, keep learning.' }]; break
      default: result = [{ type: 'error', text: `Command not found: ${raw.trim()}` }, { type: 'response', text: 'Type help to see available commands.' }]
    }
    append(...result)
  }

  return <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
    <div className="terminal-topbar">
      <div className="terminal-dots" aria-hidden="true"><span /><span /><span /></div>
      <span>erick@portfolio: ~</span>
      <span className="terminal-topbar-end">bash — 80×24</span>
    </div>
    <div className="terminal-body" ref={outputRef} role="log" aria-label="Terminal output" aria-live="polite">
      {lines.map((line, index) => <div key={`${index}-${line.text}`} className={`terminal-line ${line.type}`}>
        {line.type === 'command' && <span className="prompt">➜ ~ </span>}{line.text}
      </div>)}
      <form className="terminal-input-row" onSubmit={(event) => { event.preventDefault(); runCommand(input) }}>
        <label htmlFor="terminal-input" className="prompt">➜ ~</label>
        <input id="terminal-input" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} disabled={activity !== 'idle'} autoComplete="off" autoCapitalize="off" spellCheck="false" aria-label="Terminal command" placeholder={activity === 'scanning' ? 'scanning...' : 'try help'} />
        <span className="terminal-cursor" aria-hidden="true" />
      </form>
    </div>
    <div className="terminal-footer"><span>● {activity === 'scanning' ? 'SIMULATED SCAN RUNNING' : activity === 'switching' ? 'SWITCHING MODE' : 'SYSTEM ONLINE'}</span><span>PRESS ENTER TO EXECUTE</span></div>
  </div>
}

function ThemeSwitch({ theme, onChange }) {
  const cyber = theme === 'cyber'
  return <button className="theme-switch" type="button" role="switch" aria-checked={cyber} aria-label={`Switch to ${cyber ? 'Minimal Builder' : 'Cybersecurity Terminal'} mode`} onClick={() => onChange(cyber ? 'builder' : 'cyber')}>
    <span className={`theme-switch-icon ${cyber ? 'active' : ''}`}><Icon name="terminal" size={17} /><span className="switch-label">Terminal</span></span>
    <span className={`theme-switch-icon ${!cyber ? 'active' : ''}`}><Icon name="sun" size={18} /><span className="switch-label">Builder</span></span>
  </button>
}

function Header({ theme, setTheme }) {
  return <header className="site-header">
    <div className="shell nav-inner">
      <a className="wordmark" href="#top" aria-label="Erick Mutua, back to top"><span className="wordmark-mark">E<span className="accent">/</span>M</span><span className="wordmark-name">Erick Mutua</span></a>
      <nav className="main-nav" aria-label="Main navigation"><a href="#about">About</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#certificates">Credentials</a></nav>
      <div className="nav-actions"><ThemeSwitch theme={theme} onChange={setTheme} /><a className="nav-contact" href="#contact">Let's talk <Icon name="arrow" size={17} /></a></div>
    </div>
  </header>
}

function BuilderHeroVisual() {
  return <div className="builder-grid">
    <div className="builder-card builder-card-wide"><span className="card-overline">CURRENTLY</span><strong>Building systems that work.<br />Breaking systems to learn.</strong><span className="builder-card-arrow"><Icon name="external" size={19} /></span></div>
    <div className="builder-card builder-card-role"><span className="card-overline">ROLE</span><strong>Tech Lead</strong><span>EUCOSSA · Egerton University</span></div>
    <div className="builder-card builder-card-stack"><span className="card-overline">TOOLKIT</span><div className="builder-stack-list">{stack.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}<span>MCP</span></div></div>
  </div>
}

function Hero({ theme, onBuilderMode }) {
  return <section className="hero shell" id="top">
    <div className="hero-copy">
      <div className="availability"><span className="availability-dot" /> OPEN TO WHAT'S NEXT <span className="availability-line" /></div>
      <AnimatePresence mode="wait">
        <motion.div key={theme} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }}>
          {theme === 'cyber' ? <h1><span className="sr-only">Erick Mutua — </span>Code. Deploy.<br /><span className="hero-accent">Break. Repeat.</span></h1> : <h1>Hi, I'm<br /><span className="hero-accent">Erick Mutua.</span></h1>}
          <p className="hero-alias">KNOWN ONLINE AS MECHANTCHULO</p>
          <p className="hero-headline">Open-Source Software Engineer, DevOps Specialist <span className="amp">&</span> Cybersecurity Enthusiast</p>
          <p className="hero-description">I build scalable backends and tools for coding agents, deploy on Linux, and break things in CTFs. Currently leading tech at EUCOSSA and working on Tickopedia's backend.</p>
        </motion.div>
      </AnimatePresence>
      <div className="hero-actions"><a className="button-primary" href="#projects">Explore my work <Icon name="arrow" size={19} /></a><a className="button-text" href="/cv/erick_cv.pdf" download="Erick-Mutua-CV.pdf">Download CV <Icon name="download" size={18} /></a></div>
      <div className="hero-footnote"><span>BASED AT EGERTON UNIVERSITY</span><span>SCROLL TO EXPLORE ↓</span></div>
    </div>
    <div className="hero-visual"><AnimatePresence mode="wait"><motion.div key={theme} initial={{ opacity: 0, scale: .97, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .98, y: -10 }} transition={{ duration: .35 }} className="visual-inner">{theme === 'cyber' ? <Terminal onBuilderMode={onBuilderMode} /> : <BuilderHeroVisual />}</motion.div></AnimatePresence></div>
  </section>
}

function SectionHeading({ title, subtitle }) {
  return <div className="section-heading"><h2>{title}</h2><p>{subtitle}</p></div>
}

function About() {
  return <section id="about" className="section shell about-section"><SectionHeading title="A little about me." subtitle="Engineer by practice. Curious by default." /><div className="about-layout"><p className="about-main">I make software <em>work in the real world.</em></p><div className="about-aside"><p>{bio}</p><a href="#experience" className="inline-link">The path so far <Icon name="arrow" size={18} /></a></div></div><div className="about-stack"><span className="about-stack-label">TOOLS I WORK WITH</span><div className="about-stack-list">{stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div></section>
}

function Projects() {
  return <section id="projects" className="section projects-section"><div className="shell"><div className="projects-heading"><SectionHeading title="Selected work." subtitle="Real projects, active work, and what's coming next." /><span className="projects-note">PROJECTS / {String(projects.length).padStart(2, '0')}</span></div><div className="projects-grid">{projects.map((project) => <article className="project-card" key={project.number}><div className="project-card-top"><span>{project.number} / {project.category}</span>{project.url && <span className="project-symbol" aria-hidden="true"><Icon name="external" size={22} /></span>}</div><div className="project-card-content"><h3>{project.title}</h3><p>{project.description}</p></div><div className="project-card-bottom"><div className="tag-list">{project.tags.map((item) => <span key={item}>{item}</span>)}</div>{project.url ? <div className="project-links"><a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${project.linkLabel}: ${project.title}`}>{project.linkLabel} <Icon name="arrow" size={17} /></a>{project.secondaryUrl && <a href={project.secondaryUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.secondaryLinkLabel}: ${project.title}`}>{project.secondaryLinkLabel} <Icon name="external" size={15} /></a>}</div> : <span className="repo-pending">{project.title === 'DevRestore' ? 'Release in progress' : 'Details coming soon'}</span>}</div></article>)}</div></div></section>
}

function Experience() {
  return <section id="experience" className="section shell experience-section"><SectionHeading title="Beyond the code." subtitle="Leadership, learning, and sharing what I know." /><div className="experience-list">{highlights.map((item) => <div className="experience-row" key={item.title}><div className="experience-title"><span className="experience-marker" aria-hidden="true" /><h3>{item.title}</h3></div>{item.work ? <div className="experience-work-list">{item.work.map((role) => <p key={role.company}><a href={role.url} target="_blank" rel="noopener noreferrer" aria-label={`${role.company} website`}>{role.company} <Icon name="external" size={13} /></a><span> · {role.highlight}</span><span className="experience-work-period">{role.period}</span></p>)}</div> : <p>{item.detail}{item.url && <> · <a href={item.url} target="_blank" rel="noopener noreferrer">View listing <Icon name="external" size={13} /></a></>}</p>}<span className="experience-meta">{item.meta}</span></div>)}</div></section>
}

function CertificateMedia({ certificate }) {
  const [imageUnavailable, setImageUnavailable] = useState(false)
  if (!certificate.image || imageUnavailable) return <div className="certificate-art-placeholder" aria-label="Certificate image unavailable"><span>CERTIFICATE</span><strong>Image</strong><span>UNAVAILABLE</span></div>
  return <a className="certificate-image-link" href={certificate.image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${certificate.title} certificate image`}><img src={certificate.image} alt={`${certificate.title} awarded to Erick Mutua`} width={certificate.width} height={certificate.height} loading="lazy" onError={() => setImageUnavailable(true)} /></a>
}

function Certificates() {
  const railRef = useRef(null)
  const scroll = (direction) => {
    const rail = railRef.current
    if (!rail) return
    const cardWidth = rail.firstElementChild?.getBoundingClientRect().width || 350
    rail.scrollBy({ left: direction * (cardWidth + 16), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }
  return <section id="certificates" className="section shell certificates-section">
    <div className="certificate-heading"><SectionHeading title="Credentials." subtitle="Continuous learning, with the receipts to show for it." /><a href={linkedinUrl} target="_blank" rel="me noopener noreferrer" className="inline-link">View my LinkedIn <Icon name="external" size={17} /></a></div>
    {certificates.length ? <>
      <div className="certificate-controls"><button type="button" onClick={() => scroll(-1)} aria-label="Previous certificates"><Icon name="arrow" size={19} className="arrow-left" /></button><button type="button" onClick={() => scroll(1)} aria-label="Next certificates"><Icon name="arrow" size={19} /></button></div>
      <div className="certificate-rail" ref={railRef} aria-label="Certificates">{certificates.map((certificate) => <article className="certificate-card" key={certificate.title}>
        <CertificateMedia certificate={certificate} />
        <div className="certificate-card-body"><span className="certificate-label">CERTIFICATE</span><h3>{certificate.title}</h3><p>{certificate.issuer}{certificate.issued ? ` · ${certificate.issued}` : ''}</p>{certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">View certificate <Icon name="external" size={16} /></a>}</div>
      </article>)}</div>
    </> : <div className="certificate-empty"><div><span className="certificate-label">VERIFIED WORK</span><h3>Keep learning. Keep building.</h3><p>Explore my certificates and professional milestones on LinkedIn.</p></div><a href={linkedinUrl} target="_blank" rel="me noopener noreferrer">Explore my profile <Icon name="external" size={18} /></a></div>}
  </section>
}

function Contact() {
  return <section id="contact" className="contact-section"><div className="shell contact-inner"><div><p className="contact-small">GOT SOMETHING INTERESTING?</p><h2>Let's build<br /><span>what's next.</span></h2></div><div className="contact-side"><p>Backend systems, Linux deployments, security challenges, or a good problem to solve — I'm always up for a conversation.</p><a href={`mailto:${contactEmail}`} className="contact-return">Email me <Icon name="arrow" size={19} /></a><div className="social-links"><a href={linkedinUrl} target="_blank" rel="me noopener noreferrer">LinkedIn <Icon name="external" size={15} /></a><a href={githubUrl} target="_blank" rel="me noopener noreferrer">GitHub <Icon name="external" size={15} /></a></div></div></div></section>
}

function App() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('erick-theme') === 'builder' ? 'builder' : 'cyber' } catch { return 'cyber' } })
  const [booting, setBooting] = useState(false)
  const bootTimers = useRef([])
  const reduceMotion = useReducedMotion()
  useEffect(() => { document.documentElement.dataset.theme = theme; document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'cyber' ? '#080e0d' : '#f7f7f4'); try { localStorage.setItem('erick-theme', theme) } catch { /* Storage may be unavailable. */ } }, [theme])
  useEffect(() => () => bootTimers.current.forEach((timer) => window.clearTimeout(timer)), [])

  function enterBuilderMode() {
    if (theme === 'builder' || booting) return
    if (reduceMotion) { setTheme('builder'); return }
    setBooting(true)
    bootTimers.current.push(window.setTimeout(() => setTheme('builder'), 420))
    bootTimers.current.push(window.setTimeout(() => setBooting(false), 980))
  }

  return <><Header theme={theme} setTheme={setTheme} /><main><Hero theme={theme} onBuilderMode={enterBuilderMode} /><About /><Projects /><Experience /><Certificates /><Contact /></main><footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} Erick Mutua</span><span>BUILT TO SWITCH PERSPECTIVES.</span><a href="#top">BACK TO TOP ↑</a></div></footer><AnimatePresence>{booting && <motion.div className="mode-transition" role="status" aria-label="Starting Minimal Builder Mode" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} exit={{ opacity: 0 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}><span>ERICK_OS</span><strong>Starting Builder Mode<span className="mode-transition-cursor">_</span></strong></motion.div>}</AnimatePresence></>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
