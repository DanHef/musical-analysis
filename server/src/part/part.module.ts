import { NestjsQueryGraphQLModule, PagingStrategies } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartEntity } from './part.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PartEntity]),
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([PartEntity])],
            resolvers: [{
                DTOClass: PartEntity,
                EntityClass: PartEntity,
                pagingStrategy: PagingStrategies.OFFSET,
            }],
        }),
    ]
})
export class PartModule {}
