<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { Movie } from '@/types';
import MovieTags from '@/components/MovieTags.vue';
import TimeAuthor from '@/components/TimeAuthor.vue';
import {transformImage} from "@/libs/imagekit";

const props = defineProps<{
	large?: boolean,
	movie: Movie,
}>();

const permalink = computed(() => {
	const segment = props.movie.categories[0].slug;
	return `/${segment}/${props.movie.slug}/`;
});
</script>

<template>
	<article class="banner h-full">
		<div class="banner__body">
			<MovieTags
				class="mb-2"
				large
				:tags="props.movie.categories"
			/>
			<h2 class="mb-2 text-white" :class="[props.large ? 'text-6xl' : 'text-2xl']">{{ props.movie.name }}</h2>
			<div v-if="props.large && props.movie.excerpt" class="mb-2 text-xl text-white" v-html="props.movie.excerpt"/>
			<TimeAuthor :time="props.movie.date" :author="props.movie.author" class="text-gray-300"/>
		</div>
		<img class="w-full h-full object-cover rounded" :src="transformImage(props.movie.image, 'tr:w-893,h-745,f-jpg')">
		<RouterLink class="banner__cta" :to="permalink">Číst více</RouterLink>
	</article>
</template>

<style lang="scss" scoped>
.banner {
	position: relative;
	overflow: hidden;
	cursor: pointer;
	transition: all .2s ease;

	&__body {
		position: absolute;
		bottom: 2rem;
		left: 2rem;
		z-index: 3;
	}

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

	&:before {
		position: absolute;
		top: 0;
		left: 0;
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 51%);
		@apply rounded;
	}
}
</style>
