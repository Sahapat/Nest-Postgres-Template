import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export default {
  app: {
    version: process.env.npm_package_version ?? '0.0.0',
    core: parseInt(process.env.APP_CORE ?? '1', 10),
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    log: process.env.DATABASE_LOG === 'true',
    sync: process.env.DATABASE_SYNC === 'true',
  },
}
