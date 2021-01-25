import { FilterableField, Relation } from "@nestjs-query/query-graphql";
import { ObjectType, ID, Field, InputType } from "@nestjs/graphql";
import { PartEntity } from "src/part/part.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";

@ObjectType('Tag')
@Entity('tag')
@Relation('parts', () => [PartEntity], {nullable: true})
@InputType()
export class TagEntity {
    @FilterableField(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    name: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    description: string;

}