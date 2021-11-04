import { createStore } from "vuex";

export default createStore({
  state: {
    loadingMovies: false,
    movieDetails: {},
    loadedMovies: false,
    voteCast: false,
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
    setVoteCast: (state, val) => {
      state.voteCast = val;
    },
    updateSingleMovie: (state, updatedMovie) => {
      let index = state.movieTitles.findIndex((movie) => {
        return movie.id == updatedMovie.movieId;
      });
      if (index === -1) {
        throw new Error("Something went wrong!");
      } else {
        state.movieTitles[index] = {
          ...state.movieTitles[index],
          dogLives: updatedMovie.dogLives,
          dogDies: updatedMovie.dogDies,
          voted: true,
        };
      }
    },
  },
  actions: {
    async fetchMovies({ commit }, movieTitle) {
      commit("loadingMovies");
      commit("setVoteCast", false);
      if (this.state.loadedMovies) {
        commit("setMovies", []);
        commit("setLoadedMovies");
      }
      commit("setMovieTitle", movieTitle);
      try {
        let response = await fetch(
          `https://immense-headland-94271.herokuapp.com/https://us-central1-does-rover-live.cloudfunctions.net/api/movies/search`,
          {
            method: "POST",
            body: JSON.stringify({ movieTitle: movieTitle }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();
        if (response.ok) {
          commit("setMovies", data);
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
      commit("setVoteCast", true);
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
      }
    },
  },
  modules: {},
});
