import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [UserResolver, UserService],
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([UserEntity]),
        NestjsQueryTypeOrmModule.forFeature([UserEntity])
    ]
})
export class UserModule {}
