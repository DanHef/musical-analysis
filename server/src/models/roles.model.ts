// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from 'sequelize';
import { Application } from '../declarations';

export default function (app: Application) {
    const sequelizeClient: Sequelize = app.get('sequelizeClient');
    const roles = sequelizeClient.define('roles', {
        name: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        hooks: {
            beforeCount(options: any) {
                options.raw = true;
            }
        },
        timestamps: false
    });

    // eslint-disable-next-line no-unused-vars
    (roles as any).associate = function (models: any) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
        models.roles.hasMany(models.users, {as: 'role'});
    };

    return roles;
}
