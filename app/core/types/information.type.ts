export type Information = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  position?: string;
  bio?: string;
  avatar?: string;
  socials?: Socials[];
}

export type Socials = {
    id: number;
    platform: string;
    url: string;
    icon: string;
}

export type Cards = {
    title: string;
    image: string;
    className: string;
}

export const InformationMock: Information = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "USA",
    position: "Backend Developer",
    bio: "I am a software engineer with a passion for building web applications.",
    avatar: "https://via.placeholder.com/150",
    socials: [
        {
            id: 1,
            platform: "WhatsApp",
            url: "https://wa.me/1234567890",
            icon: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            platform: "GitHub",
            url: "https://github.com/john_doe",
            icon: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            platform: "LinkedIn",
            url: "https://linkedin.com/in/john_doe",
            icon: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            platform: "Instagram",
            url: "https://instagram.com/john_doe",
            icon: "https://via.placeholder.com/150",
        },
        {
            id: 5,
            platform: "Facebook",
            url: "https://facebook.com/john_doe",
            icon: "https://via.placeholder.com/150",
        },
        {
            id: 6,
            platform: "YouTube",
            url: "https://youtube.com/john_doe",
            icon: "https://via.placeholder.com/150",
        },
        {
            id: 7,
            platform: "TikTok",
            url: "https://tiktok.com/john_doe",
            icon: "https://via.placeholder.com/150",
        },
    ],
}