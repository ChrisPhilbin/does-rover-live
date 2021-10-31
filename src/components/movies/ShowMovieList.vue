<template>
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
          <div class="relative pt-1 mb-1">
            <div class="overflow-hidden text-xs flex rounded bg-green-200">
              <div
                :style="{
                  width:
                    Math.round(
                      (movie.dogLives / (movie.dogLives + movie.dogDies)) * 100
                    ) + '%',
                }"
                class="
                  shadow-none
                  flex flex-col
                  text-center
                  whitespace-nowrap
                  text-white
                  justify-center
                  bg-green-500
                  py-1
                  px-1
                "
              >
                {{ movie.dogLives }}
              </div>
            </div>
          </div>
          <div class="relative pt-1">
            <div class="overflow-hidden text-xs flex rounded bg-red-200">
              <div
                :style="{
                  width:
                    Math.round(
                      (movie.dogDies / (movie.dogLives + movie.dogDies)) * 100
                    ) + '%',
                }"
                class="
                  shadow-none
                  flex flex-col
                  text-center
                  whitespace-nowrap
                  text-white
                  justify-center
                  bg-red-500
                  py-1
                  px-1
                "
              >
                {{ movie.dogDies }}
              </div>
            </div>
          </div>
          <div class="text-center mt-1">
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

            <span v-if="!movie.voted" class="block">
              <button
                class="
                  bg-green-200
                  hover:bg-green-500
                  text-gray-800
                  py-2
                  px-4
                  rounded-l
                  inline-block
                "
                @click="updateVote(movie.id, true)"
              >
                <p class="font-bold text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 inline text-sm"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    /></svg
                  >Cast Vote
                </p>
                <p>Rover Lives</p>
              </button>
              <button
                class="
                  bg-red-200
                  hover:bg-red-500
                  text-gray-800
                  py-2
                  px-4
                  rounded-r
                  inline-block
                "
                @click="updateVote(movie.id, false)"
              >
                <p class="font-bold text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 inline text-sm"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    /></svg
                  >Cast Vote
                </p>
                <p>Rover Dies</p>
              </button>
            </span>
            <span v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-blue-500 mx-auto mt-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-blue-500 font-bold font-sans">
                Vote received - Thanks!
              </p>
            </span>
          </div>
        </div>
      </div>
      <p class="text-left text-lg font-sans font-bold text-gray-800 pt-3">
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
                ? 'text-green-500'
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
    return {};
  },
  computed: {
    ...mapState({
      movieTitles: "movieTitles",
      hasErrors: "hasErrors",
      loadedMovies: "loadedMovies",
      movieTitle: "movieTitle",
      voteCast: "voteCast",
    }),
  },
  methods: {
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
