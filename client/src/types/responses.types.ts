import { Post, ResponsePost } from './post.types';
import { ResponseUser } from './user.types';

type SortPost = 'title' | 'createdAt' | 'updatedAt' | 'viewsCount';

export interface PostQuery {
  tags?: string;
  page?: number;
  limit?: number;
  sort?: SortPost;
  order?: 'asc' | 'desc';
}

export interface ResponsePostsPagination {
  posts: ResponsePost[];
  currentPage: number;
  totalPages: number;
}

export interface ResponseAuth {
  accessToken: string;
  refreshToken: string;
  user: ResponseUser;
}

export interface ResponseProfile extends ResponseUser {
  createdPosts: Post[];
}