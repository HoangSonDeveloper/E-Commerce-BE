import { Injectable } from '@nestjs/common';
import { merge } from 'lodash';

@Injectable()
export class HelperUtils {
  async getPagination(
    endpoint: string,
    count: number,
    page: number,
    pageSize: number,
    filterBy: string,
    orderBy: string,
  ): Promise<any> {
    // Initialize the base URLs

    // Initialize next and prev URLs without filterBy and orderBy
    let next = null;
    let prev = null;

    // convert to number
    count = +count;
    page = +page;
    pageSize = +pageSize;

    // Check if there are more records on the next page
    if (page * pageSize < count) {
      next = `${endpoint}&page=${page + 1}&pageSize=${pageSize}`;

      if (filterBy) {
        next += `&filterBy=${filterBy}`;
      }

      if (orderBy) {
        next += `&orderBy=${orderBy}`;
      }
    } else if (page > 1) {
      prev = `${endpoint}&page=${page - 1}&pageSize=${pageSize}`;

      if (filterBy) {
        prev += `&filterBy=${filterBy}`;
      }

      if (orderBy) {
        prev += `&orderBy=${orderBy}`;
      }
    }

    return { next, prev };
  }
}
