module.exports = (sequelize, type) => {
    return sequelize.define('analysisUser', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        analysisId: {
            type: type.STRING
        },
        username: type.STRING,
        status: type.INTEGER
    });
};