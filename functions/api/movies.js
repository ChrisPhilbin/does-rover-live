require("dotenv").config();
const fetch = require("node-fetch");
const { db } = require("../util/admin");

exports.findOrCreateMovie = async (request, response) => {
  const moviesRef = await db.collection("movies");
  const snapshot = await moviesRef
    .where("movieId", "==", request.params.movieId)
    .get();
  if (snapshot.empty) {
    const newMovie = {
      movieId: request.params.movieId,
      dogLives: 0,
      dogDies: 0,
    };

    db.collection("movies")
      .add(newMovie)
      .then((doc) => {
        const responseMovie = newMovie;
        responseMovie.id = doc.id;
        return response.status(200).json(responseMovie);
      });
  }
  snapshot.forEach((doc) => {
    let movieData = doc.data();
    return response.status(200).json(movieData);
  });
};

exports.incrementVoteCount = async (request, response) => {
  if (typeof request.body.vote !== "boolean") {
    //prevent put requests being made without a vote
    return response.status(400).json({ message: "Must contain valid vote." });
  }
  db.collection("movies")
    .where("movieId", "==", request.params.movieId)
    .limit(1)
    .get()
    .then((query) => {
      if (query.empty) {
        return response.status(400).json({ error: "Movie not found." });
      }
      const movie = query.docs[0];
      let updatedMovie = movie.data();
      request.body.vote
        ? //true === rover lives!
          //false === rover dies!
          (updatedMovie.dogLives = updatedMovie.dogLives + 1)
        : (updatedMovie.dogDies = updatedMovie.dogDies + 1);
      movie.ref.update(updatedMovie);
      return response.status(200).json(updatedMovie);
    });
};

exports.searchMovies = async (request, response) => {
  if (request.body.movieTitle === "") {
    return response.status(400).json({ error: "Movie title cannot be blank." });
  }
  try {
    let movieResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_MOVIE_API}&language=en-US&query=${request.body.movieTitle}&page=1&include_adult=false`
    );
    let data = await movieResponse.json();
    if (movieResponse.ok) {
      let promisesURL = [];
      data.results.forEach((result) => {
        promisesURL.push(
          `https://us-central1-does-rover-live.cloudfunctions.net/api/movies/${result.id}`
        );
      });
      let dogData = await Promise.all(
        promisesURL.map(async (url) => {
          const response = await fetch(url, {
            method: "GET",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const responseData = await response.json();
          return responseData;
        })
      );
      dogData.forEach((d) => {
        let movieIndex = data.results.findIndex(
          (movie) => movie.id == parseInt(d.movieId)
        );
        if (movieIndex !== -1) {
          data.results[movieIndex].dogLives = d.dogLives;
          data.results[movieIndex].dogDies = d.dogDies;
        }
      });
      return response.status(200).json(data.results);
    }
  } catch (error) {
    return response.status(400).json({ error: error });
  }
};
