import { Categories, MenuType } from "@/app/core/types/menu.type";

export const TagTypes = {
  button: "button",
  a: "a",
};

export const CATEGORIES: Categories[] = [
  {
    ID: 1,
    label: "Navigation",
  },
  {
    ID: 2,
    label: "Account",
  },
  {
    ID: 3,
    label: "Resources",
  },
  {
    ID: 4,
    label: "Social",
  },
];

export const MenuItems: MenuType[] = [
  {
    label: "Home",
    href: "/",
    tag: TagTypes.a,
  },
  {
    label: "About",
    href: "/about",
    tag: TagTypes.a,
  },
  {
    label: "Work",
    href: "/work",
    tag: TagTypes.a,
  },
  {
    label: "Blog",
    href: "/blog",
    tag: TagTypes.a,
  },
  {
    label: "More",
    href: "/more",
    tag: TagTypes.button,
  },
  {
    label: "Book a Call",
    href: "/book-a-call",
    tag: TagTypes.button,
  },
];

export const FinderItems: MenuType[] = [
  {
    label: "Home",
    href: "/",
    tag: TagTypes.a,
    description: "Welcome to my forever work-in-progress",
    category: CATEGORIES[0],
  },
  {
    label: "Projects",
    href: "/projects",
    tag: TagTypes.a,
    description: "Showcase of my projects",
    category: CATEGORIES[0],
  },
  {
    label: "Blog",
    href: "/blog",
    tag: TagTypes.a,
    description: "Thoughts, metal models and tutorials",
    category: CATEGORIES[0],
  },
  {
    label: "Guestbook",
    href: "/guestbook",
    tag: TagTypes.a,
    description: "Leave a message for me",
    category: CATEGORIES[0],
  },
  {
    label: "About",
    href: "/about",
    tag: TagTypes.a,
    description: "Learn more about me!",
    category: CATEGORIES[0],
  },
  {
    label: "Bucket List",
    href: "/bucket-list",
    tag: TagTypes.a,
    description: "Things to do at least once in my life",
    category: CATEGORIES[0],
  },
  {
    label: "Book a Call",
    href: "/book-a-call",
    tag: TagTypes.button,
    description: "Book a call with me",
    category: CATEGORIES[0],
  },
  {
    label: "GitHub",
    href: "https://github.com/yourusername",
    tag: TagTypes.a,
    description: "View my GitHub profile",
    category: CATEGORIES[3],
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yourusername",
    tag: TagTypes.a,
    description: "View my LinkedIn profile",
    category: CATEGORIES[3],
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yourusername",
    tag: TagTypes.a,
    description: "View my Instagram profile",
    category: CATEGORIES[3],
  },
  //Resource
  {
    label: "Resume",
    href: "/resume",
    tag: TagTypes.a,
    description: "View my resume",
    category: CATEGORIES[2],
  },
  //Account
  {
    label: "Sign in",
    href: "/sign-in",
    tag: TagTypes.button,
    description: "Sign in to your account",
    category: CATEGORIES[1],
  },
];
