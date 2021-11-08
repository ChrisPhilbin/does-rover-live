const functions = require("firebase-functions");
const app = require("express")();

const {
  findOrCreateMovie,
  incrementVoteCount,
  searchMovies,
  trendingMovies,
} = require("./api/movies");

app.get("/movies/trending", trendingMovies);

app.get("/movies/:movieId", findOrCreateMovie);

app.put("/movies/:movieId", incrementVoteCount);

app.post("/movies/search", searchMovies);

exports.api = functions.https.onRequest(app);
