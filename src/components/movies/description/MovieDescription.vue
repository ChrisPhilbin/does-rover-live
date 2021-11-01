<template>
  <div>
    <p class="text-left text-lg font-sans font-bold text-gray-800 pt-3">
      <a :href="`/movies/${movie.id}`">{{ movie.original_title }}</a>
      <span v-if="movie.release_date" class="text-sm text-gray-600">
        ({{ movie.release_date.slice(0, 4) }})</span
      >
    </p>
    <span class="align-text-bottom">
      <button type="button" v-for="i in 5" :class="{ 'mr-1': i < 5 }" :key="i">
        <svg
          class="block h-4 w-4 cursor-text"
          :class="[
            Math.round(movie.vote_average) / 2 >= i
              ? 'text-green-500'
              : 'text-gray-400',
          ]"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>
      </button>
      <p class="pl-2 text-sm text-gray-700 font-sans inline">
        ({{ movie.vote_average }} / 10)
      </p>
    </span>
    <p v-if="movie.overview.length > 150" class="text-left text-sm">
      {{ movie.overview.slice(0, 255) }}...
    </p>
    <p v-else class="text-left text-sm">{{ movie.overview }}</p>
  </div>
</template>

<script>
export default {
  name: "MovieDescription",
  props: ["movie"],
};
</script>
