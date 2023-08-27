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

export const enum ROLES {
  STUDENT = 1,
  INSTRUCTOR = 2,
  ADMIN = 3,
}
