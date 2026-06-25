export interface Skill {
  name: string;
  category: 'Programming' | 'Data Science' | 'Artificial Intelligence' | 'Web Development' | 'Automation' | 'Tools';
  level: number; // 1-5 for visual bars/indicators
}

export interface Internship {
  company: string;
  role: string;
  duration: string;
  description: string[];
  skills: string[];
  color: string; // Tailwind color classes for custom theme highlights
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  issued: string;
  verificationBadge: boolean;
  category: 'Data Science' | 'Web Development' | 'AI' | 'Analytics';
  highlights: string[];
  certificateUrl?: string;
}

export interface Hobby {
  name: string;
  description: string;
  iconName: string;
}

export interface Stat {
  value: string;
  targetNumber: number;
  label: string;
  description: string;
}

// Portfolio Data
export const personalInfo = {
  name: "Mohit Sharma",
  headline: "AI & Data Science Student | Machine Learning | Python, C++ | Building Intelligent Systems",
  location: "Rajasthan, India",
  email: "mohitsharma.111206@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohit-sharma-ba0585386/",
  github: "https://github.com/mohitsharma111206",
  instagram: "https://instagram.com/mohit.avx",
  intro: "I enjoy transforming ideas into intelligent digital solutions through AI, data, automation, and modern web technologies.",
  story: "A highly motivated B.Tech AI & Data Science student at GEC Bikaner, passionate about constructing intelligent software. Driven by an insatiable curiosity for Machine Learning, Data Analytics, workflow automation, and modern full-stack web applications, I combine computational thinking with creative problem-solving to deliver production-grade systems."
};

export const educationList: Education[] = [
  {
    institution: "Government Engineering College, Bikaner",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Artificial Intelligence & Data Science",
    duration: "2025 – 2029",
    location: "Rajasthan, India",
    achievements: [
      "Rigorous academic curriculum focusing on advanced mathematics, statistics, computer science, and core AI methodologies.",
      "Hands-on research and building smart systems using Python, C++, and machine learning tools."
    ]
  }
];

export const internships: Internship[] = [
  {
    company: "ShadowFox",
    role: "Data Science Intern",
    duration: "February 2026",
    skills: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook", "EDA", "Data Visualization", "GitHub Project Management"],
    description: [
      "Conducted detailed Python-based data analysis and Exploratory Data Analysis (EDA) on complex datasets.",
      "Created highly expressive and intuitive data visualizations using Matplotlib and Seaborn for business insight generation.",
      "Engineered structured notebooks in Jupyter, providing thorough documentation, clean data-cleaning pipelines, and automated reporting.",
      "Utilized active GitHub repository management to synchronize project workflows and versioning."
    ],
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400"
  },
  {
    company: "Tranqli",
    role: "Web Development & Designing Intern",
    duration: "Ongoing / Prior",
    skills: ["Website Development", "UI/UX Design", "Frontend Development", "Web Design Principles", "Responsive Layouts", "User-Focused Experiences"],
    description: [
      "Crafted high-fidelity website development and responsive layouts prioritizing user-focused experiences.",
      "Applied advanced frontend web design principles to create aesthetically beautiful and interactive layouts.",
      "Designed seamless user interfaces (UI/UX) ensuring extreme accessibility, performance, and responsive screen-scaling."
    ],
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400"
  }
];

export const skillsList: Skill[] = [
  // Programming
  { name: "C", category: "Programming", level: 5 },
  { name: "C++", category: "Programming", level: 5 },
  { name: "Python", category: "Programming", level: 5 },
  
  // Data Science
  { name: "Pandas", category: "Data Science", level: 5 },
  { name: "Matplotlib", category: "Data Science", level: 5 },
  { name: "Seaborn", category: "Data Science", level: 5 },
  { name: "Data Visualization", category: "Data Science", level: 5 },

  // AI
  { name: "Generative AI", category: "Artificial Intelligence", level: 5 },
  { name: "Prompt Engineering", category: "Artificial Intelligence", level: 5 },
  { name: "AI Fundamentals", category: "Artificial Intelligence", level: 5 },

  // Web Dev
  { name: "HTML", category: "Web Development", level: 5 },
  { name: "CSS", category: "Web Development", level: 5 },
  { name: "JavaScript", category: "Web Development", level: 5 },
  { name: "Responsive Design", category: "Web Development", level: 5 },
  { name: "UI/UX Design", category: "Web Development", level: 5 },

  // Automation
  { name: "n8n", category: "Automation", level: 5 },
  { name: "Workflow Automation", category: "Automation", level: 5 },

  // Tools
  { name: "Git", category: "Tools", level: 5 },
  { name: "GitHub", category: "Tools", level: 5 },
  { name: "Jupyter Notebook", category: "Tools", level: 5 },
  { name: "Google AI Studio", category: "Tools", level: 5 },
  { name: "Replit", category: "Tools", level: 5 }
];

export const certifications: Certification[] = [
  {
    id: "cert-shadowfox",
    title: "Data Science Internship Certificate",
    organization: "ShadowFox",
    issued: "February 2026",
    verificationBadge: true,
    category: "Data Science",
    highlights: [
      "Python Programming",
      "Data Analysis & Exploratory Data Analysis (EDA)",
      "Data Visualization (Matplotlib, Seaborn)",
      "Jupyter Notebook, Data Cleaning & Insight Generation",
      "Structured Report Writing & Documentation"
    ]
  },
  {
    id: "cert-tranqli",
    title: "Web Development & Designing Internship",
    organization: "Tranqli",
    issued: "Recent",
    verificationBadge: true,
    category: "Web Development",
    highlights: [
      "Web Development & Frontend Development",
      "Responsive Layouts",
      "UI/UX Design & Principles",
      "User Experience & Website Design"
    ]
  },
  {
    id: "cert-genai",
    title: "Introduction to Generative AI Studio",
    organization: "Simplilearn + Google Cloud",
    issued: "March 2026",
    verificationBadge: true,
    category: "AI",
    highlights: [
      "Generative AI",
      "Prompt Engineering",
      "Large Language Models (LLMs)",
      "AI Applications & Intelligent Workflows"
    ]
  },
  {
    id: "cert-analytics",
    title: "Google Analytics Certification (GA4)",
    organization: "Google",
    issued: "January 2026",
    verificationBadge: true,
    category: "Analytics",
    highlights: [
      "Event-Based Analytics",
      "User Journey & Audience Measurement",
      "Data-Driven Decision Making & Web Analytics"
    ]
  }
];

export const hobbiesList: Hobby[] = [
  {
    name: "Sketching",
    description: "Visualizing ideas, human forms, and design concepts through charcoal and digital sketching.",
    iconName: "PenTool"
  },
  {
    name: "Playing Guitar",
    description: "Expressing creative rhythms, chords, and fingerstyle patterns on the acoustic guitar.",
    iconName: "Music"
  },
  {
    name: "Singing",
    description: "Exploring vocal melodies, pitch modulation, and acoustic covers of indie/classical tracks.",
    iconName: "Mic"
  },
  {
    name: "Reading Books",
    description: "Devouring literature on computer science history, cosmic science, sci-fi, and philosophy.",
    iconName: "BookOpen"
  },
  {
    name: "Coding",
    description: "Building open-source scripts, hacking smart API connections, and setting up automation workflows.",
    iconName: "Code"
  }
];

export const statistics: Stat[] = [
  {
    value: "1000+",
    targetNumber: 1000,
    label: "Professional Connections",
    description: "A robust professional network across the AI, ML, and web engineering industries."
  },
  {
    value: "2+",
    targetNumber: 2,
    label: "Industry Internships",
    description: "Real-world experience in Data Science and Full-Stack Web Development."
  },
  {
    value: "4+",
    targetNumber: 4,
    label: "Certifications & Credentials",
    description: "Industry-recognized credentials from Google, ShadowFox, Tranqli, and more."
  },
  {
    value: "AI & DS",
    targetNumber: 1,
    label: "Building Intelligent Systems",
    description: "B.Tech candidate dedicated to developing advanced machine learning solutions."
  }
];
