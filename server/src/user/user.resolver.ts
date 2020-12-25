import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver, PagingStrategies } from '@nestjs-query/query-graphql';
import { Args, ID, Mutation, Resolver, GraphQLExecutionContext, Context } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => UserEntity)
export class UserResolver extends CRUDResolver(UserEntity, {
    pagingStrategy: PagingStrategies.OFFSET,
}) {
  constructor(@InjectQueryService(UserEntity) readonly service: QueryService<UserEntity>,
                private readonly userService: UserService) {
    super(service);
  }

  @Mutation(returns => [UserEntity])
  syncUsers(@Args({ name: 'id', type: () => ID }) postId: number, @Context() context: GraphQLExecutionContext): Promise<UserEntity[]> {
    // call the original queryMany method with the new query
    return new Promise((resolve, reject) => {
        const header = context["req"].header('Authorization');

        if (!header) {
            throw new HttpException('Authorization: Bearer <token> header missing', HttpStatus.UNAUTHORIZED);
        }

        const parts = header.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new HttpException('Authorization: Bearer <token> header invalid', HttpStatus.UNAUTHORIZED);
        }

        const token = parts[1];
        this.userService.updateAccessToken(token);

        this.userService.getUsers().then(async (users) => {
            const dbUsers = await this.service.query({});

            for(let user of users) {
                const existingUser = dbUsers.filter((dbUser) => {
                    return user.id === dbUser.id;
                });

                if(existingUser.length === 0) {
                    //user does not exist yet => create it
                    await this.service.createOne(user);
                } else {
                    //update user
                    const {id, ...userWithoutId} = user;
                    await this.service.updateOne(user.id, userWithoutId);
                }
            }
            resolve(users);
        });
    });
  }
}