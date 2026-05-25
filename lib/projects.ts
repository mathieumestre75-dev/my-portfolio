export interface HomeProject {
  slug: string
  title: string
  description: string
  gradient: string
  video?: string
  titleOverlay?: string
  tags: string[]
  top: number
  left: number
  rotate: number
  zIndex: number
}

export const homeProjects: HomeProject[] = [
  {
    slug: 'omro',
    title: 'Omro',
    description: 'Mobile and brand design',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    video: 'https://framerusercontent.com/assets/kxDBVRmfj6B5ABnEZZ6mkmxKmrg.mp4',
    tags: ['Mobile Design', 'Brand Design'],
    top: -42,
    left: 703,
    rotate: 0,
    zIndex: 4,
  },
  {
    slug: 'noto',
    title: 'Noto',
    description: 'Mobile design',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    video: 'https://framerusercontent.com/assets/vJartkUm1cgJd6nwHHK6tzamQ0.mp4',
    titleOverlay: 'Noto',
    tags: ['Mobile Design'],
    top: 37,
    left: 467,
    rotate: 0,
    zIndex: 3,
  },
  {
    slug: 'azure-iot',
    title: 'Azure IoT',
    description: 'Mobile and desktop design',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    video: 'https://framerusercontent.com/assets/oDc5CCQvvQoL6t8EpijysOmqemY.mp4',
    tags: ['Mobile Design', 'Desktop Design'],
    top: 321,
    left: 417,
    rotate: 0,
    zIndex: 2,
  },
  {
    slug: 'desa',
    title: 'Desa',
    description: 'Mobile design',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    video: 'https://framerusercontent.com/assets/JqE2KiKbDDfKSaHI6MfBg8LJkwo.mp4',
    tags: ['Mobile Design'],
    top: 241,
    left: 759,
    rotate: 0,
    zIndex: 1,
  },
]

export interface Project {
  slug: string;
  title: string;
  description: string;
  gradient: string;
  category: string;
  type: string;
  year: string;
  tags: string[];
  role: string;
  timeline: string;
  team: string;
  skills: string[];
  highlights: string[];
  overview: string;
  problem: string;
  solution: string;
  outcome: string;
  learned: string;
}

export const projects: Project[] = [
  {
    slug: 'nucleus',
    title: 'Nucleus',
    description: 'SaaS analytics dashboard redesign',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    category: 'Product Design',
    type: 'Redesign · B2B · Dashboard',
    year: '2024',
    tags: ['Redesign', 'B2B', 'Dashboard'],
    role: 'Lead Product Designer',
    timeline: '4 months',
    team: '1 designer, 3 engineers',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    highlights: ['Reduced time-to-insight by 40%', 'Redesigned information architecture', 'Built reusable component library'],
    overview: 'Nucleus is a B2B analytics platform used by operations teams to track performance metrics across their supply chain. When I joined, the product had grown organically and the dashboard had become a patchwork of features with no clear hierarchy.',
    problem: 'Users were spending 30+ minutes per session navigating fragmented dashboards to find the insights they needed. Interviews revealed three core jobs that the product failed to support efficiently.',
    solution: 'Redesigned the IA around jobs-to-be-done, created a unified dashboard with contextual filtering and progressive disclosure, and built a reusable component library to ensure future consistency.',
    outcome: 'Time-to-insight dropped 40%, NPS increased from 24 to 51, and engineering velocity improved significantly with the shared component library.',
    learned: 'Scope creep is inevitable in redesigns. Having a clear definition of done — tied to measurable outcomes, not pixel counts — was the only thing that kept the project from running indefinitely.',
  },
  {
    slug: 'flowdesk',
    title: 'Flowdesk',
    description: '0→1 CRM for freelancers',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    category: 'Product Design',
    type: '0→1 · SaaS · Mobile',
    year: '2024',
    tags: ['0→1', 'SaaS', 'Mobile'],
    role: 'Product Designer',
    timeline: '6 months',
    team: '2 designers, 4 engineers',
    skills: ['Figma', 'User Research', 'Prototyping', 'Mobile Design'],
    highlights: ['2,000 signups in week one', 'Designed end-to-end mobile experience', '78% onboarding completion rate'],
    overview: 'Flowdesk is a lightweight CRM built specifically for independent freelancers who need relationship management without enterprise complexity. I joined pre-seed to design the product from first principles.',
    problem: 'Freelancers were using spreadsheets and sticky notes to track clients, leads, and follow-ups. Existing CRMs were too complex, too expensive, or too sales-team-focused to fit a solo workflow.',
    solution: 'Designed an opinionated 0→1 product with a mobile-first approach, focusing on three core jobs: track contacts, log interactions, and follow up. Ran eight rounds of usability testing before launch.',
    outcome: '2,000 signups in week one, 78% onboarding completion, and average session length of 6 minutes — well above the category benchmark.',
    learned: 'For 0→1 work, ruthless prioritization is a design decision. Every feature we cut was a feature users would never struggle with.',
  },
  {
    slug: 'arcal',
    title: 'Arcal',
    description: 'Enterprise data platform UX research',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    category: 'UX Research',
    type: 'Research · Enterprise · B2B',
    year: '2023',
    tags: ['Research', 'Enterprise', 'B2B'],
    role: 'UX Researcher',
    timeline: '3 months',
    team: '1 researcher, 1 designer',
    skills: ['User Interviews', 'Journey Mapping', 'Usability Testing', 'Synthesis'],
    highlights: ['40 interviews across 8 enterprise clients', 'Identified 3 critical friction points', 'Research led to 2 major feature pivots'],
    overview: 'Arcal is an enterprise data platform used by analysts to query, visualize, and share insights. Enterprise clients were churning at 18% annually — high for the segment, but the team lacked evidence about why.',
    problem: 'The product team had strong hypotheses about churn drivers, but they were based on support tickets and anecdote. They needed research evidence before committing to a 6-month roadmap.',
    solution: 'Ran 40 in-depth interviews across 8 enterprise clients, conducted 12 usability sessions on core flows, and synthesized findings into a journey map with three critical friction points ranked by impact and frequency.',
    outcome: 'Research led to two major feature pivots. Annual churn dropped from 18% to 9% the following year. Findings informed 18 months of roadmap decisions.',
    learned: 'In enterprise research, your real users are often not the buyers. Talking to analysts instead of managers revealed problems the product team never would have found through support tickets.',
  },
  {
    slug: 'meridian',
    title: 'Meridian',
    description: 'Internal ops tool for a scale-up',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    category: 'Product Design',
    type: 'Redesign · Ops · Desktop',
    year: '2023',
    tags: ['Redesign', 'Ops', 'Desktop'],
    role: 'Product Designer',
    timeline: '5 months',
    team: '1 designer, 2 engineers',
    skills: ['Figma', 'Design Systems', 'Stakeholder Management', 'Data Visualization'],
    highlights: ['Reduced manual data entry by 60%', 'Adopted by 200+ internal users', 'Built the company\'s first design system'],
    overview: 'Meridian is an internal operations tool used by a scale-up\'s ops team to manage procurement, logistics, and vendor relationships. The team was using five different tools plus a patchwork of spreadsheets.',
    problem: 'Tool fragmentation was causing data entry errors, slowing decision-making, and creating a 2-day lag between events and reporting. New ops hires needed 3 weeks to become productive.',
    solution: 'Consolidated the toolset into a single desktop app, designed an ops-specific IA based on job shadowing and contextual inquiry, and built the company\'s first internal design system.',
    outcome: 'Manual data entry reduced by 60%, tool adoption reached 200+ users within 3 months, and the design system became the foundation for all future internal tools.',
    learned: 'Internal tools have a specific dynamic: users can\'t leave, which means bad UX just becomes accepted. The moment you make something fast and obvious, the team is shocked — they forgot it could be easier.',
  },
];
