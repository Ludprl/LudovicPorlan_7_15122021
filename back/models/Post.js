"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            models.Post.belongsTo(models.User, {
                foreignKey: "userId",
            });
            models.Post.hasMany(models.Like, { onDelete: "cascade" });
            models.Post.hasMany(models.Comment, { onDelete: "cascade" });
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
            content: DataTypes.TEXT,
            imagePost: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    return Post;
};
