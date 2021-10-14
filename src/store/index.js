import { createStore } from "vuex";

export default createStore({
  state: {
    loadingMovies: false,
    movieDetails: {},
    movieTitles: [],
    errors: false,
  },
  mutations: {
    loadingMovies: (state) => {
      state.loadingMovies = !state.loadingMovies;
    },
    setMovies: (state, movies) => {
      state.movieTitles = movies;
      console.log(state.movieTitles);
    },
    setMovieDetails: (state, movieDetails) => {
      state.movieDetails = movieDetails;
      console.log(state.movieDetails, "movie details");
    },
    hasErrors: (state) => {
      state.errors = true;
    },
  },
  actions: {
    async fetchMovies({ commit }, movieTitle) {
      commit("loadingMovies");
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_MOVIE_API}&language=en-US&query=${movieTitle}&page=1&include_adult=false`
        );
        let data = await response.json();
        if (response.ok) {
          commit("setMovies", data.results);
          commit("loadingMovies");
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
  },
  modules: {},
});
