// Keep project claims specific to what is verified or supplied by Erick.
export const projects = [
  {
    number: '01',
    title: 'Bunifu Youths CMS',
    category: 'Content platform',
    description: 'Worked on the internal content management platform that helps the Bunifu Youths team update website and program information.',
    tags: ['CMS', 'Education', 'Live'],
    url: 'https://cms.bunifuyouths.org/',
    linkLabel: 'Visit CMS',
  },
  {
    number: '02',
    title: 'Bunifu Youths',
    category: 'Public website',
    description: 'Worked on the public website for a Kenyan community helping children and teens explore coding, robotics, AI, and creative technology.',
    tags: ['Website', 'STEM', 'Live'],
    url: 'https://bunifuyouths.org/',
    linkLabel: 'Visit site',
  },
  {
    number: '03',
    title: 'Tickopedia',
    category: 'Event ticketing',
    description: 'Contribute primarily to backend development for a live platform where audiences discover events and organizers manage ticketing.',
    tags: ['Backend', 'Ticketing', 'Live'],
    url: 'https://tickopedia.com/',
    linkLabel: 'Visit site',
  },
  {
    number: '04',
    title: 'Syni.ai',
    category: 'Backend services',
    description: 'Built and maintained FastAPI services, contributed to deployment workflows, and improved database query performance during a hybrid internship.',
    tags: ['FastAPI', 'REST APIs', 'Backend'],
    url: 'https://syni.ai/',
    linkLabel: 'Visit site',
  },
  {
    number: '05',
    title: 'IntelliSecure',
    category: 'Mobile security',
    description: 'An AI-powered mobile app designed to detect M-Pesa scam messages and fraud, with a Django backend and Flutter interface.',
    tags: ['Django', 'Flutter', 'AI'],
    url: '',
    linkLabel: '',
  },
  {
    number: '06',
    title: 'Ripple-MCP',
    category: 'Open-source developer tooling',
    description: 'An open-source MCP server that gives coding agents structured operational context from Git history, CI, deployments, service health, docs, and GitHub pull requests.',
    tags: ['Python', 'MCP', 'Coding agents'],
    url: 'https://ripple-mcp.vercel.app/',
    linkLabel: 'Live site',
    secondaryUrl: 'https://github.com/Mechantchulo/Ripple-MCP',
    secondaryLinkLabel: 'GitHub',
  },
  {
    number: '07',
    title: 'NeuralBridge',
    category: 'Accessible technology',
    description: 'Built a real-time communication tool for deaf and autistic users using speech, gesture, and emotion models with WebSockets and a React interface.',
    tags: ['Django', 'React', 'WebSockets'],
    url: '',
    linkLabel: '',
  },
  {
    number: '08',
    title: 'DevRestore',
    category: 'Developer tooling',
    description: 'Scans Linux development tools into portable YAML profiles without reading configs or credentials. The early release restores allowlisted APT/DNF packages on Ubuntu, Debian, and Fedora, with optional GitHub backup.',
    tags: ['Linux', 'YAML', 'Early release'],
    url: '',
    linkLabel: '',
  },
]

export const stack = ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Docker', 'Linux (Kali)', 'Bash', 'YOLO', 'MCP (Model Context Protocol)']

export const highlights = [
  { title: 'Kenya GitHub activity', detail: 'Listed among Kenya’s most active public GitHub contributors as Mechantchulo', meta: 'Open source', url: 'https://committers.top/kenya_public' },
  { title: 'Tech Lead', detail: 'Egerton University Computer Science Students Association (EUCOSSA)', meta: 'Current role' },
  {
    title: 'Backend Developer',
    work: [
      { company: 'Tickopedia', url: 'https://tickopedia.com/', highlight: 'Backend development for event discovery and ticketing', period: 'Current' },
      { company: 'Syni.ai', url: 'https://syni.ai/', highlight: 'FastAPI APIs, deployment workflows, and query performance', period: 'Dec 2025–Apr 2026' },
    ],
    meta: 'Product engineering',
  },
  { title: 'DevOps Lead', detail: 'EUCOSSA', meta: 'Previous role' },
  { title: 'Connected Africa Summit 2026 CTF', detail: 'Outstanding Performance award in the Capture the Flag competition', meta: 'Security achievement' },
  { title: 'CyberSoc', detail: 'Cybersecurity community participation', meta: 'Community' },
  { title: 'CTF challenges', detail: 'Hands-on security practice through capture-the-flag challenges', meta: 'Security practice' },
  { title: 'Bash Wednesday', detail: 'Organizer of terminal scripting workshops', meta: 'Community learning' },
]

export const bio = 'I’m Erick Mutua, known online as Mechantchulo—a Kenya-based backend and DevOps engineer and Computer Science student at Egerton University. I’m currently Tech Lead for the Egerton University Computer Science Students Association (EUCOSSA) and a backend developer at Tickopedia; previously EUCOSSA DevOps Lead. I build scalable backends, create tools for coding agents, deploy on Linux, and break things in CTFs.'

export const contactEmail = 'chulomechant@gmail.com'
export const linkedinUrl = 'https://www.linkedin.com/in/erick-mutua-19a076303'
export const githubUrl = 'https://github.com/Mechantchulo'

// Add image paths and credential URLs when more certificate assets are available.
export const certificates = [
  {
    title: 'Outstanding Performance — Capture the Flag',
    issuer: 'Connected Africa Summit 2026 · ICT Authority',
    issued: 'April 2026',
    image: '/certificates/connected-africa-ctf-2026.jpeg',
    width: 828,
    height: 587,
    credentialUrl: '/certificates/connected-africa-ctf-2026.jpeg',
  },
  {
    title: 'AI Summit 2025 Hackathon — Participation',
    issuer: 'JHUB Africa · JKUAT',
    issued: '7 April 2025',
    image: '/certificates/ai-summit-2025.png',
    width: 773,
    height: 446,
    credentialUrl: '/certificates/ai-summit-2025.png',
  },
]
