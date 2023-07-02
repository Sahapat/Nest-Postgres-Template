import { Pagination } from '@/libs/types/paginate.type'
import { Repository, SelectQueryBuilder } from 'typeorm'

export const findPaginate = async <T extends object>(
  repository: Repository<T>,
  options?: any,
): Promise<Pagination<T>> => {
  const limit = +options?.limit || 50
  let page, offset, skip

  if (options?.offset) {
    offset = options.offset
    skip = offset
  } else if (options?.page) {
    page = options.page
    skip = (page - 1) * limit
  } else {
    page = 1
    offset = 0
    skip = offset
  }

  if (limit) {
    options = { ...options, take: limit }
  }
  if (skip) {
    options = { ...options, skip }
  }

  const [data, total] = await repository.findAndCount(options)
  return {
    data: data,
    page: +page,
    limit: +limit,
    total: +total,
  }
}

export const queryBuilderPaginate = async <T extends object>(
  queryBuilder: SelectQueryBuilder<T>,
  options?: any,
): Promise<Pagination<T>> => {
  const limit = +options?.limit || 50
  let page, offset, skip

  if (options?.offset) {
    offset = options.offset
    skip = offset
  } else if (options?.page) {
    page = options.page
    skip = (page - 1) * limit
  } else {
    page = 1
    offset = 0
    skip = offset
  }

  queryBuilder.take(limit)
  queryBuilder.skip(skip)

  const [data, total] = await queryBuilder.getManyAndCount()
  return {
    data: data,
    page: +page,
    limit: +limit,
    total: +total,
  }
}
