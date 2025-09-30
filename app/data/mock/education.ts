// Define the structure of an education entry
export interface Education {
    id: number;
    degree: string;
    institution: string;
    location: string;
    duration: string;
    major: string;
    courses: string[];
  }
  
  // Define the education data with type safety
  export const education: Education[] = [
    {
      "id": 1,
      "degree": "Bachelor of Computer Science",
      "institution": "Soutsaka Institute of Technology",
      "location": "Vientiane, Laos",
      "duration": "September 2024",
      "major": "Software Programming",
      "courses": [
        "Programming",
        "Database management systems",
        "Web development"
      ]
    },
    {
      "id": 2,
      "degree": "Higher Diploma",
      "institution": "Lao-German Technical College",
      "location": "Vientiane, Laos",
      "duration": "November 2021",
      "major": "Automotive Technology",
      "courses": [
        "Mechanical Systems",
      ]
    }
  ];  
  