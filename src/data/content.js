// All homepage copy lives here so it can be edited without touching components.
// Facts (roles, dates, metrics, publication) come from the resume. Metrics the
// resume marks as approximate are labelled "approx." on the page.
//
// Project entries with `href: null` render as "Case study in progress"
// instead of a dead link. Set `href` once a case study or demo is live.

// Springer paper this platform's OCR pipeline contributed to (also shown under Education & research).
const PAPER_DOI = "10.1007/978-981-92-1546-1_29";

export const profile = {
  name: "Yuexin Li",
  role: "Full-Stack Engineer / Design Engineer",
  email: "yuexinli1203@gmail.com",
  github: "https://github.com/1233198063",
  linkedin: "https://www.linkedin.com/in/yuexin-li-317401251/",
  focus: "Full-stack AI features and product UI",
  stack: "React · TypeScript · Node.js · Python",
};

export const navItems = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const featuredProjects = [
  {
    id: "ai-crm",
    visual: "workspace",
    title: "Context-Aware AI CRM",
    org: "Blackwave Services",
    period: "Feb. 2026 – Present",
    summary:
      "A multi-tenant CRM used by 6 client organizations, where an AI assistant reads the page you are on and your browsing history, then answers with cards, dashboards or actions to approve.",
    stats: [
      { value: "4 days", label: "to onboard a new client, down from 3 weeks" },
      { value: "240 ms", label: "p75 filter-to-render, down from 620 ms" },
    ],
    highlights: [
      "Drag-and-resize dashboard builder that grew the assistant’s card configurations from 12 to 100+ with no initial-bundle growth",
      "Schema-driven UI that renders each client’s fields and page layouts from versioned config on one shared codebase",
      "Resumable SSE stream for the assistant: 200 forced disconnects, no lost or duplicated output",
      "Chat-to-query over CRM data, with LLM-written SQL hardened by AST allowlisting, tenant/role scoping and read-only execution",
    ],
    tags: ["React", "TypeScript", "TanStack Query", "Node.js", "SSE", "PostgreSQL"],
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
  {
    id: "image-analysis",
    visual: "analysis",
    title: "Retail Visual Analysis Platform",
    org: "SiriusMindShare",
    period: "Feb. 2025 – Feb. 2026",
    summary:
      "Productized from my M.S. visual-attention research: a platform that turns store photos and walkthrough videos into shelf and signage recommendations.",
    stats: [
      { value: "18", label: "retailers adopted the platform" },
      { value: "~70%", label: "less manual analysis for their teams (approx.)" },
    ],
    highlights: [
      "Review workspace that layers OCR boxes, product regions and predicted-attention heatmaps over store photos and video keyframes",
      "Every recommendation linked to the image region behind it, with before/after and cross-store comparisons of versioned analyses",
      "Resumable S3 uploads, an SQS buffer and a per-asset state machine with per-stage retries, so one bad video never fails the batch",
    ],
    tags: ["React", "TypeScript", "FastAPI", "MySQL", "AWS S3 / SQS", "OpenCV"],
    href: `https://doi.org/${PAPER_DOI}`,
    linkLabel: "Read the related paper",
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

export const experience = [
  {
    company: "Blackwave Services",
    role: "Software Engineer",
    period: "Feb. 2026 – Present",
    location: "San Jose, CA",
    stack: "React, TypeScript, TanStack Query, Node.js, PostgreSQL, SSE, Playwright",
    summary:
      "At an early-stage startup, owned the React/TypeScript frontend and full-stack AI features of a multi-tenant CRM used by 6 client organizations, where a context-aware LLM resolves each question against the user’s current page and browsing history, then turns it into cards, dashboards, or actions to approve.",
    achievements: [
      "Replaced static reports with a drag-and-resize dashboard builder, expanding the AI assistant’s card configurations from 12 to 100+ via 8 lazy-loaded typed renderers with no initial-bundle growth.",
      "Designed a schema-driven React UI layer that renders each client’s fields and page layouts from versioned config on one shared codebase, cutting new-client onboarding from 3 weeks to 4 days.",
      "Cut p75 filter-to-render from 620 to 240 ms (12-card benchmark) with selector-level subscriptions on scoped TanStack Query caches, so a filter change re-renders only the affected cards.",
      "Built the assistant’s resumable SSE stream and co-designed its Node.js API to carry page and browsing-history context; 200 forced disconnects caused no lost or duplicated output.",
      "Made CRM data queryable by chat: the LLM extracts metrics, filters, and date ranges into a typed query spec rendered as cards, cutting data-engineer requests from hours to under 5 minutes.",
      "Hardened LLM-written SQL for open-ended questions against prompt injection with AST allowlisting, tenant/role scoping, and read-only PostgreSQL execution.",
      "Halved my median spec-to-production time with AI coding agents, gating their changes behind a 120-case Playwright AI eval of the CRM assistant’s authorization and tool use.",
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
    company: "SiriusMindShare",
    role: "Data Scientist Intern → Software Engineering Intern",
    period: "Feb. 2025 – Feb. 2026",
    location: "San Jose, CA",
    stack: "React, TypeScript, FastAPI, MySQL, AWS S3/SQS, Python, OpenCV",
    summary:
      "Productized my M.S. visual-attention research into a platform that turns store photos and videos into shelf and signage recommendations; adopted by 18 retailers, it cut their manual analysis by approximately 70%.",
    achievements: [
      "Shipped a React/TypeScript review workspace that layers OCR boxes, product regions, and predicted-attention heatmaps over store photos and walkthrough-video keyframes on a timeline.",
      "Linked every recommendation to the image region behind it and designed synchronized before/after and cross-store comparisons of versioned analyses, so teams could verify each display change.",
      "Kept large media batches responsive with virtualization and on-demand loading, and surfaced live per-asset status so reviewers could start on finished assets while the rest kept processing.",
      "Engineered resumable direct uploads to S3 and an SQS queue that absorbed upload spikes before frame extraction, OCR, and visual analysis, streaming progress to the UI over SSE.",
      "Modeled a per-asset processing state machine in FastAPI/MySQL with partial results and per-stage retries, so one bad video didn’t fail the batch and finished work wasn’t rerun.",
      "Developed a Python/OpenCV/OCR pipeline that drops blurry and duplicate frames, reads signage text, and scores visibility and clutter from attention maps; co-authored an ICMLSC 2026 paper.",
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
  doi: PAPER_DOI,
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
      items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
    },
    {
      label: "Frontend",
      items: [
        "React", "Next.js", "Redux Toolkit", "TanStack Query", "Tailwind CSS",
        "Vite", "Ant Design", "Accessibility", "Figma",
      ],
    },
    {
      label: "Backend & Data",
      items: [
        "Node.js", "Express", "FastAPI", "REST", "GraphQL", "PostgreSQL",
        "MySQL", "Redis", "SSE", "WebSockets",
      ],
    },
    {
      label: "AI & LLM",
      items: [
        "OpenAI / Anthropic APIs", "Tool calling", "Structured outputs",
        "Text-to-SQL", "Prompt engineering", "Evals",
      ],
    },
    {
      label: "Computer Vision",
      items: ["OpenCV", "OCR (Tesseract, EasyOCR)", "Predicted-attention heatmaps"],
    },
    {
      label: "Cloud & DevOps",
      items: ["AWS (S3, SQS)", "Docker", "Terraform", "GitHub Actions", "CI/CD", "OpenTelemetry"],
    },
    {
      label: "Testing",
      items: ["Jest", "Vitest", "React Testing Library", "Playwright", "MSW"],
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
