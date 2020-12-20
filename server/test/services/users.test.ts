import assert from 'assert';
import { Sequelize } from 'sequelize/types';
import app from '../../src/app';

describe('\'users\' service', () => {
    let usersService;
    let rolesService;

    before(async function() {
        const sequelizeClient: Sequelize = app.get('sequelizeClient');
        await sequelizeClient.sync({ force: true });

        usersService = app.service('users');
        rolesService = app.service('roles');

        await rolesService.create({
            "name": "admin",
            "permissions": "*"
        });
    });

  it('registered the service', () => {
    assert.ok(usersService, 'Registered the service');
  });

  it('creation of user', async function() {
    const newUser = await usersService.create({
        "email": "e@e.de",
        "password": "abcd",
        "roleName": "admin"
    });

    assert.ok(newUser, 'New user exists');
    assert.strictEqual(newUser.email, "e@e.de");
    assert.strictEqual(newUser.roleName, 'admin');

    return;
  });
});
