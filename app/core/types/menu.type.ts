export interface MenuType {
  label: string;
  href?: string;
  tag?: string;
  description?: string;
  category?: Categories;
}


export interface Categories {
    ID: number;
    label: string;
}