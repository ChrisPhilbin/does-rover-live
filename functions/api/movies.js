require("dotenv").config();
const fetch = require("node-fetch");
const { db } = require("../util/admin");
const { theMovieDbApiKey } = require("../util/movie-db-config");
const { of, Observable } = require("rxjs");
const { switchMap, catchError } = require("rxjs/operators");
const { fromFetch } = require("rxjs/fetch");

exports.findOrCreateMovie = async (request, response) => {
  console.log(typeof request.params.movieId, "type of params");
  const moviesRef = await db.collection("movies");
  const moviesSnapshot = await moviesRef.where("movieId", "==", request.params.movieId).get();
  if (moviesSnapshot.empty) {
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
  //movieSnaoshot => returns a QuerySnapshot
  //movieSnapshot.forEach => provides access to each document... QueryDocumentSnapshot
  console.log(moviesSnapshot, "single query snapshot");
  moviesSnapshot.forEach((doc) => {
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
  const movieTitle = request.body.movieTitle.toLowerCase();
  if (movieTitle === "") {
    return response.status(400).json({ error: "Movie title cannot be blank." });
  }
  db.collection("searches")
    .where("movieTitle", "==", movieTitle)
    .limit(1)
    .get()
    .then((query) => {
      if (query.empty) {
        const newSearchTerm = {
          movieTitle: movieTitle,
          timesSearched: 1,
        };
        db.collection("searches").add(newSearchTerm);
      } else {
        const searchTerm = query.docs[0];
        let updatedSearchTerm = searchTerm.data();
        updatedSearchTerm.timesSearched += 1;
        searchTerm.ref.update(updatedSearchTerm);
      }
    });
  try {
    // const movieResponseData$ = new Observable((observer) => {
    //   fetch(
    //     `https://api.themoviedb.org/3/search/movie?api_key=${theMovieDbApiKey}&language=en-US&query=${movieTitle}&page=1&include_adult=false`
    //   )
    //     .then((response) => response.json())
    //     .then((responseData) => {
    //       observer.next(response.status(200).json(responseData));
    //       observer.complete();
    //     })
    //     .catch((error) =>
    //       observer.error(response.status(400).json({ error: "Could not connect to the movie database" }))
    //     );
    // });

    // movieResponseData$.subscribe((data) => {
    //   return data;
    // });

    let movieResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${theMovieDbApiKey}&language=en-US&query=${movieTitle}&page=1&include_adult=false`
    );
    let data = await movieResponse.json();
    if (movieResponse.ok) {
      let dogData = [];
      let moviesCollectionRef = db.collection("movies");
      const moviePromises = data.results.map(({ id }) => {
        return moviesCollectionRef.where("movieId", "==", id.toString()).limit(1).get();
      });
      Promise.all(moviePromises).then((allQuerySnapshots) => {
        allQuerySnapshots.forEach((singleQuerySnapshot) => {
          singleQuerySnapshot.forEach((doc) => {
            dogData.push(doc.data());
          });
        });
      });
      // return response.status(200).json(movies);
      // let promisesURL = [];
      // data.results.forEach((result) => {
      //   promisesURL.push(`https://us-central1-does-rover-live.cloudfunctions.net/api/movies/${result.id}`);
      // });
      // let dogData = await Promise.all(
      //   promisesURL.map(async (url) => {
      //     const response = await fetch(url, {
      //       method: "GET",
      //       mode: "no-cors",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     });
      //     const responseData = await response.json();
      //     return responseData;
      //   })
      // );
      console.log(dogData, "dog data collection");
      dogData.forEach((d) => {
        let movieIndex = data.results.findIndex((movie) => movie.id == parseInt(d.movieId));
        if (movieIndex !== -1) {
          data.results[movieIndex].dogLives = d.dogLives;
          data.results[movieIndex].dogDies = d.dogDies;
        }
      });
      console.log(data.results, "data results");
      return response.status(200).json(data.results);
    }
  } catch (error) {
    return response.status(400).json({ error: error });
  }
};

exports.trendingMovies = async (request, response) => {
  const searchesRef = await db.collection("searches");
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
