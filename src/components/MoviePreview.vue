<script setup lang="ts">
import type { Movie } from '@/types';
import MovieTags from '@/components/MovieTags.vue';
import TimeAuthor from '@/components/TimeAuthor.vue';
import { permalink } from '@/libs/helpers';
import { transformImage } from '@/libs/imagekit';

const props = defineProps<{
	movie: Movie,
}>();
</script>

<template>
	<article class="preview flex flex-col">
		<picture class="mb-8">
			<source :srcset="transformImage(props.movie.image, 'tr:w-635,h-400,f-webp')" type="image/webp">
			<source :srcset="transformImage(props.movie.image, 'tr:w-635,h-400,f-jpg')" type="image/jpg">
			<img
				v-if="props.movie.image"
				class="mb-8 h-full w-full shrink object-cover rounded"
				:src="transformImage(props.movie.image, 'tr:w-635,h-400,f-jpg')"
			>
			<img
				v-else
				class="mb-8 h-full w-full shrink object-cover rounded"
				src="https://picsum.photos/635/400"
			>
		</picture>
		<div class="preview__body">
			<h2 class="mb-8 text-xl font-semibold text-white">{{ props.movie.name }}</h2>
			<div class="flex items-center space-x-4">
				<MovieTags
					large
					:tags="props.movie.categories.filter(category => !['recenze', 'trailer'].includes(category.slug))"
				/>
				<TimeAuthor :time="props.movie.date" :author="props.movie.author" class="text-white"/>
			</div>
		</div>
		<!--		<div v-if="props.movie.excerpt" v-html="props.movie.excerpt"/>-->
		<RouterLink class="preview__cta" :to="permalink(props.movie.categories, props.movie.slug)">Číst více</RouterLink>
	</article>
</template>

<style lang="scss" scoped>
.preview {
	position: relative;
	overflow: hidden;
	cursor: pointer;
	transition: all .2s ease;

	&__body {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
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
