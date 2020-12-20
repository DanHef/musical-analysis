import assert from 'assert';
import { Sequelize } from 'sequelize/types';
import app from '../../src/app';

describe('\'analysis-session\' service', () => {
    let usersService;
    let rolesService;
    let analysisSessionService;

    before(async function () {
        //cleanup sequelize test DB
        const sequelizeClient: Sequelize = app.get('sequelizeClient');
        await sequelizeClient.sync({ force: true });

        //initialize DB model through services
        usersService = app.service('users');
        rolesService = app.service('roles');
        analysisSessionService = app.service('analysis-sessions');

        //create basic roles for authorization tests
        await rolesService.create({
            "name": "admin",
            "permissions": "*"
        });

        await rolesService.create({
            "name": "moderator",
            "permissions": "analysis-session:*"
        });

        await rolesService.create({
            "name": "student",
            "permissions": "analysis-session:find"
        });
    });

    it('registered the service', () => {
        assert.ok(analysisSessionService, 'Registered the service');
    });

    it('create analysis session', async () => {
        const newSession = await analysisSessionService.create({
            "id": 1,
            "started": null,
            "stopped": null
        });

        assert.ok(newSession, 'New session created');
        assert.strictEqual(newSession.id, 1);
        assert.strictEqual(newSession.started,null);
        assert.strictEqual(newSession.stopped,null);
        
        return;
    });

    it('assign students to analysis session', async() => {
        //create new student
        const studentUser = await usersService.create({
            "email": "student@test.de",
            "password": "Test1234",
            "roleName": "student"
        });

        //create new session
        const newSession = await analysisSessionService.create({
            "id": 1,
            "started": null,
            "stopped": null
        });

        //assign student to session
        analysisSessionService.find()
    });
});
