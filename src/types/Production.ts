/**
 * Represents a production.
 */
export default interface IProduction {
  /**
   * The title of the production.
   */
  title: string;

  /**
   * The description of the production.
   */
  description: string;

  /**
   * The original source of the production.
   */
  video: string;
  /**
   * The order of the production.
   */
  order: number;
  alt: {
    title: string;
    description: string;
    video: string;
  };
}
