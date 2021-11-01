<template>
  <form @submit.prevent="getMovies">
    <input
      type="text"
      name="movieTitle"
      autofocus
      v-model="movieTitle"
      placeholder="enter movie title"
      size="30"
      class="
        focus:outline-none
        shadow-lg
        border
        rounded-lg
        py-2
        px-3
        text-gray-800
        mt-12
        ml-auto
        mr-auto
      "
    />
    <svg
      v-if="!loadingMovies"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 -ml-8 inline cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      @click="getMovies"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <svg
      v-if="loadingMovies"
      class="animate-spin h-6 w-6 -ml-8 text-blue-600 inline z-10"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </form>
</template>

<script>
import store from "@/store/index";
import { mapState } from "vuex";

export default {
  name: "SearchForm",
  data() {
    return {
      movieTitle: "",
    };
  },
  computed: {
    ...mapState({
      loadingMovies: "loadingMovies",
    }),
  },
  methods: {
    getMovies() {
      console.log("getting movies...");
      store.dispatch("fetchMovies", this.movieTitle);
    },
  },
  updated() {
    console.log(
      this.loadingMovies,
      "loading movies value from SearchForm component"
    );
  },
};
</script>
