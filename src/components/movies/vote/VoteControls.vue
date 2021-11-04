<template>
  <div class="relative pt-1 mb-1">
    <div class="overflow-hidden text-xs flex rounded bg-green-200">
      <div
        :style="{
          width:
            Math.round(
              (movie.dogLives / (movie.dogLives + movie.dogDies)) * 100
            ) + '%',
        }"
        class="
          shadow-none
          flex flex-col
          text-center
          whitespace-nowrap
          text-white
          justify-center
          bg-green-500
          py-1
          px-1
        "
      >
        {{ movie.dogLives }}
      </div>
    </div>
  </div>
  <div class="relative pt-1">
    <div class="overflow-hidden text-xs flex rounded bg-red-200">
      <div
        :style="{
          width:
            Math.round(
              (movie.dogDies / (movie.dogLives + movie.dogDies)) * 100
            ) + '%',
        }"
        class="
          shadow-none
          flex flex-col
          text-center
          whitespace-nowrap
          text-white
          justify-center
          bg-red-500
          py-1
          px-1
        "
      >
        {{ movie.dogDies }}
      </div>
    </div>
  </div>
  <div class="text-center mt-1">
    <span
      v-if="movie.dogLives > movie.dogDies"
      class="block uppercase text-green-600 font-bold"
      >The dog Lives!</span
    >
    <span
      v-else-if="movie.dogLives < movie.dogDies"
      class="block uppercase text-red-500 font-bold"
      >The dog doesn't make it</span
    >
    <span v-else class="block uppercase text-gray-600 font-bold"
      >Not enough data</span
    >

    <span v-if="!movie.voted" class="block">
      <button
        :disabled="clicked.includes(movie.id)"
        class="
          bg-green-200
          hover:bg-green-500
          text-gray-800
          py-2
          px-4
          rounded-l
          inline-block
        "
        @click="updateVote(movie.id, true)"
      >
        <p class="font-bold text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 inline text-sm"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            /></svg
          >Cast Vote
        </p>
        <p>Rover Lives</p>
      </button>
      <button
        :disabled="clicked.includes(movie.id)"
        class="
          bg-red-200
          hover:bg-red-500
          text-gray-800
          py-2
          px-4
          rounded-r
          inline-block
        "
        @click="updateVote(movie.id, false)"
      >
        <p class="font-bold text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 inline text-sm"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            /></svg
          >Cast Vote
        </p>
        <p>Rover Dies</p>
      </button>
    </span>
    <span v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 text-blue-500 mx-auto mt-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p class="text-blue-500 font-bold font-sans">Vote received - Thanks!</p>
    </span>
  </div>
</template>

<script>
import store from "@/store/index";
export default {
  name: "VoteControls",
  props: ["movie"],
  data() {
    return {
      clicked: [],
    };
  },
  methods: {
    updateVote(movieId, vote) {
      this.clicked.push(movieId);
      store.dispatch("updateVoteCounts", { movieId, vote });
    },
  },
};
</script>
