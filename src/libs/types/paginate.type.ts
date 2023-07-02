export type Sort = 'DESC' | 'ASC'

export type OrderBy<T extends object> = {
  [K in keyof T]?: Sort
}

export type PaginateOptions<T extends object> = {
  skip?: number
  limit?: number
  sort?: OrderBy<T>
}

export type Pagination<T extends object> = {
  data: T[]
  page: number
  limit: number
  total: number
}
