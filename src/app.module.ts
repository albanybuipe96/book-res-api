import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { COOKIE_SESSION_SECRET, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './constants/config.constants'
import { User } from './users/entities/user.entity'
import { BooksModule } from './books/books.module'
import { Book } from './books/entities/book.entity'
import { ReviewsModule } from './reviews/reviews.module'
import { Review } from './reviews/entities/review.entity'
import { LessonsModule } from './lessons/lessons.module';
import { Lesson } from './lessons/entities/lesson.entity'
import { LoggerModule } from 'nestjs-pino'
const cookieSession = require('cookie-session')
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as winston from 'winston';


@Module({
  imports: [
    UsersModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        // other transports...
      ],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          }
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>(DB_HOST),
          port: config.get<number>(DB_PORT),
          username: config.get<string>(DB_USERNAME),
          password: config.get<string>(DB_PASSWORD),
          database: config.get<string>(DB_NAME),
          entities: [User, Book, Review, Lesson],
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
        }
      }
    }),
    BooksModule,
    ReviewsModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: [this.configService.get(COOKIE_SESSION_SECRET)]
    })).forRoutes('*')
  }
}
