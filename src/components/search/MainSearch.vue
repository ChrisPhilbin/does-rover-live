<template>
  <div class="grid grid-cols-1 ml-auto mr-auto min-h-screen">
    <div
      class="
        pt-20
        relative
        h-screen
        xs:h-full
        bg-search-background bg-no-repeat bg-cover bg-opacity-60
      "
    >
      <p class="mt-20 font-title font-bold text-white text-6xl tracking-wide">
        Does Rover Live?
      </p>
      <SearchForm />
      <div
        v-if="loadedMovies && movieTitles.length === 0"
        class="mt-3 bg-red-400 rounded-md p-4 w-48 opacity-80 ml-auto mr-auto"
      >
        <p class="font-bold text-white font-sans">No results found</p>
      </div>
      <div v-if="loadingMovies">
        <p class="text-white font-bold text-xl">Getting movies...</p>
      </div>
      <div class="mt-16">
        <p class="font-title text-white text-2xl">
          Find out or let others know if the dog in the movie makes it.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchForm from "./SearchForm.vue";

export default {
  name: "MainSearch",
  components: { SearchForm },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      loadingMovies: "loadingMovies",
      movieTitles: "movieTitles",
      loadedMovies: "loadedMovies",
    }),
  },
  methods: {},
};
</script>
