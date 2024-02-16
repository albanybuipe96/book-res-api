import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  app.useLogger(app.get(Logger))
  console.log('PORT', configService.get<string>('PORT'))
  await app.listen(configService.get<string>('PORT') || 3000)
}
bootstrap()
