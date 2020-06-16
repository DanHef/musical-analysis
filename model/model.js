const Sequelize = require('sequelize');
const AnalysisModel = require('./analysis.model');
const PartModel = require('./part.model');
const TagModel = require('./tag.model');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const AnalysisEntity = AnalysisModel(sequelize, Sequelize);
const PartEntity = PartModel(sequelize, Sequelize);
const TagEntity = TagModel(sequelize, Sequelize);

sequelize.sync();

module.exports = {
    AnalysisEntity,
    PartEntity,
    TagEntity
}