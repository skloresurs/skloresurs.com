export default interface IComponent {
  id: string;
  title: string;
  description: string;
  category: ICategory;
  href: string;
  image: string;
}

export interface ICategory {
  id: number;
  title: string;
}
