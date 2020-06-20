module.exports = (sequelize, type) => {
    return sequelize.define('part', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        started: type.DATE,
        stopped: type.DATE,
        username: type.STRING,
        analysisId: type.STRING,
        description: type.STRING,
        tagId: type.INTEGER,
        submitted: {
            type: type.BOOLEAN,
            defaultValue: false
        }
    });
};