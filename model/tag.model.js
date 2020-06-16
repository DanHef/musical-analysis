module.exports = (sequelize, type) => {
    return sequelize.define('tag', {
        id: {
            type: type.INTEGER, 
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        description: type.STRING
    });
};