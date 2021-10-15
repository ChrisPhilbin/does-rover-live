import { createStore } from "vuex";

export default createStore({
  state: {
    loadingMovies: false,
    movieDetails: {},
    loadedMovies: false,
    movieTitles: [],
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
          // let promises = [];
          // data.results.forEach((result) => {
          //   promises.push(
          //     `https://immense-headland-94271.herokuapp.com/https://us-central1-does-rover-live.cloudfunctions.net/api/movies/${result.id}`
          //   );
          // });
          // let dogData = await Promise.all(
          //   promises.map(async (url) => {
          //     const response = await fetch(url);
          //     const responseData = await response.json();
          //     return responseData;
          //   })
          // );
          // dogData.map((d) => {
          //   let movieIndex = data.results.findIndex((movie) => {
          //     movie.id == d.movieId;
          //   });
          //   console.log(movieIndex, "movie index value");
          //   data.results[movieIndex].dogLives = d.dogLives;
          //   data.results[movieIndex].dogDies = d.dogDies;
          // });
          // console.log(data.results);
          //merge response data from firebase to response data from movieDB
          // let movie = data.results.filter((obj) => {
          //   console.log(obj);
          //   return obj.id === responseData.movieId;
          // });
          // movie.dogLives = responseData.dogLives;
          // movie.dogDies = responseData.dogDies;
          //   })
          // );
          // data.results.forEach((m) => {
          //   console.log(m, "m value");
          //   let i = resp.findIndex((r) => {
          //     console.log(r, "r value");
          //     m.id === r.movieId;
          //   });
          //   console.log(i, "index value");
          //   data.results[i].dogLives = r.dogLives;
          //   data.results[i].dogDies = r.dogDies;
          // });
          // console.log(data.results);
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
  },
  modules: {},
});
