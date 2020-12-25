import { FilterableField, Relation } from "@nestjs-query/query-graphql";
import { ObjectType, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";

@ObjectType('Tag')
@Entity('tag')
export class TagEntity {
    @FilterableField(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    description: string;
}