require("dotenv").config();
const fetch = require("node-fetch");
const { db } = require("../util/admin");
const { theMovieDbApiKey } = require("../util/movie-db-config");
const { Observable } = require("rxjs");

exports.incrementVoteCount = async (request, response) => {
  if (typeof request.body.vote !== "boolean") {
    return response.status(400).json({ message: "Must contain valid vote." });
  }

  const moviesRef = db.collection("movies");
  const moviesQuerySnapshot = await moviesRef.where("movieId", "==", request.params.movieId).limit(1).get();
  if (moviesQuerySnapshot.empty) {
    return response.status(400).json({ error: "Movie not found." });
  }
  const movie = moviesQuerySnapshot.docs[0];
  let updatedMovie = movie.data();
  request.body.vote
    ? (updatedMovie.dogLives = updatedMovie.dogLives + 1)
    : (updatedMovie.dogDies = updatedMovie.dogDies + 1);
  movie.ref.update(updatedMovie);
  return response.status(200).json(updatedMovie);
};

exports.searchMovies = async (request, response) => {
  const movieTitle = request.body.movieTitle.toLowerCase();
  if (movieTitle === "") {
    return response.status(400).json({ error: "Movie title cannot be blank." });
  }
  const searchRef = db.collection("searches");
  const searchQuerySnapshot = await searchRef.where("movieTitle", "==", movieTitle).limit(1).get();
  if (searchQuerySnapshot.empty) {
    const newSearchTerm = {
      movieTitle: movieTitle,
      timesSearched: 1,
    };
    searchRef.add(newSearchTerm);
    console.log("Added new search term", newSearchTerm);
  } else {
    const searchTerm = searchQuerySnapshot.docs[0];
    const updatedSearchTerm = searchTerm.data();
    updatedSearchTerm.timesSearched += 1;
    searchTerm.ref.update(updatedSearchTerm);
    console.log("Finished incrementing search count");
  }

  const movieResponseData$ = new Observable((observer) => {
    const getMovieData = async () => {
      try {
        const movieDatabaseResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${theMovieDbApiKey}&language=en-US&query=${movieTitle}&page=1&include_adult=false`
        );
        const response = await movieDatabaseResponse.json();
        observer.next(response);
        observer.complete();
      } catch (error) {
        console.log(error);
        observer.error(response.status(400).json({ error: "Could not connect to the movie database" }));
      }
    };
    getMovieData();
  }).subscribe((data) => {
    let dogData = [];
    let moviesCollectionRef = db.collection("movies");
    const moviePromises = data.results.map(({ id }) => {
      return moviesCollectionRef
        .where("movieId", "==", id.toString())
        .limit(1)
        .get()
        .then((movieQuerySnapshot) => {
          if (movieQuerySnapshot.empty) {
            const newMovie = {
              movieId: id,
              dogLives: 0,
              dogDies: 0,
            };

            return db
              .collection("movies")
              .add(newMovie)
              .then((doc) => {
                const responseMovie = newMovie;
                responseMovie.id = doc.id;
                return responseMovie;
              });
          } else {
            return movieQuerySnapshot.docs[0].data();
          }
        });
    });
    Promise.all(moviePromises).then((allQuerySnapshots) => {
      allQuerySnapshots.forEach((movieDocumentSnapshot) => {
        dogData.push(movieDocumentSnapshot);
      });
      dogData.forEach((d) => {
        let movieIndex = data.results.findIndex((movie) => movie.id == parseInt(d.movieId));
        if (movieIndex !== -1) {
          data.results[movieIndex].dogLives = d.dogLives;
          data.results[movieIndex].dogDies = d.dogDies;
        }
      });
      return response.status(200).json(data.results);
    });
  });
};

exports.trendingMovies = async (request, response) => {
  const searchesRef = db.collection("searches");
  const trendingSnapshot = await searchesRef.orderBy("timesSearched", "desc").limit(5).get();

  if (trendingSnapshot.empty) {
    return response.status(400).json({ error: "Something went wrong." });
  }

  let trendingTitles = [];

  trendingSnapshot.forEach(async (doc) => {
    trendingTitles.push(doc.data());
  });

  return response.status(200).json(trendingTitles);
};
