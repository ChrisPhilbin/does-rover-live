<template>
  <div
    v-if="loadedMovies && !movieTitles.length"
    class="
      grid grid-cols-1
      lg:grid-cols-3
      justify-items-center
      ml-auto
      mr-auto
      pt-4
      max-w-5xl
    "
  >
    <p class="text-red-500 font-bold">No results found!</p>
  </div>
  <div
    v-if="loadedMovies && movieTitles.length"
    id="movieList"
    ref="movies"
    class="
      min-h-screen
      grid grid-cols-1
      lg:grid-cols-3
      justify-items-center
      ml-auto
      mr-auto
      pt-4
      max-w-5xl
      relative
    "
  >
    <div class="col-span-1 lg:col-span-3 absolute top-3 left-6">
      <p class="uppercase text-gray-600 text-sm font-bold mb-5">
        Showing results for <span class="italic">{{ movieTitle }}</span>
      </p>
    </div>
    <div
      v-for="movie in movieTitles"
      :key="movie.id"
      class="pb-8 pt-5 px-3 mx-5 my-5 text-left shadow-xl rounded-md"
      :class="{ hidden: !movie.poster_path || !movie.overview }"
    >
      <div class="flex items-center justify-center">
        <div class="z-10">
          <img
            :src="`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`"
            class="rounded-md mb-2 opacity-80 h-auto w-full"
          />
          <div class="text-center">
            <span
              v-if="movie.dogLives > movie.dogDies"
              class="block uppercase text-green-600 font-bold"
              >The dog Lives!</span
            >
            <span
              v-else-if="movie.dogLives < movie.dogDies"
              class="block uppercase text-red-500 font-bold"
              >The dog doesn't make it</span
            >
            <span v-else class="block uppercase text-gray-600 font-bold"
              >Not enough data</span
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="
                h-14
                w-14
                mr-2
                inline
                text-yellow-400
                hover:text-green-600
                cursor-pointer
              "
              @click="updateVote(movie.id, true)"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="
                h-14
                w-14
                ml-2
                inline
                text-yellow-400
                hover:text-red-600
                cursor-pointer
              "
              @click="updateVote(movie.id, false)"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"
              />
            </svg>
          </div>
        </div>
      </div>
      <p class="text-left text-lg font-sans font-bold text-gray-800">
        <a :href="`/movies/${movie.id}`">{{ movie.original_title }}</a>
        <span v-if="movie.release_date" class="text-sm text-gray-600">
          ({{ movie.release_date.slice(0, 4) }})</span
        >
      </p>
      <span class="align-text-bottom">
        <button
          type="button"
          v-for="i in 5"
          :class="{ 'mr-1': i < 5 }"
          :key="i"
        >
          <svg
            class="block h-4 w-4 cursor-text"
            :class="[
              Math.round(movie.vote_average) / 2 >= i
                ? 'text-blue-400'
                : 'text-gray-400',
            ]"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        </button>
        <p class="pl-2 text-sm text-gray-700 font-sans inline">
          ({{ movie.vote_average }} / 10)
        </p>
      </span>
      <p v-if="movie.overview.length > 150" class="text-left text-sm">
        {{ movie.overview.slice(0, 255) }}...
      </p>
      <p v-else class="text-left text-sm">{{ movie.overview }}</p>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapState } from "vuex";
export default {
  name: "ShowMovieList",
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      movieTitles: "movieTitles",
      hasErrors: "hasErrors",
      loadedMovies: "loadedMovies",
      movieTitle: "movieTitle",
      voteCast: "voteCast"
    }),
  },
  methods: {
    // async updateVote(movieId, vote) {
    //   let response = await fetch(
    //     `https://immense-headland-94271.herokuapp.com/https://us-central1-does-rover-live.cloudfunctions.net/api/movies/${movieId}`,
    //     {
    //       method: "PUT",
    //       body: JSON.stringify({ vote: vote }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   let data = await response.json();
    //   if (response.ok) {
    //     console.log(data);
    //   }
    // },
    updateVote(movieId, vote) {
      store.dispatch("updateVoteCounts", { movieId, vote });
    },
  },
  updated() {
    if (this.loadedMovies && !this.voteCast) {
      const el = document.getElementById("movieList");
      el.scrollIntoView({ behavior: "smooth" });
    }
  },
};
</script>
