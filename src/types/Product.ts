export default interface IProduct {
  id: number;
  title: string;
  category: ICategory;
  content: string;
}

export const Category = ['exterior', 'interior'] as const;
export type ICategory = (typeof Category)[number];
