import { isEmpty, isNil, merge } from 'lodash';
import { Injectable } from '@nestjs/common';

import { IQuery } from '../common/common.interface';

@Injectable()
export class QueryUtils {
  async getFilters(filterBy: string): Promise<any> {
    const queryFilters = { where: {} };

    if (!isEmpty(filterBy)) {
      const filters = filterBy.split(';');

      filters.forEach((filter) => {
        const [key, value] = filter.split(':');

        if (!isEmpty(key) && !isEmpty(value)) {
          Object.assign(queryFilters.where, { [key]: value });
        }
      });
    }

    return queryFilters;
  }

  removeFilter(filterBy: string, filter: string): string {
    const filtered = filterBy.replace(filter, '');
    if (filtered[0] === ';') {
      return filtered.substring(1);
    }
  }

  async getOrder(order: string): Promise<IQuery> {
    const queryOrder: IQuery = {};

    if (!isEmpty(order)) {
      const orders = order.split(';');

      Object.assign(queryOrder, {
        orderBy: orders.map((order) => {
          const [key, value] = order.split(':');

          if (!isEmpty(key) && !isEmpty(value)) {
            return [key, value];
          }
        }),
      });
    }

    return queryOrder;
  }

  async getPagination(page: number, pageSize: number): Promise<IQuery> {
    const queryCursor: IQuery = {};

    if (!isNil(page) && !isNil(pageSize)) {
      Object.assign(queryCursor, {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      });
    }

    return queryCursor;
  }

  async buildQuery(
    page: number,
    pageSize: number,
    filterBy: string,
    orderBy: string,
  ): Promise<IQuery> {
    return merge(
      {},
      await this.getFilters(filterBy),
      await this.getOrder(orderBy),
      await this.getPagination(page, pageSize),
    );
  }
}
