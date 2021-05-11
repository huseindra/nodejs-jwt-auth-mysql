const config = require("../config/config.db")
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,
        pool:{
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        port: 3307,
    }
)
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize)
db.post = require("../models/post.model")(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleID",
    otherKey: "userID"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userID",
    otherKey:"roleID"
})

db.ROLES = ["user", "admin", "moderator"];

db.user.hasMany(db.post, {
    as: "posts"
});
db.post.belongsTo(db.user, {
    foreignKey: "postID",
    as: "users"
});

module.exports  = db

