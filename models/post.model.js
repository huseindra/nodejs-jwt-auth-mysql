module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("posts",{
        title: {
            type: DataTypes.STRING
        },
        slug: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    })
    return Posts
}