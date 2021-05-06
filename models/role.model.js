module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("roles",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    })
    return Roles
}