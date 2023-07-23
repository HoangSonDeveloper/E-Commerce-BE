export interface IId {
  id: string;
}

export interface IQuery {
  select?: string[];
  where?: string;
  orderBy?: string[];
  limit?: number;
  before?: string;
  after?: string;
}

export interface ICount {
  count: number;
}

export interface CreateCommentInput {
  text: string;
  post: string;
}

export interface UpdateCommentInput {
  text?: string;
}

export interface CreatePostInput {
  title: string;
  body: string;
  published: boolean;
}

export interface UpdatePostInput {
  title?: string;
  body?: string;
  published?: boolean;
}

export interface SignupUserInput {
  name: string;
  email: EmailAddress;
  password: string;
}

export interface LoginUserInput {
  email: EmailAddress;
  password: string;
}

export interface UpdateProfileInput {
  name?: string;
  age?: UnsignedInt;
}

export interface UpdateEmailInput {
  email: EmailAddress;
  currentPassword: string;
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ISubscription {
  commentAdded(post: string): Comment | Promise<Comment>;
  postAdded(): Post | Promise<Post>;
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  post: Post;
  createdAt: DateTime;
  updatedAt: DateTime;
  version: number;
}

export interface CommentsConnection {
  edges: CommentEdge[];
  pageInfo: PageInfo;
}

export interface CommentEdge {
  node: Comment;
  cursor: string;
}

export interface CommentPayload {
  errors?: ErrorPayload[];
  comment?: Comment;
}

export interface DeleteCommentPayload {
  errors?: ErrorPayload[];
  count?: number;
}

export interface ErrorPayload {
  field?: string;
  message?: string[];
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  published: boolean;
  author: User;
  comments?: CommentsConnection;
  createdAt: DateTime;
  updatedAt: DateTime;
  version: number;
}

export interface PostsConnection {
  edges: PostEdge[];
  pageInfo: PageInfo;
}

export interface PostEdge {
  node: Post;
  cursor: string;
}

export interface PostPayload {
  errors?: ErrorPayload[];
  post?: Post;
}

export interface DeletePostPayload {
  errors?: ErrorPayload[];
  count?: number;
}

export interface User {
  id: string;
  name: string;
  email: EmailAddress;
  password: string;
  posts?: PostsConnection;
  comments?: CommentsConnection;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface UsersConnection {
  edges: UserEdge[];
  pageInfo: PageInfo;
}

export interface UserEdge {
  node: User;
  cursor: string;
}

export interface UserPayload {
  errors?: ErrorPayload[];
  user?: User;
}

export interface DeleteAccountPayload {
  errors?: ErrorPayload[];
  count?: number;
}

export type DateTime = any;
export type EmailAddress = any;
export type UnsignedInt = any;
export type JSONObject = any;
