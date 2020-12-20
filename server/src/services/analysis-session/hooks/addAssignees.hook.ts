import { Hook,HookContext } from '@feathersjs/feathers';
import { Sequelize } from 'sequelize/types';

export default (options = {}): Hook => {
    return async (context: HookContext) => {
        if (context.params.query) {
            const { include, ...query } = context.params.query;

            if (include) {
                const associatedUserModel = context.app.services.users.Model;
                let includeSequelize = [];

                if(include.includes('assignees')) {
                    includeSequelize.push({ model: associatedUserModel, as: 'assignees'});
                }

                if(include.includes('moderator')) {
                    includeSequelize.push({ model: associatedUserModel, as: 'moderator'});
                }

                context.params.sequelize = {
                    include: includeSequelize,
                    raw: true,
                    nest: true
                };

                // Update the query to not include `include`
                context.params.query = query;
            }

            return context;
        }
    }
}