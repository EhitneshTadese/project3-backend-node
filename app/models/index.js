const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Use consistent naming, "resume" singular form
//db.resume = require("./user.model.js")(sequelize, Sequelize);
//db.resume = require("./resume.model.js")(sequelize, Sequelize);
//db.resume = require("./education.model.js")(sequelize, Sequelize);
//db.resume = require("./experience.model.js")(sequelize, Sequelize);
//db.resume = require("./skill.model.js")(sequelize, Sequelize);
//db.resume = require("./projects.model.js")(sequelize, Sequelize);
//db.resume = require("./awards.model.js")(sequelize, Sequelize);

module.exports = db;


