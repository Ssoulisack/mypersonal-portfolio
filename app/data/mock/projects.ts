export interface Project {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Online Lao Dictionary Platform",
    description: "Developed a comprehensive online Lao dictionary to facilitate efficient word searches and maintain up-to-date definitions. The platform also serves as a collaborative space for language enthusiasts to contribute and exchange knowledge.",
    coverImage: "/images/php_icon.png",
    category: "Full Stack",
    technologies: ["PHP", "SQL", "MySQL", "Bootstrap", "JavaScript"],
    githubUrl: "https://github.com/your-repo",
    liveUrl: "",
  },
  {
    id: 2,
    title: "Problem Tracking and Management API",
    description: "Engineered a robust backend API to manage user accounts and assign problem tickets to responsible officers. Implemented progress tracking and automated notifications to keep users informed upon resolution, alongside secure authentication and an administrative dashboard for data insights.",
    coverImage: "/images/golang_icon.png",
    category: "Backend",
    technologies: ["Go", "GORM", "Fiber", "MySQL"],
    githubUrl: "https://github.com/your-repo",
    liveUrl: "",
  },
  {
    id: 3,
    title: "Kolao Employee Data Management System",
    description: "Designed and implemented a secure backend service to manage and serve employee data for Kolao company, ensuring data integrity and confidentiality across the organization.",
    coverImage: "/images/golang_icon.png",
    category: "Backend",
    technologies: ["Go", "GORM", "Fiber", "MySQL"],
  },
  {
    id: 4,
    title: "Automated Workflow Tracking System",
    description: "Developed an automated system to streamline departmental workflows by capturing submissions, storing data securely, and facilitating administrator notifications. Enabled task assignments to team members with comprehensive reporting upon completion.",
    coverImage: "/images/n8n.png",
    category: "Backend",
    technologies: ["N8N", "Google sheet", "MySQL", "Go"],
  },
  {
    id: 5,
    title: "Business Unit Feature Enhancement",
    description: "Maintained and enhanced core features across multiple business units, including LCC and KOKKOK, within Kolao company to improve operational efficiency and support evolving business needs.",
    coverImage: "/images/golang_icon.png",
    category: "Backend",
    technologies: ["Go", "GORM", "Fiber", "MySQL"],
  }
];
