<script setup lang="ts">
import type { Movie } from '@/types';
import MovieTags from '@/components/MovieTags.vue';
import TimeAuthor from '@/components/TimeAuthor.vue';

const props = defineProps<{
	movie: Movie,
}>();
</script>

<template>
	<article class="flex flex-col">
		<img class="mb-2 h-full w-full object-cover rounded" :src="props.movie.image">
		<h2 class="mb-2 text-xl">{{ props.movie.name }}</h2>
		<MovieTags
				class="mb-2"
				large
				:tags="props.movie.categories"
		/>
		<TimeAuthor :time="props.movie.date" :author="props.movie.author"/>
		<div v-if="props.movie.excerpt" v-html="props.movie.excerpt"/>
	</article>
</template>
