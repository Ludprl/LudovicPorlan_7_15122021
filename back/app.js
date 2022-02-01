const express = require("express");
const app = express();
const path = require("path");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(helmet());
app.use(cors());

app.use(express.json());

//gestion des images de façon statique
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
    "/images/avatars",
    express.static(path.join(__dirname, "imagesAvatars"))
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
