<template>
  <div>
    <MainSearch />

    <ShowMovieList />

    <!-- <Footer /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import MainSearch from "../components/search/MainSearch.vue";
import ShowMovieList from "@/components/movies/ShowMovieList.vue";
// import Information from "@/components/static/Information.vue";
// import Footer from "@/components/navigation/Footer.vue";
export default {
  name: "Home",
  components: {
    // Footer,
    // Information,
    MainSearch,
    ShowMovieList,
  },
  created() {
    document.title =
      "Does Rover Live? - Crowd sourced data to find out if the dog lives in the movie";
  },
};
</script>
