import { databaseProviders } from '@/modules/database/database.provider'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
