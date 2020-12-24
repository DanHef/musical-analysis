import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';


import { AnalysisSessionModule } from './analysis-session/analysis-session.module';
import { AnalysisSessionEntity } from './analysis-session/analysis-session.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          //host: configService.get('HOST'),
          //port: +configService.get<number>('PORT'),
          username: configService.get<string>('USERNAME'),
          password: configService.get<string>('PASSWORD'),
          database: configService.get<string>('DB'),
          entities: [AnalysisSessionEntity],
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
        }
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res })
    }),
    AnalysisSessionModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
