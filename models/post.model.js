module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("posts",{
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    })
    return Posts
}