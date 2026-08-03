export interface Skill {
  name: string;
  category: 'Programming' | 'Data Science' | 'Artificial Intelligence' | 'Web Development' | 'Backend Development' | 'Automation' | 'Tools';
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
  intro: "Results-driven Backend AI Engineer & Data Science student, specializing in intelligent system architecture and modern web technologies.",
  story: "A highly motivated B.Tech AI & Data Science student at GEC Bikaner, passionate about constructing intelligent software. Driven by an insatiable curiosity for Machine Learning, Data Analytics, and high-performance backend systems, I combine computational thinking with creative problem-solving to deliver production-grade applications."
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
    company: "Tranqli",
    role: "Backend AI Engineer & Web Developer Intern",
    duration: "15 June - 15 July 2026",
    skills: ["Full-Stack Development", "Artificial Intelligence", "RESTful APIs", "UI/UX Design", "Python"],
    description: [
      "Designed and developed responsive, mobile-first web applications while simultaneously engineering the backend architecture to support them.",
      "Built robust RESTful APIs to seamlessly connect the interactive web frontend with Generative AI models on the backend.",
      "Optimized data pipelines and interactive elements to minimize latency between the web application and the AI endpoints, ensuring a smooth, real-time user experience."
    ],
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400"
  },
  {
    company: "ShadowFox",
    role: "Data Science Intern",
    duration: "February 2026",
    skills: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook", "EDA", "Data Visualization", "GitHub Project Management"],
    description: [
      "Conducted extensive Exploratory Data Analysis (EDA) on real-world datasets including Delhi Air Quality Index (AQI) and Cricket Fielding Data.",
      "Designed comprehensive data visualization suites using Matplotlib and Seaborn (histograms, boxplots, scatterplots) to uncover environmental and sports performance trends.",
      "Engineered structured Python scripts and generated thorough technical documentation to accelerate stakeholder decision-making.",
      "Managed project versioning and synchronized collaborative workflows using Git and GitHub repository practices."
    ],
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400"
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

  // Backend Development
  { name: "Backend Engineering", category: "Backend Development", level: 5 },
  { name: "System Architecture", category: "Backend Development", level: 5 },
  { name: "API Development", category: "Backend Development", level: 5 },
  { name: "Model Integration", category: "Backend Development", level: 5 },

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
    id: "cert-tranqli",
    title: "Backend AI Engineer Internship",
    organization: "Tranqli",
    issued: "Recent",
    verificationBadge: true,
    category: "AI",
    highlights: [
      "Backend Architecture & API Design",
      "Artificial Intelligence Integration",
      "System Optimization & Scalability",
      "AI Microservices"
    ],
    certificateUrl: "https://www.linkedin.com/posts/mohit-sharma-ba0585386_backendengineering-ai-artificialintelligence-share-7487533363067760640-sesS/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF8gDGgBe5O-khN-zy_vJk3yrn6PjynmmfU"
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
    ],
    certificateUrl: "https://www.linkedin.com/in/mohit-sharma-ba0585386/overlay/Certifications/92106384/treasury/?profileId=ACoAAF8gDGgBe5O-khN-zy_vJk3yrn6PjynmmfU"
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
    ],
    certificateUrl: "https://www.linkedin.com/in/mohit-sharma-ba0585386/overlay/Certifications/652697330/treasury/?profileId=ACoAAF8gDGgBe5O-khN-zy_vJk3yrn6PjynmmfU"
  },
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
