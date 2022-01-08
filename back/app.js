const express = require("express");
require("sequelize");
require("dotenv").config();
const db = require("./config/config.js");
const helmet = require("helmet");
const path = require("path");

// const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user.routes");
// const profileRoutes = require("./routes/profile");
// const commentRoutes = require("./routes/comment");
// const likeRoutes = require("./routes/like");

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, params, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));

// app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/comment", commentRoutes);
// app.use("/api/like/", likeRoutes);

module.exports = app;
