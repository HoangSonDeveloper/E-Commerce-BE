export interface QueryResultBase {}

export interface QueryResultRow {
  [column: string]: any;
}

export interface QueryResult<R extends QueryResultRow = QueryResultRow>
  extends QueryResultBase {
  rows: R[];
}

export interface MongoDBConfig {
  url: string | undefined;
  port: number | undefined;
}
