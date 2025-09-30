import React, { ReactNode } from "react";
import { Code, Palette, Database, Globe, Lightbulb, Users, Server } from "lucide-react";

// Define the Skill data type with individual skills
interface Skill {
  icon: ReactNode;
  title: string;
  description: string;
  individualSkills: {
    name: string;
    proficiency?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  }[];
}

export const skillsData: Skill[] = [
  {
    icon: React.createElement(Code, { className: "h-6 w-6 text-pink-500" }),
    title: "Frontend Development",
    description: "Modern web development with responsive design",
    individualSkills: [
      { name: "HTML5", proficiency: "Intermediate" },
      { name: "CSS3", proficiency: "Intermediate" },
      { name: "JavaScript", proficiency: "Intermediate" },
      { name: "React", proficiency: "Beginner" },
      { name: "Tailwind CSS", proficiency: "Beginner" }
    ]
  },
  {
    icon: React.createElement(Server, { className: "h-6 w-6 text-pink-500" }),
    title: "Backend Development",
    description: "Server-side development and API creation",
    individualSkills: [
      { name: "Golang", proficiency: "Advanced" },
      { name: "REST APIs", proficiency: "Advanced" },
      { name: "Node.js", proficiency: "Intermediate" },
      { name: "Spring Boot", proficiency: "Beginner" },
      // { name: "Microservices", proficiency: "Beginner" }
    ]
  },
  {
    icon: React.createElement(Database, { className: "h-6 w-6 text-pink-500" }),
    title: "Database Management",
    description: "Database design and management",
    individualSkills: [
      { name: "MySQL", proficiency: "Intermediate" },
      { name: "PostgreSQL", proficiency: "Beginner" },
      { name: "SQL Server", proficiency: "Beginner" },
      // { name: "Redis", proficiency: "Beginner" },
      { name: "Database Design", proficiency: "Beginner" },
    ]
  },
  {
    icon: React.createElement(Users, { className: "h-6 w-6 text-pink-500" }),
    title: "Development Tools",
    description: "Essential tools for modern development",
    individualSkills: [
      { name: "Git version control", proficiency: "Intermediate" },
      { name: "GitHub", proficiency: "Intermediate" },
      { name: "Docker", proficiency: "Intermediate" },
      { name: "N8N (workflow automation)", proficiency: "Intermediate" },
      { name: "Postman", proficiency: "Intermediate" }
    ]
  },
  {
    icon: React.createElement(Lightbulb, { className: "h-6 w-6 text-pink-500" }),
    title: "Problem Solving",
    description: "Analytical thinking and creative solutions",
    individualSkills: [
      { name: "Debugging" },
      { name: "System Design" }
    ]
  },
  {
    icon: React.createElement(Globe, { className: "h-6 w-6 text-pink-500" }),
    title: "Soft Skills",
    description: "Professional and interpersonal abilities",
    individualSkills: [
      { name: "Team Collaboration" },
      { name: "Communication" },
      { name: "Time Management" },
      { name: "Adaptability" },
      { name: "Learning Agility" }
    ]
  }
];
