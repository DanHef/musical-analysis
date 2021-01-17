import { FilterableField, Relation } from "@nestjs-query/query-graphql";
import { ObjectType, ID } from "@nestjs/graphql";
import { PartEntity } from "src/part/part.entity";
import { TagEntity } from "src/tag/tag.entity";
import { UserEntity } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";

@ObjectType('AnalysisSession')
@Relation('moderator', () => UserEntity, {nullable: true})
@Relation('assignees', () => [UserEntity], {nullable: true})
@Relation('parts', () => [PartEntity], {nullable: true})
@Relation('tags', () => [TagEntity], {nullable: true})
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

    @ManyToMany(type => TagEntity)
    @JoinTable({
        name: "tag_name"
    })
    tags: TagEntity[];

    @OneToMany(type => PartEntity, (part) => part.analysisSession)
    parts;
}