<template>
  <div class="grid grid-cols-1 ml-auto mr-auto">
    <div>
      <form @submit.prevent="getMovies">
        <input
          type="text"
          v-model="movieTitle"
          placeholder="enter movie title"
          class="
            shadow
            border
            rounded-lg
            py-2
            px-3
            text-gray-800
            mt-6
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
        <!-- <button
          class="
            bg-green-400
            ring-4 ring-green-100
            text-white
            rounded
            p-2
            ml-3
            max-w-min
          "
          @click="getMovies"
        >
          Search
        </button> -->
      </form>
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
