export default interface IProject {
  id: number;
  title: string;
  location: ILocation;
  glass: string;
  year: number;
  images: string[];
}
export interface ILocation {
  id: number;
  title: string;
}
export interface IGlassCategory {
  id: number;
  title: string;
}
