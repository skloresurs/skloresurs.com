export default interface IPost {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  content: string | null;
  video: string | null;
}
