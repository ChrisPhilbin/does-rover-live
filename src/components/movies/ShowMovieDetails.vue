<template>
  <!-- <div class="grid grid-cols-2 max-w-xl ml-auto mr-auto">
    <div>
      <img
        :src="`https://www.themoviedb.org/t/p/w220_and_h330_face${movieDetails.poster_path}`"
        class="h-38 w-26 rounded"
      />
    </div>

    <div>
      <p class="font-gray-800 font-bold uppercase text-left pb-1">
        {{ movieDetails.original_title }}
      </p>
      <span
        class="text-left text-xs mr-1 font-gray-800"
        v-for="genre in movieDetails.genres"
        :key="genre.id"
        >{{ genre.name }}</span
      >
      <p class="text-left text-sm font-gray-700 font-sans">
        {{ movieDetails.overview }}
      </p>
    </div>
  </div> -->
  <div class="w-max mx-auto">
    <div
      class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5"
    >
      <img
        :src="`https://www.themoviedb.org/t/p/w220_and_h330_face${movieDetails.poster_path}`"
        class="rounded-t-lg h-auto w-full"
      />

      <div class="p-5">
        <h5
          class="text-gray-900 font-bold text-2xl tracking-tight mb-2 text-left"
        >
          {{ movieDetails.original_title }}
        </h5>

        <p class="font-normal text-gray-700 mb-3 text-left">
          {{ movieDetails.overview }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";

export default {
  name: "ShowMovieDetails",
  computed: {
    ...mapState({
      movieDetails: "movieDetails",
    }),
  },
  created() {
    store.dispatch("fetchSingleMovie", this.$route.params.id);
  },
};
</script>
