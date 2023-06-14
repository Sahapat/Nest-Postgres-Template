import mainDatasource from '@/modules/database/main.datasource'
import { Provider } from '@nestjs/common'

export const databaseProviders: Provider[] = [
  {
    provide: 'MAIN_DB',
    useFactory: async () => await mainDatasource.initialize(),
  },
]
