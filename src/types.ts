import { AxiosInstance } from 'axios';

export type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export interface User {
  id: string;
  order: number;
  isAdmin: boolean;
  username: string;
  fullname: string;
  createdAt: string;
  updatedAt: string;
  bio: string | null;
  avatar?: { image: Image } | null;
}

export interface AuthResData {
  token: string;
  user: User;
}

export interface BaseAuthData {
  authUrl: string;
  backendUrl: string;
  user?: User | null;
  token?: string;
}

export interface ClientAuthData extends BaseAuthData {
  authAxios: AxiosInstance;
}

export interface ServerAuthData extends BaseAuthData {
  authFetch: <T>(pathname: string, init?: RequestInit) => Promise<T>;
}

export interface Image {
  id: string;
  owner: User;
  alt: string;
  src: string;
  xPos: number;
  yPos: number;
  info: string;
  size: number;
  order: number;
  scale: number;
  width: number;
  height: number;
  ownerId: string;
  mimetype: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  postId: string;
}

export interface Comment {
  id: string;
  order: number;
  author: User;
  postId: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  order: number;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  comments: Comment[];
  tags: Tag[];
  author: User;
  image: Image | null;
  _count: { comments: number; votes: number };
}
