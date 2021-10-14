<template>
  <div class="grid grid-cols-1 max-w-sm ml-auto mr-auto">
    <form @submit.prevent="getMovies">
      <input
        type="text"
        v-model="movieTitle"
        placeholder="enter movie title"
        class="
          shadow
          border
          rounded
          py-2
          px-3
          text-gray-800
          mt-6
          ml-auto
          mr-auto
        "
      />
      <button
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
      </button>
    </form>
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
