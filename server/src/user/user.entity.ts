import { FilterableField, Relation } from "@nestjs-query/query-graphql";
import { ID, ObjectType,  } from "@nestjs/graphql";
import { PartEntity } from "src/part/part.entity";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

@ObjectType('User')
@Relation('parts', () => [PartEntity], {nullable: true})
@Entity('user')
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

    @OneToMany(type => PartEntity, part => part.user)
    parts?: PartEntity[];
}