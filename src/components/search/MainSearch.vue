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
      <div v-if="loadingMovies">
        <p class="text-white font-bold text-xl">Getting movies...</p>
      </div>
      <div class="pt-10">
        <p class="font-title text-white text-2xl">
          Crowd sourced info to let you know if your favorite dog makes it.
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
    }),
  },
  methods: {},
};
</script>
