export interface ITag {
  id: number;
  title: string;
  color: string;
}
export default interface IPost {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  content: string | null;
  video: string | null;
  tags: ITag[];
}
