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
  const document = db.collection("movies").doc(`${request.params.movieId}`);
  console.log(document);
};
