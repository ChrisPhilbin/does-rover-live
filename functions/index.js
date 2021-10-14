const functions = require("firebase-functions");
const app = require("express")();

const { findOrCreateMovie } = require("./api/movies");

app.get("/movies/:movieId", findOrCreateMovie);

exports.api = functions.https.onRequest(app);
