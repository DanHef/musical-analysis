import { FilterableField } from "@nestjs-query/query-graphql";
import { ID, ObjectType,  } from "@nestjs/graphql";
import { Entity, Column, PrimaryColumn } from "typeorm";

@ObjectType('User')
@Entity()
export class UserEntity {
    @FilterableField(type => ID)
    @PrimaryColumn('uuid')
    id: number;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    username: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    lastname: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    firstname: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    email: string;
}