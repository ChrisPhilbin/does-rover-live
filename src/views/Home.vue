<template>
  <div class="min-h-screen">
    <SearchForm />

    <Information />

    <ShowMovieList />

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchForm from "@/components/search/SearchForm.vue";
import ShowMovieList from "@/components/movies/ShowMovieList.vue";
import Information from "@/components/static/Information.vue";
import Footer from "@/components/navigation/Footer.vue";
export default {
  name: "Home",
  components: {
    Footer,
    Information,
    SearchForm,
    ShowMovieList,
  },
  created() {
    document.title =
      "Does Rover Live? - Crowd sourced data to find out if the dog lives in the movie";
  },
};
</script>
