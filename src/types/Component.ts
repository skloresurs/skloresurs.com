/**
 * Represents a component.
 */
export default interface IComponent {
  /**
   * The ID of the component.
   */
  id: string;

  /**
   * The title of the component.
   */
  title: string;

  /**
   * The description of the component.
   */
  description: string;

  /**
   * The category of the component.
   */
  category: ICategory;

  /**
   * The href of the component.
   */
  href: string;

  /**
   * The image of the component.
   */
  image: string;
}

/**
 * Represents a category.
 */
export interface ICategory {
  /**
   * The ID of the category.
   */
  id: number;

  /**
   * The title of the category.
   */
  title: string;
}
