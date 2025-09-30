// Define the Experience interface
interface Experience {
    id: number;
    position: string;
    company: string;
    location: string;
    duration: string;
    type: string;
    description: string;
    responsibilities: string[];
    achievements: string[];
    technologies: string[];
    logo: string;
  }
  
  // Export the experience array with proper typing
  export const experience: Experience[] = [
    {
      id: 1,
      position: "Backend Developer",
      company: "Kolao-Group",
      location: "Vientiane, LA",
      duration: "2024 - present",
      type: "Full-time",
      description: "Developed and maintained backend services for a data processing platform.",
      responsibilities: [
        "Created documentation for API endpoints",
        "Designed and implemented backend services",
        "Built real-time data processing pipelines",
        "Supported and maintained existing systems"
      ],
      achievements: [
        "Improved system security and performance",
        "Developed new features and improved existing ones",
        "Made the system more efficient and scalable"
      ],
      technologies: ["Go", "MySQL", "Git", "GitHub", "Jenkins", "Docker"],
      logo: "/images/kolao-icon.png"
    }
  ];