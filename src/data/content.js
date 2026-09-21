// All homepage copy lives here so it can be edited without touching components.
// Facts (roles, dates, metrics, publication) come from the resume. Metrics the
// resume marks as approximate are labelled "approx." on the page.
//
// Project entries with `href: null` render as "Case study in progress"
// instead of a dead link. Set `href` once a case study or demo is live.

export const profile = {
  name: "Yuexin Li",
  role: "Design Engineer",
  email: "yuexinli1203@gmail.com",
  github: "https://github.com/1233198063",
  linkedin: "https://www.linkedin.com/in/yuexin-li-317401251/",
  focus: "AI agent workflows and product UI",
  stack: "React · TypeScript · Next.js · Python",
};

export const navItems = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const featuredProjects = [
  {
    id: "ops-workspace",
    visual: "workspace",
    title: "AI Customer Operations Workspace",
    org: "Blackwave Services LLC",
    period: "Feb. 2026 – Present",
    summary:
      "An AI-assisted workspace that unifies account, opportunity, support, activity and knowledge context into agent-guided workflows.",
    stats: [
      { value: "30–35%", label: "less time to review a customer and decide the next action (approx.)" },
      { value: "~30%", label: "lower perceived AI wait time (approx.)" },
    ],
    highlights: [
      "Client architecture for long-running agent workflows over SSE and WebSocket: streamed LLM output, tool progress, human approvals, cancellation, retries and session recovery",
      "Schema-driven Generative UI with 6+ reusable patterns: recommendations, citations, tool actions, approval requests, task progress and next steps",
      "Deterministic message ordering and stale-response protection for concurrent agent sessions",
    ],
    tags: ["React", "TypeScript", "Redux Toolkit", "SSE", "WebSocket"],
    href: null,
  },
  {
    id: "career-map",
    visual: "map",
    title: "Interactive Career Path Map",
    org: "Talentix Solutions Inc.",
    period: "Nov. 2025 – Jan. 2026",
    summary:
      "Built for an AI-powered clinician career platform: an interactive map that helps people explore career paths, spot skill gaps and get personalized next steps.",
    stats: [],
    highlights: [
      "Animated navigation with history-based state recovery",
      "Expandable role workflows across desktop and mobile",
      "Turned product requirements and Figma designs into shipped React experiences, plus an 8-step authentication and onboarding flow",
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    href: null,
  },
];

// Generic stops for the interactive map demo. They mirror what the platform
// does (explore paths, identify skill gaps, personalized next steps) and
// deliberately contain no real role names or product data.
export const careerMapStops = [
  { label: "Start", text: "Begin from where you are today." },
  { label: "Explore", text: "Browse roles and see how career paths connect." },
  { label: "Skill gaps", text: "Compare your skills with what a role asks for." },
  { label: "Next step", text: "Get personalized guidance on what to do next." },
  { label: "Goal", text: "The role you are working toward." },
];

export const additionalProject = {
  id: "image-analysis",
  title: "AI Image Analysis Platform",
  org: "SiriusMindShare LLC",
  period: "Feb. 2025 – Nov. 2025",
  summary:
    "A full-stack platform productized from a Python research pipeline: batch ingestion, searchable results, analytics and exportable reports.",
  stats: [
    { value: "~70%", label: "less repetitive analysis work (approx.)" },
    { value: "20+", label: "RESTful endpoints" },
    { value: "90%+", label: "OCR accuracy" },
  ],
  tags: ["React", "TypeScript", "FastAPI", "MySQL", "Python"],
  href: null,
};

export const experience = [
  {
    company: "Blackwave Services LLC",
    role: "React Developer",
    period: "Feb. 2026 – Present",
    location: "San Jose, CA",
    stack: "React, TypeScript, Redux Toolkit, SSE, WebSocket",
    achievements: [
      "Built an AI-assisted customer operations workspace that unified account, opportunity, support, activity, and knowledge context into agent-guided workflows, reducing customer review and next-action decision time by approximately 30–35%.",
      "Designed the client architecture for long-running agent workflows using SSE and WebSocket, supporting streamed LLM output, tool-execution progress, human approvals, cancellation, retries, partial failures, and session recovery while reducing perceived AI wait time by approximately 30%.",
      "Developed a schema-driven Generative UI system with 6+ reusable patterns for agent recommendations, citations, tool actions, approval requests, task progress, and next-step guidance across dynamic workflows.",
      "Hardened concurrent agent sessions with deterministic message ordering, stale-response protection, cancellation, recovery, automated testing, and frontend telemetry, reducing inconsistent behavior and regression effort by approximately 25–30%.",
    ],
  },
  {
    company: "Talentix Solutions Inc.",
    role: "Applied AI Front-End Engineer Intern",
    period: "Nov. 2025 – Jan. 2026",
    location: "Fremont, CA",
    stack: "Next.js, REST APIs, MCP",
    achievements: [
      "Shipped user-facing features for an AI-powered clinician career platform, translating product requirements and Figma designs into interactive React experiences that helped users explore career paths, identify skill gaps, and receive personalized next-step guidance.",
      "Built an interactive Career Path Map with React, Next.js, TypeScript, Tailwind CSS, and REST APIs, including animated navigation, history-based state recovery, and expandable role workflows across desktop and mobile.",
      "Owned an 8-step authentication and onboarding flow with email/password authentication, real-time validation, password recovery, and edge-case handling across responsive experiences.",
      "Used Claude with MCP-connected development workflows for rapid prototyping, code generation, refactoring, debugging, and edge-case analysis while reviewing generated code before production integration.",
    ],
  },
  {
    company: "SiriusMindShare LLC",
    role: "Data Scientist Intern → Software Engineering Intern",
    period: "Feb. 2025 – Nov. 2025",
    location: "San Jose, CA",
    stack: "Python, React, TypeScript, FastAPI, MySQL",
    achievements: [
      "Productized a Python research pipeline into a full-stack AI-powered Image Analysis Platform with batch ingestion, searchable results, analytics, and exportable reports, reducing repetitive analysis work by approximately 70%.",
      "Designed modular FastAPI services with 20+ RESTful endpoints and relational MySQL schemas for ingestion, parallel analysis, result storage, health monitoring, and retrieval across batch-processing workflows.",
      "Built the React and TypeScript product experience for drag-and-drop ingestion, batch controls, system status, interactive analytics, and reporting, owning features across frontend, APIs, and data flows.",
      "Developed the underlying Python computer-vision pipeline across 720 images from 144 online shops using Tesseract, EasyOCR, OpenCV, and KMeans; improved OCR accuracy to 90%+ through preprocessing and hybrid OCR integration, contributing to a Springer Nature publication.",
    ],
  },
];

export const education = {
  school: "Northeastern University",
  degree: "M.S. Information Systems",
  gpa: "GPA 3.96 / 4.00",
  graduated: "Graduated Dec. 2024",
  location: "San Jose, CA",
};

export const publication = {
  authors: "Yuexin Li et al.",
  title:
    "How Stylize Transfer Enhances the Visibility of Storefronts with Modified Attention",
  venue:
    "Machine Learning and Soft Computing: ICMLSC 2026 Revised Selected Papers, Springer Nature, CCIS 2948, pp. 349–361",
  doi: "10.1007/978-981-92-1546-1_29",
};

export const about = {
  intro:
    "I sit between design and engineering. I like to prototype in code, so the details that usually get lost in handoff, such as type, spacing, motion and state, are the details that ship.",
  principles: [
    {
      title: "Clarity first",
      body: "Complex systems earn trust when the interface explains itself.",
    },
    {
      title: "Motion with meaning",
      body: "Animation should explain a change, then get out of the way.",
    },
    {
      title: "Accessible by default",
      body: "Keyboard, screen reader and reduced-motion support are part of done.",
    },
  ],
  skills: [
    {
      label: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
    },
    {
      label: "Frameworks",
      items: [
        "React", "Next.js", "Redux Toolkit", "Node.js", "Express", "FastAPI",
        "REST APIs", "SSE", "WebSocket", "Ant Design", "MCP",
      ],
    },
    {
      label: "Tools",
      items: [
        "Figma", "MySQL", "PostgreSQL", "Git", "GitHub", "Docker",
        "Swagger / OpenAPI", "Postman", "Jest", "React Testing Library",
        "Playwright", "GA4", "GTM",
      ],
    },
  ],
};

// Earlier learning projects, kept live but out of the main showcase.
export const archive = [
  {
    title: "COVILLA Vacation Website",
    tech: "JavaScript",
    href: "https://1233198063.github.io/vacation-web/",
  },
  {
    title: "Weather API Platform",
    tech: "HTML / CSS",
    href: "https://1233198063.github.io/Weather-API-Platform/",
  },
  {
    title: "Online Eyewear Shop",
    tech: "Node.js, Firebase, Redux",
    href: "https://1233198063.github.io/online-shopping-web/",
  },
];
