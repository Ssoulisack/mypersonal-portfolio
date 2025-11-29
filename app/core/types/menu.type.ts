export interface MenuType {
  label: string;
  href?: string;
  tag?: string;
  description?: string;
  category?: Categories;
  dropdownItems?: DropdownMenuItem[];
}


export interface Categories {
    ID: number;
    label: string;
}

export interface DropdownMenuItem {
  label: string;
  href: string;
  description: string;
  image?: string;
  iconName?: string; // Icon identifier (e.g., 'Link2', 'BookHeart', 'CreditCard')
  type: 'image' | 'icon';
}