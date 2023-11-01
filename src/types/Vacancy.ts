/**
 * Represents a vacancy object.
 */
export default interface IVacancy {
  /**
   * The ID of the vacancy.
   */
  id: number;

  /**
   * The title of the vacancy.
   */
  title: string;

  /**
   * The description of the vacancy.
   */
  description: string;

  /**
   * The content of the vacancy.
   */
  content: string;

  /**
   * The link to the image associated with the vacancy.
   */
  image: string;

  /**
   * The link to the video associated with the vacancy, or null if there is no video.
   */
  video: string | null;
}
