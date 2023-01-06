<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useHead} from '@unhead/vue';
import MovieBanner from '@/components/MovieBanner.vue';
import MoviePreview from '@/components/MoviePreview.vue';
import LoadingIcon from "@/components/LoadingIcon.vue";
useHead({title: null});

const loading = ref(true);
const banner = ref();
const banners = ref([]);
const previews = ref([]);

onMounted(async () => {
	loading.value = true;
	const result = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
	const json = await result.json();
	banner.value = json[0];
	banners.value = json.slice(1, 4);
	previews.value = json.slice(4);
	loading.value = false;
});
</script>

<template>
	<main v-if="loading" class="container mx-auto py-6">
		<LoadingIcon class="w-[120px] h-[120px] mx-auto"/>
	</main>
	<main v-else class="container mx-auto p-3 md:px-0 md:py-6">
		<section class="hero w-full grid grid-cols-12 md:grid-rows-3 gap-2 md:h-[60vh]">
			<div class="md:row-span-3 col-span-12 md:col-span-7 h-[40vh] md:h-auto">
				<MovieBanner
					v-if="banner"
					large
					:movie="{
						slug: banner.slug,
						name: banner.title,
						author: banner.author.name,
						date: banner.date,
						excerpt: banner.excerpt,
						categories: banner.categories,
						image: banner.featured_media
					}"
				/>
			</div>
			<MovieBanner
				v-for="movie in banners"
				:key="movie.slug"
				class="col-span-12 md:col-span-5"
				:movie="{
					slug: movie.slug,
					name: movie.title,
					author: movie.author.name,
					date: movie.date,
					excerpt: movie.excerpt,
					categories: movie.categories,
					image: movie.featured_media
				}"
			/>
		</section>

		<section v-if="previews.length > 0">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
				<MoviePreview
					v-for="movie in previews"
					:key="movie.slug"
					:movie="{
						slug: movie.slug,
						name: movie.title,
						author: movie.author.name,
						date: movie.date,
						excerpt: movie.excerpt,
						categories: movie.categories,
						image: movie.featured_media
				}"/>
			</div>
		</section>
	</main>
</template>
