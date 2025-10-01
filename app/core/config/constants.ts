import { NavItemType } from "../types/navbar.type";

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    PROFILE: "/profile",
    PROJECTS: "/projects",
    GITHUB: "/github",
    SKILLS: "/skills",
    EXPERIENCE: "/experience",
    EDUCATION: "/education",
    CONTACT: "/contact",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
};

export const API_ENDPOINTS = {
  MONKEY_TYPE: {
    GET_RESULT: "/results",
  },
};

// Form Validation Constants
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
    REGEX:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    MESSAGE:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: "Please enter a valid email address",
  },
} as const;

export const NAV_ITEMS: NavItemType[] = [
  {
    title: "Home",
    url: ROUTES.PUBLIC.HOME,
    items: [
      {
        title: "Home",
        url: ROUTES.PUBLIC.HOME,
      },
    ],
  },
];

// Configuration constants
export const GITHUB_CONFIG = {
  GITHUB_USERNAME: process.env.PUBLIC_GITHUB_USERNAME,
  RATE_LIMIT: 100, // requests per hour
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 1 day 
  TIMEOUT: 10000, // 10 second timeout
  GRAPHQL_ENDPOINT: process.env.GITHUB_URL || "https://api.github.com/graphql",
};
