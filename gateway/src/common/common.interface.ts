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

export interface CreateCourseInput {
  id: string;
  name: string;
  shortDescription?: string;
  description?: string;
  outcome?: string;
  level?: string;
  price?: number;
  thumbnail?: string;
  isPublished?: boolean;
  format?: string;
  categories: number[];
  instructors: string[];
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
  postAdded(): Course | Promise<Course>;
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  post: Course;
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

export interface Course {
  id: string;
  name: string;
  shortDescription?: string;
  description?: string;
  outcome?: string;
  level?: string;
  price?: number;
  thumbnail?: string;
  isPublished?: boolean;
  formatType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Enrollment {
  id: string;
  classId: string;
  studentId: string;
  enrollmentDate: Date;
  cancelled: boolean;
  cancelReason: string;
}

export interface EnrollmentInputDto {
  classId: string;
  studentId: string[];
}

export interface PostsConnection {
  edges: PostEdge[];
  pageInfo: PageInfo;
}

export interface PostEdge {
  node: Course;
  cursor: string;
}

export interface PostPayload {
  errors?: ErrorPayload[];
  post?: Course;
}

export interface DeletePostPayload {
  errors?: ErrorPayload[];
  count?: number;
}

export interface User {
  id: string;
  email: EmailAddress;
  password: string;
  isVerified: boolean;
  biography?: string;
  birthday?: string;
  name?: string;
  avatar?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRole {
  userId: string;
  roleId: number;
  roleName: string;
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

export const enum ROLES {
  STUDENT = 1,
  INSTRUCTOR = 2,
  ADMIN = 3,
}
