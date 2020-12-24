import { FilterableField } from "@nestjs-query/query-graphql";
import { ObjectType, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType('AnalysisSession')
@Entity()
export class AnalysisSessionEntity {
    @FilterableField(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @FilterableField()
    @Column()
    name: string;
}