import * as authentication from '@feathersjs/authentication';
import { Hook, HookContext } from '@feathersjs/feathers';
import addAssignees from './hooks/includeAssignees.hook';
import { discard } from 'feathers-hooks-common';
import { Sequelize } from 'sequelize/types';

const checkPermissions = require('feathers-permissions');
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [authenticate('jwt'),
        checkPermissions({
            roles: ['analysis-session'],
            field: 'role.permissions'
        }),
        addAssignees()
        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [
            discard('moderator.password'),
            discard('assignees.password'),
            discard('moderator.googleId'),
            discard('assignees.googleId'),
            discard('moderator.facebookId'),
            discard('assignees.facebookId'),
            discard('moderator.twitterId'),
            discard('assignees.twitterId'),
            discard('moderator.roleName'),
            discard('assignees.roleName'),
        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [async (context: HookContext) => {
            const assignees = context.data.assignees;
            if (assignees && assignees.length) {
                const analysisSessionId = context.result.id;

                const sequelizeClient: Sequelize = context.app.get('sequelizeClient');

                const temp = await sequelizeClient.model("analysis_sessions").findByPk(analysisSessionId);
                console.log(temp);
            }
            return context;
        }],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
