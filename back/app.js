const express = require("express");
const db = require("./config/db");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");

require("dotenv").config();

// Fichier de configuration

// const userRoutes = require("./routes/user");
// const postRoutes = require('./routes/post');
// const commentRoutes = require('./routes/comment');

// cors
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     next();
// });

app.use(cors({ origin: "http://localhost:3003", credentials: true }));

/**
 * Middlewares > bodyParser /
 */
// Usage de helmet pour protéger le header
app.use(helmet());

// Parse du body des requetes en json
app.use(bodyParser.json());

/**
 * Routes
 */

// app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/api/user", userRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/comment', commentRoutes);

module.exports = app;
