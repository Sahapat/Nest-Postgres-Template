import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from '@/app.module'
import environment from '@/configs/environment'
import { ClusterManager } from '@/cluster'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  app.use(bodyParser.json({ limit: '25mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))

  const documentSwagger = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Application Name')
      .setVersion(environment.app.version)
      .addBearerAuth()
      .build(),
  )
  SwaggerModule.setup('docs', app, documentSwagger)

  await app.listen(environment.app.port)
}

if (environment.app.core > 1) {
  ClusterManager.register(environment.app.core, bootstrap)
} else {
  bootstrap()
}
