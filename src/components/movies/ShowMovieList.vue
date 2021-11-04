<template>
  <div
    v-if="loadedMovies && movieTitles.length > 0"
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
          <VoteControls :movie="movie" />
        </div>
      </div>
      <MovieDescription :movie="movie" />
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapState } from "vuex";
import MovieDescription from "./description/MovieDescription.vue";
import VoteControls from "./vote/VoteControls.vue";
export default {
  name: "ShowMovieList",
  components: { VoteControls, MovieDescription },
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
    this.$nextTick(() => {
      if (this.loadedMovies && !this.voteCast && this.movieTitles.length) {
        const el = document.getElementById("movieList");
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  },
};
</script>
