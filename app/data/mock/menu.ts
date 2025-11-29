import { Categories, MenuType, DropdownMenuItem } from "@/app/core/types/menu.type";

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

// Dropdown menu items for "More" button
export const MoreDropdownItems: DropdownMenuItem[] = [
  {
    label: "Guestbook",
    href: "/guestbook",
    description: "Let me know you were here",
    image: "/images/nagi.jpeg", // You'll need to add this image
    type: "image",
  },
  {
    label: "Bucket List",
    href: "/bucket-list",
    description: "Things to do at least once in my life",
    image: "/images/nagi_chibi.jpeg", // You'll need to add this image
    type: "image",
  },
  {
    label: "Links",
    href: "/links",
    description: "All my links are here",
    iconName: "Link2",
    type: "icon",
  },
  {
    label: "Uses",
    href: "/uses",
    description: "A peek into my digital workspace",
    iconName: "BookHeart",
    type: "icon",
  },
  {
    label: "Attribution",
    href: "/attribution",
    description: "Journey to create this site",
    iconName: "CreditCard",
    type: "icon",
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
    href: "/works",
    tag: TagTypes.a,
  },
  {
    label: "Blog",
    href: "/blogs",
    tag: TagTypes.a,
  },
  {
    label: "More",
    href: "/more",
    tag: TagTypes.button,
    dropdownItems: MoreDropdownItems,
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
