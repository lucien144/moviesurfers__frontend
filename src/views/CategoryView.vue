<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import LoadingIcon from "@/components/LoadingIcon.vue";
import MoviePreview from "@/components/MoviePreview.vue";

const route = useRoute();
const items = ref([]);
const loading = ref(false);
onMounted(async () => {
	loading.value = true;
	try {
		const result = await fetch(`${import.meta.env.VITE_API_URL}/posts?categories=${route.params.id}&per_page=100`);
		items.value = await result.json();

		if (result.status !== 200) {
			throw new Error(items.value?.message);
		}
	} catch (e) {
		items.value = [];
	} finally {
		loading.value = false;
	}
});
</script>

<template>
	<main v-if="loading" class="container mx-auto py-32">
		<LoadingIcon class="w-[120px] h-[120px] mx-auto"/>
	</main>
	<main v-else class="container mx-auto py-16">
			<nav class="my-8">
				<RouterLink to="/" class="font-mono">&larr; <span class="underline hover:no-underline">zpět</span>
				</RouterLink>
			</nav>

		<div v-if="items[0]" class="prose lg:prose-xl mx-auto text-center pb-16">
			<h2 class="capitalize">{{ items[0].categories.find((tag) => tag.id === Number.parseInt(route.params.id)).title }}</h2>
		</div>

		<div class="columns-1 lg:columns-3 space-y-16">
			<MoviePreview
				v-for="movie in items"
				:key="movie.slug"
				:movie="{
						slug: movie.slug,
						name: movie.title,
						date: movie.date,
						author: movie.author.name,
						excerpt: movie.excerpt,
						categories: movie.categories,
						image: movie.featured_media
				}"/>
		</div>
	</main>
</template>
