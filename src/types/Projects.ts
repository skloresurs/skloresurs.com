/**
 * Represents a project.
 */
export default interface IProject {
  id: number; // The unique identifier of the project.
  title: string; // The title of the project.
  location: ILocation; // The location of the project.
  glass: string; // The type of glass used in the project.
  year: number; // The year the project was completed.
  images: string[]; // An array of image URLs for the project.
}

/**
 * Represents a location.
 */
export interface ILocation {
  id: number; // The unique identifier of the location.
  title: string; // The title of the location.
}

/**
 * Represents a glass category.
 */
export interface IGlassCategory {
  id: number; // The unique identifier of the glass category.
  title: string; // The title of the glass category.
}
