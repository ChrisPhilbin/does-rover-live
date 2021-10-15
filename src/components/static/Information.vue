<template>
  <div
    v-if="!loadedMovies"
    class="
      grid grid-cols-1
      lg:grid-cols-3
      mt-4
      mb-5
      max-w-5xl
      justify-items-center
      ml-auto
      mr-auto
    "
  >
    <div class="px-5 pb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 text-red-600 inline text-center"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clip-rule="evenodd"
        />
      </svg>

      <p class="pt-3 text-left text-gray-700 text-sm font-sans">
        Are you a dog lover? We are too. Leverage crowd sourced information to
        find out beforehand whether or not your favorite four legged friend
        makes it through that tense scene... and then determine if you still
        want to watch.
      </p>
    </div>

    <div class="px-5 pb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 text-blue-500 inline text-center"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <p class="pt-3 text-left text-gray-700 text-sm font-sans">
        Already watched a movie and want to help others? Search for the recently
        watched movie and rate the movie accordingly to help future viewers
        figure out whether or not they want to watch.
      </p>
    </div>

    <div class="px-5 pb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 text-blue-500 inline text-center"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
        />
      </svg>
      <p class="pt-3 text-left text-gray-700 text-sm font-sans">
        Notice something is wrong with one of the movies and it's rating? Let us
        know by sending us an email!
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Information",
  computed: {
    ...mapState({
      loadedMovies: "loadedMovies",
    }),
  },
};
</script>
