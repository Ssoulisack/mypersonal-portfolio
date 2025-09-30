// Define type for each social link
interface SocialLink {
  name: string;
  url: string;
}

// Define the structure of the contact info
export interface ContactInfo {
  email: string;
  location: string;
  social: SocialLink[];
}

// Export the contact info with type safety
export const contactInfo: ContactInfo = {
  email: "soulisack2498@gmail.com",
  location: "Vientiane, Laos",
  social: [
    {
      name: "GitHub",
      url: "https://github.com/Ssoulisack"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sackdvl/"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/LeoNelsukky"
    },
    {
      name: "Tiktok",
      url: "https://www.tiktok.com/@24.thurs?_t=ZS-8uoGnudpWxb&_r=1"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/24.thurs/"
    },
    {
      name: "Whatsapp",
      url: "https://wa.me/8562055168040"
    }
  ]
};
