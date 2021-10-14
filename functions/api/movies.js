const { db } = require("../util/admin");

exports.findOrCreateMovie = (request, response) => {
  console.log(request.params.movieId, "request params");
  db.doc(`/movies/${request.params.movieId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        const newMovie = {
          movieId: request.params.movieId,
          dogLives: 0,
          dogDies: 0,
        };

        db.collection("movies")
          .add(newMovie)
          .then((doc) => {
            let responseMovie = newMovie;
            responseMovie.id = doc.id;
            return response.status(200).json(responseMovie);
          })
          .catch((error) => {
            console.log(error);
            return response
              .status(500)
              .json({ error: "Something went wrong." });
          });
      }
      let movieData = doc.data();
      movieData.id = doc.id;
      return response.status(200).json(movieData);
    })
    .catch((error) => {
      console.log(error);
      return response.status(500).json({ error: "Something went wrong." });
    });
};
