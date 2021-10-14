<template>
  <div class="home">
    <SearchForm />

    <ShowMovieList />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchForm from "@/components/search/SearchForm.vue";
import ShowMovieList from "@/components/movies/ShowMovieList.vue";
export default {
  name: "Home",
  components: {
    SearchForm,
    ShowMovieList,
  },
  created() {
    document.title =
      "Does Rover Live? - Crowd sourced data to find out if the dog lives in the movie";
  },
};
</script>
