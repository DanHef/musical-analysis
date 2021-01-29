import { FilterableField, Relation, FilterableRelation } from "@nestjs-query/query-graphql";
import { ID, InputType, ObjectType, Field} from "@nestjs/graphql";
import { AnalysisSessionEntity } from "src/analysis-session/analysis-session.entity";
import { PartEntity } from "src/part/part.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from "typeorm";

@ObjectType('User')
@FilterableRelation('parts', () => [PartEntity], {nullable: true})
//@FilterableRelation('parts', () => PartEntity, {nullable: true, allowFiltering: true})
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

    @OneToMany(type => PartEntity, part => part.user)
    //@Field(type => [PartEntity])
    @JoinTable()
    @Field(type => [PartEntity])
    parts?: PartEntity[];

}