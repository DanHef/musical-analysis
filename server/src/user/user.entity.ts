import { FilterableField, Relation, FilterableRelation } from "@nestjs-query/query-graphql";
import { ID, InputType, ObjectType, Field} from "@nestjs/graphql";
import { PartEntity } from "src/part/part.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@ObjectType('User')
//@Relation('parts', () => [PartEntity], {nullable: true})
@FilterableRelation('parts', () => PartEntity, {nullable: true, allowFiltering: true})
@InputType()
@Entity('user')
export class UserEntity {
    @FilterableField(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    username?: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    lastname: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    firstname: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    email: string;

    @OneToMany(type => PartEntity, part => part.user.username)
    //@Field(type => [PartEntity])
    parts?: PartEntity[];
}