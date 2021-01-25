import { FilterableField, FilterableRelation, Relation } from "@nestjs-query/query-graphql";
import { ObjectType, ID, Field, InputType } from "@nestjs/graphql";
import { parseType } from "graphql";
import { AnalysisSessionEntity } from "src/analysis-session/analysis-session.entity";
import { TagEntity } from "src/tag/tag.entity";
import { UserEntity } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";

@ObjectType('Part')
//@Relation('user', () => UserEntity, {nullable: true})
@Relation('analysisSession', () => AnalysisSessionEntity, {nullable: true})
@Relation('tag', () => TagEntity, {nullable: true})
@FilterableRelation('user', () => UserEntity, {nullable: true, allowFiltering: true})
@InputType()
@Entity('part')
export class PartEntity {
    @FilterableField(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    started: Date;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    stopped: Date;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    description: string;

    @FilterableField()
    @Column({
        default: false
    })
    submitted: boolean;

    @ManyToOne(() => UserEntity, user => user.id, {nullable: true})
    @FilterableField()
    @JoinColumn({
        name: "userId",
    })
    @Field(type => UserEntity)
    user!: UserEntity;

    @ManyToOne(type => AnalysisSessionEntity)
    @JoinColumn()
    analysisSession: AnalysisSessionEntity;

    @ManyToOne(type => TagEntity)
    @JoinColumn({
        name: "tagId"
    })
    @Field(type => TagEntity)
    @FilterableField()
    tag: TagEntity;

}