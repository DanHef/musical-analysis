import * as authentication from '@feathersjs/authentication';
import { Hook } from '@feathersjs/feathers';
import addAssignees from './hooks/addAssignees.hook';
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
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
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
