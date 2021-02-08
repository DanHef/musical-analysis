import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream } from 'fs';

@Resolver()
export class FileResolver {

    constructor() {}

    @Mutation(() => Boolean, {nullable: true})
    async uploadFile(@Args({name: 'file', type: () => GraphQLUpload}) audioFile: FileUpload):
    Promise<Boolean | undefined>
    {
        if (audioFile.filename && audioFile.mimetype) {
            audioFile.createReadStream().pipe(createWriteStream(`./uploads/${audioFile.filename}`));
            return true;
        } else {
            return false;
        }
//        console.log('Hello file', audioFile)
//        return true;
    }
        //true;
}
