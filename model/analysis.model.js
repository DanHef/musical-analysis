module.exports = (sequelize, type) => {
    return sequelize.define('analysis', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: type.STRING
        },
        started: type.DATE,
        stopped: type.DATE,
    });
};