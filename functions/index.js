const functions = require("firebase-functions");
const app = require("express")();

const { findOrCreateMovie, incrementVoteCount } = require("./api/movies");

app.get("/movies/:movieId", findOrCreateMovie);

app.put("/movies/:movieId", incrementVoteCount);

exports.api = functions.https.onRequest(app);
