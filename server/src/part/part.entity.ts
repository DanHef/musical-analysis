import { FilterableField, Relation } from "@nestjs-query/query-graphql";
import { ObjectType, ID } from "@nestjs/graphql";
import { AnalysisSessionEntity } from "src/analysis-session/analysis-session.entity";
import { UserEntity } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";

@ObjectType('Part')
@Relation('user', () => UserEntity, {nullable: true})
@Relation('analysisSession', () => AnalysisSessionEntity, {nullable: true})
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

    @ManyToOne(type => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(type => AnalysisSessionEntity)
    @JoinColumn()
    analysisSession: AnalysisSessionEntity;

}