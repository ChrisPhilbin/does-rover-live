const functions = require("firebase-functions");
const rateLimit = require("express-rate-limit");
const app = require("express")();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 10,
});

const { incrementVoteCount, searchMovies, trendingMovies } = require("./api/movies");

app.get("/movies/trending", trendingMovies);

app.put("/movies/:movieId", limiter, incrementVoteCount);

app.post("/movies/search", searchMovies);

exports.api = functions.https.onRequest(app);
