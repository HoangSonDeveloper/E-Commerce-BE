export interface Pagination<T> {
  data: T[];
  limit: number;
  pageNumber: number;
  next: string;
  previous: string;
}

export default function paginate<T>(
  documents: T[],
  limit: number,
  pageNumber: number,
  path: string,
  url: string
): Pagination<T> {
  return {
    data: documents,
    limit,
    pageNumber,
    next:
      documents.length < limit ? "" : `${url}${path}?page=${pageNumber + 1}`,
    previous: pageNumber > 1 ? `${url}${path}?page=${pageNumber - 1}` : "",
  };
}
