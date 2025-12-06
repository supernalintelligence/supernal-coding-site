import { CoverMedia, CoverImage } from '../mediaUtils';

export interface PostMetadata {
  title: string;
  date: string;
  description?: string;
  draft?: boolean;
  categories?: string[];
  author?: {
    name: string;
    title?: string;
    image?: string;
  };
  coverMedia?: CoverMedia | CoverMedia[];
  coverImage?: CoverImage;
  bullets?: string[];
  shareBlurbs?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  tags?: string[];
  render_as?: string;
  [key: string]: any;
}
