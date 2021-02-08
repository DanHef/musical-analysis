import { Module } from '@nestjs/common';

import { NestjsQueryGraphQLModule, PagingStrategies } from "@nestjs-query/query-graphql";
import { NestjsQueryTypeOrmModule } from "@nestjs-query/query-typeorm";
import { AnalysisSessionEntity } from './analysis-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([AnalysisSessionEntity]),
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([AnalysisSessionEntity])],
            resolvers: [{
                DTOClass: AnalysisSessionEntity,
                EntityClass: AnalysisSessionEntity,
                pagingStrategy: PagingStrategies.NONE,
            }],
        }),
    ],
    providers: [],
    exports: [],
    controllers: []
})
export class AnalysisSessionModule { }
