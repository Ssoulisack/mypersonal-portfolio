import { LogoItem } from "../../core/types/logo.type";
import { ToolIcon } from "@/app/components/ui/logos";


//adding ariaLabel i will define categories like library, tools, framework, language, database, etc.
export const programmingLanguages: LogoItem[] = [
  {
    title: "React",
    node: <ToolIcon name="react" width={36} height={36} />,
    ariaLabel: "Frontend"
  },
  {
    title: "Tailwind",
    node: <ToolIcon name="tailwindcss" width={36} height={36} />,
    ariaLabel: "Frontend"
  },
  {
    title: "CSS",
    node: <ToolIcon name="css" width={36} height={36} />,
    ariaLabel: "Frontend"
  },
  {
    title: "Docker",
    node: <ToolIcon name="docker" width={36} height={36} />,
    ariaLabel: "Tools"
  },
  {
    title: "Next.js",
    node: <ToolIcon name="nextjs" width={36} height={36} className="bg-white border border-white/10 rounded-[150px]" />,
    ariaLabel: "Frontend"
  },
  {
    title: "TypeScript",
    node: <ToolIcon name="typescript" width={36} height={36} />,
    ariaLabel: "Backend"
  },
  //LINUX
  {
    title: "Linux",
    node: <ToolIcon name="linux" width={36} height={36} />,
    ariaLabel: "Tools"
  },
  {
    title: "Netlify",
    node: <ToolIcon name="netlify" width={36} height={36} />,
    ariaLabel: "Tools"
  },
  {
    title: "Go",
    node: <ToolIcon name="go" width={36} height={36} />,
    ariaLabel: "Backend"
  },
  {
    title: "Bun",
    node: <ToolIcon name="bun" width={36} height={36} />,
    ariaLabel: "Backend"
  },
  {
    title: "Java",
    node: <ToolIcon name="java" width={36} height={36} />,
    ariaLabel: "Backend"
  },
  {
    title: "Git",
    node: <ToolIcon name="git" width={36} height={36} />,
    ariaLabel: "Tools"
  },
  {
    //gafana
    title: "Grafana",
    node: <ToolIcon name="grafana" width={36} height={36} />,
    ariaLabel: "Tools"
  },
  //github
  {
    title: "GitHub",
    node: <ToolIcon name="github" width={36} height={36} className="bg-white/80 border border-white/10 rounded-[150px]" />,
    ariaLabel: "Tools"
  },
  //portainer
  {
    title: "Portainer",
    node: <ToolIcon name="portainer" width={36} height={36} />,
    ariaLabel: "Tools"
  },
  //cloudflare
  {
    title: "Cloudflare",
    node: <ToolIcon name="cloudflare" width={36} height={36} />,
    ariaLabel: "Tools"
  },
  //jenkins
  {
    title: "Jenkins",
    node: <ToolIcon name="jenkins" width={36} height={36} />,
    ariaLabel: "Tools"
  },
  {
    title: "MongoDB",
    node: <ToolIcon name="mongodb" width={36} height={36} />,
    ariaLabel: "Database"
  },
  {
    title: "Postgresql",
    node: <ToolIcon name="postgresql" width={36} height={36} />,
    ariaLabel: "Database"
  },
  {
    title: "N8N",
    node: <ToolIcon name="n8n" width={36} height={36} />,
    ariaLabel: "Tools"
  },
  {
    title: "Redis",
    node: <ToolIcon name="redis" width={36} height={36} />,
    ariaLabel: "Database"
  },
  {
    title: "MySQL",
    node: <ToolIcon name="mysql" width={36} height={36} />,
    ariaLabel: "Database"
  },
];