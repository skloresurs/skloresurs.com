export default interface IComponent {
  id: string;
  title: string;
  category?: ICategory;
  manufacturer?: IManufacturer;
  url: string;
  image: string;
}
export interface ICategory {
  id: number;
  title: string;
}

export interface IManufacturer {
  id: number;
  title: string;
  url?: string;
}
