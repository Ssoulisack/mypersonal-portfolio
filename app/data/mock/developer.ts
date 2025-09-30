// Define type for Core Skills
export type CoreSkill = string;

// Define the structure of the developer data
export interface DeveloperData {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  coreSkills: CoreSkill[];
  contact: {
    phone: string;
    instagram: string;
    linkedin: string;
    address: string;
  };
}

// Export the developer data with type safety
export const developerData: DeveloperData = {
  name: "Soulisack DUANGVILAY",
  role: "Back-end Developer",
  avatar: "/images/nagi.jpeg",
  bio: `Yaho!!~ 私はバックデベロッパーです ~ alex desu yoroshikune.🙂‍↕️`,

  coreSkills: ["Go", "Node.js", "PHP", "MySQL", "ORM", "Java"],

  contact: {
    phone: "+8562055168040",
    instagram: "https://www.instagram.com/24.thurs/",
    linkedin: "www.linkedin.com/in/sackdvl/",
    address: "Xaysettha District, Vientiane Capital.",
  }
};
