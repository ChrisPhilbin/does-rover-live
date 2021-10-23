import { createStore } from "vuex";

export default createStore({
  state: {
    loadingMovies: false,
    movieDetails: {},
    loadedMovies: false,
    movieTitles: [],
    movieTitle: "",
    errors: true,
  },
  mutations: {
    loadingMovies: (state) => {
      state.loadingMovies = !state.loadingMovies;
    },
    setLoadedMovies: (state) => {
      state.loadedMovies = !state.loadedMovies;
    },
    setMovies: (state, movies) => {
      state.movieTitles = movies;
    },
    setMovieDetails: (state, movieDetails) => {
      state.movieDetails = movieDetails;
    },
    setMovieTitle: (state, movieTitle) => {
      state.movieTitle = movieTitle;
    },
    hasErrors: (state) => {
      state.errors = true;
    },
    updateSingleMovie: (state, updatedMovie) => {
      const index = state.movieTitles.id === updatedMovie.movieId;
      if (index === -1) {
        throw new Error("Something went wrong!");
      } else {
        console.log(updatedMovie, "response from updateVotes via vuex store");
        state.movieTitles[index] = updatedMovie;
        console.log(state.movieTitles, "movie titles after update");
      }
    },
  },
  actions: {
    async fetchMovies({ commit }, movieTitle) {
      commit("loadingMovies");
      if (this.state.loadedMovies) {
        console.log(this.state.loadedMovies, "loadedMovies from vuex");
        commit("setMovies", []);
        commit("setLoadedMovies");
      }
      commit("setMovieTitle", movieTitle);
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_MOVIE_API}&language=en-US&query=${movieTitle}&page=1&include_adult=false`
        );
        let data = await response.json();
        if (response.ok) {
          let promises = [];
          data.results.forEach((result) => {
            promises.push(
              `https://immense-headland-94271.herokuapp.com/https://us-central1-does-rover-live.cloudfunctions.net/api/movies/${result.id}`
            );
          });
          let dogData = await Promise.all(
            promises.map(async (url) => {
              const response = await fetch(url);
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
          console.log(data.results);
          commit("setMovies", data.results);
          commit("loadingMovies");
          commit("setLoadedMovies");
        }
      } catch (error) {
        commit("hasErrors");
      }
    },
    async fetchSingleMovie({ commit }, movieId) {
      commit("loadingMovies");
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.VUE_APP_MOVIE_API}&language=en-US`
        );
        let data = await response.json();
        if (response.ok) {
          commit("setMovieDetails", data);
          commit("loadingMovies");
        }
      } catch (error) {
        commit("hasErrors");
      }
    },
    async updateVoteCounts({ commit }, { movieId, vote }) {
      let response = await fetch(
        `https://immense-headland-94271.herokuapp.com/https://us-central1-does-rover-live.cloudfunctions.net/api/movies/${movieId}`,
        {
          method: "PUT",
          body: JSON.stringify({ vote: vote }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      if (response.ok) {
        commit("updateSingleMovie", data);
        // const index = this.state.movieTitles.id === data.movieId;
        // if (index === -1) {
        //   throw new Error("Something went wrong!");
        // } else {
        //   console.log(data, "response from updateVotes via vuex store");
        //   this.state.movieTitles[index] = data;
        // }
      }
    },
  },
  modules: {},
});
