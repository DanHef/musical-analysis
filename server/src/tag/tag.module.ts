import { NestjsQueryGraphQLModule, PagingStrategies } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TagEntity]),
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([TagEntity])],
            resolvers: [{
                DTOClass: TagEntity,
                EntityClass: TagEntity,
                pagingStrategy: PagingStrategies.OFFSET,
            }],
        }),
    ]
})
export class TagModule {}
