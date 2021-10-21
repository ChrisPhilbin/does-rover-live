<template>
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
</template>

<script>
import store from "@/store/index";

export default {
  name: "SearchForm",
  data() {
    return {
      movieTitle: "",
    };
  },
  computed: {},
  methods: {
    getMovies() {
      store.dispatch("fetchMovies", this.movieTitle);
    },
  },
  updated() {},
};
</script>
