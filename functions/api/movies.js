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
      const movie = query.docs[0];
      let tmp = movie.data();
      request.body.vote
        ? //true === rover lives!
          //false === rover dies!
          (tmp.dogLives = tmp.dogLives + 1)
        : (tmp.dogDies = tmp.dogDies + 1);
      movie.ref.update(tmp);
    });
  return response.status(200).json({ message: "Updated movie." });
};
//save document back to DB and send response with updated counts
