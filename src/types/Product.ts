/**
 * Represents a product.
 */
export default interface IProduct {
  id: number; // The unique identifier of the product.
  title: string; // The title of the product.
  category: ICategory; // The category of the product.
  content: string; // The content of the product.
}

/**
 * Represents the available categories for a product.
 */
export const Category = ['exterior', 'interior'] as const;
export type ICategory = (typeof Category)[number];
