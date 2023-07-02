import { findPaginate } from '@/libs/functions/paginate.function'
import { Pagination } from '@/libs/types/paginate.type'
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Repository,
  UpdateResult,
} from 'typeorm'

export class CrudService<T extends object & { id?: number }> {
  constructor(private repository: Repository<T>) {}

  async findByID(id: number, relations: string[] = []): Promise<T | null> {
    const options: FindOneOptions = {
      where: {
        id: id,
      },
      relations,
    }
    return await this.repository.findOne(options)
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options)
  }

  async findAll<V extends object>(options?: V): Promise<T[]> {
    return await this.repository.find(options)
  }

  async findByIDs(ids: number[], relations: string[] = []) {
    const options: FindManyOptions = {
      where: {
        id: In(ids),
      },
      relations,
    }
    return await this.repository.find(options)
  }

  async findPaginate<V extends object>(options?: V): Promise<Pagination<T>> {
    return await findPaginate(this.repository, options)
  }

  async save(payload: T): Promise<T> {
    return await this.repository.save(payload)
  }

  async bulkCreate(payloads: T[]): Promise<T[]> {
    return await this.repository.save<T>(payloads)
  }

  async update(payload: T, update: Partial<T>): Promise<T> {
    return await this.repository.save({ ...payload, ...update })
  }

  async softDelete(
    options: number | FindOptionsWhere<T>,
  ): Promise<UpdateResult> {
    return await this.repository.softDelete(options)
  }
}
