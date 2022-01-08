"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            models.Post.belongsTo(models.User, {
                foreignKey: "userId",
            });
            models.Post.hasMany(models.Like);
            models.Post.hasMany(models.Comment);
        }
    }
    Post.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "User",
                    key: "id",
                },
            },
            content: DataTypes.STRING,
            imagePost: DataTypes.STRING,
            likes: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    return Post;
};
