/**
 * Represents a partner entity.
 */
export default interface IPartner {
  /**
   * The unique identifier of the partner.
   */
  id: string;

  /**
   * The title of the partner.
   */
  title: string;

  /**
   * The URL to the partner's logo.
   */
  url: string;

  /**
   * The width of the partner's logo.
   */
  width: number;

  /**
   * The height of the partner's logo.
   */
  height: number;
}
