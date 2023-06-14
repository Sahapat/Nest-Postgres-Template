import 'reflect-metadata'
import { DataSource } from 'typeorm'
import environment from '@/configs/environment'

export default new DataSource({
  type: 'postgres',
  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.username,
  password: environment.database.password,
  database: environment.database.name,
  synchronize: environment.database.sync,
  logging: environment.database.log,
  cache: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
})
