"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            models.Comment.belongsTo(models.User, {
                foreignKey: "userId",
            });
            models.Comment.belongsTo(models.Post, {
                foreignKey: "postId",
            });
        }
    }
    Comment.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "User",
                    key: "id",
                },
            },
            postId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Post",
                    key: "id",
                },
            },
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Comment",
        }
    );
    return Comment;
};
