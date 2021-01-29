import { FilterableField, FilterableRelation, Relation } from "@nestjs-query/query-graphql";
import { ObjectType, ID } from "@nestjs/graphql";
import { PartEntity } from "src/part/part.entity";
import { TagEntity } from "src/tag/tag.entity";
import { UserEntity } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";

@ObjectType('AnalysisSession')
@FilterableRelation('moderator', () => UserEntity, {nullable: true})
@FilterableRelation('assignees', () => [UserEntity], {nullable: true})
@FilterableRelation('parts', () => [PartEntity], {nullable: true, allowFiltering: true})
@FilterableRelation('tags', () => [TagEntity], {nullable: true, allowFiltering: true})
@FilterableRelation('parts', () => [PartEntity], {nullable: true, allowFiltering: true})

@Entity('analysis_session')
export class AnalysisSessionEntity {
    @FilterableField(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @FilterableField()
    @Column()
    name: string;

    @ManyToOne(type => UserEntity)
    @JoinColumn()
    moderator: UserEntity;

    @ManyToMany(type => UserEntity)
    @JoinTable({
        name: "session_assignee"
    })
    assignees: UserEntity[];

    @FilterableField({nullable: true})
    @Column({nullable: true})
    started: Date;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    stopped: Date;

    //@FilterableField()
    @ManyToMany(type => TagEntity, tag => tag.name)
    @JoinTable({
        name: "tag_id",
    })
    tags: TagEntity[];

    //@FilterableField()
    @OneToMany(() => PartEntity, part => part.analysisSession)
    @JoinTable()
    parts: PartEntity[];

}