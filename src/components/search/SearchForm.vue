<template>
  <div class="grid grid-cols-1 ml-auto mr-auto">
    <div
      class="
        relative
        h-96
        bg-search-background bg-no-repeat bg-cover bg-opacity-60 bg-fixed
      "
    >
      <p class="mt-8 font-title font-bold text-pink-400 text-6xl tracking-wide">
        Does Rover Live?
      </p>

      <form @submit.prevent="getMovies">
        <input
          type="text"
          name="movieTitle"
          v-model="movieTitle"
          placeholder="enter movie title"
          class="
            shadow
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
      </form>
      <div class="pt-10">
        <p class="font-title text-white text-2xl">
          Crowd sourced info to let you know if your favorite dog makes it.
        </p>
      </div>
    </div>
  </div>
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
      movieTitles: "movieTitles",
    }),
  },
  methods: {
    getMovies() {
      store.dispatch("fetchMovies", this.movieTitle);
    },
  },
};
</script>
