import { DatabaseName } from '@/constants/enums/database.enum'
import mainDatasource from '@/modules/database/main.datasource'
import { Provider } from '@nestjs/common'

export const databaseProviders: Provider[] = [
  {
    provide: DatabaseName.MAIN,
    useFactory: async () => await mainDatasource.initialize(),
  },
]
