/**
 * Represents a tag.
 */
export interface ITag {
  id: number; // The ID of the tag
  title: string; // The title of the tag
  color: string; // The color of the tag
}

/**
 * Represents a post.
 */
export default interface IPost {
  id: number; // The ID of the post
  title: string; // The title of the post
  description: string; // The description of the post
  category: string; // The category of the post
  image: string; // The image URL of the post
  content: string | null; // The content of the post, can be null
  video: string | null; // The video URL of the post, can be null
  tags: ITag[]; // The tags associated with the post
}
