<script setup lang="ts">
import type {Movie} from '@/types';
import MovieTags from '@/components/MovieTags.vue';
import TimeAuthor from '@/components/TimeAuthor.vue';
import {computed} from "vue";

const props = defineProps<{
	movie: Movie,
}>();

const permalink = computed(() => {
	const segment = props.movie.categories[0].slug;
	return `/${segment}/${props.movie.slug}/`;
});
</script>

<template>
	<article class="preview flex flex-col">
		<img class="mb-2 h-full w-full object-cover rounded" :src="props.movie.image">
		<h2 class="mb-2 text-xl">{{ props.movie.name }}</h2>
		<MovieTags
			class="mb-2"
			large
			:tags="props.movie.categories"
		/>
		<TimeAuthor :time="props.movie.date" :author="props.movie.author"/>
		<div v-if="props.movie.excerpt" v-html="props.movie.excerpt"/>
		<RouterLink class="preview__cta" :to="permalink">Číst více</RouterLink>
	</article>
</template>

<style lang="scss" scoped>
.preview {
	cursor: pointer;
	transition: all .2s ease;

	&__cta {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 3;
		opacity: 0;
	}

	&:hover {
		transform: scale(1.01);
	}
}
</style>
