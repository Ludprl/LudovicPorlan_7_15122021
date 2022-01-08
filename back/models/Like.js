"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            models.Like.belongsTo(models.User, {
                foreignKey: "userId",
            });
            models.Like.belongsTo(models.Post, {
                foreignKey: "postId",
            });
        }
    }
    Like.init(
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
        },
        {
            sequelize,
            modelName: "Like",
        }
    );
    return Like;
};
