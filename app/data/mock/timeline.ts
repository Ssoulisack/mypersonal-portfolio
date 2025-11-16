import { TimelineItem } from "@/app/core/types/timeline.type";
import { FaBriefcase, FaCertificate, FaCode, FaGraduationCap } from "react-icons/fa";

export const timelineData: TimelineItem[] = [
    {
        date: "2021 - Present",
        title: "Senior Frontend Developer",
        subtitle: "Tech Innovations Inc.",
        description: "Led development of enterprise web applications using React and modern frontend technologies. Implemented CI/CD pipelines and mentored junior developers.",
        icon: FaBriefcase
    },
    {
        date: "2018 - 2021",
        title: "Software Engineer",
        subtitle: "Digital Solutions Corp",
        description: "Developed responsive web applications, implemented new features, and collaborated with cross-functional teams to deliver high-quality solutions.",
        icon: FaBriefcase
    },
    {
        date: "2014 - 2018",
        title: "Bachelor of Computer Science",
        subtitle: "Tech University",
        description: "Graduated with honors. Specialized in Web Technologies and Software Engineering. Led multiple academic projects.",
        icon: FaGraduationCap
    },
    {
        date: "2020",
        title: "AWS Certified Developer",
        subtitle: "Amazon Web Services",
        description: "Advanced certification in cloud development and architecture principles.",
        icon: FaCertificate
    },
    {
        date: "2019",
        title: "Full Stack Development",
        subtitle: "Personal Projects",
        description: "Built several open-source projects using React, Node.js, and MongoDB. Contributed to various community projects.",
        icon: FaCode
    }
];