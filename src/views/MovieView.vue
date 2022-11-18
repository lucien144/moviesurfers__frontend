<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import LoadingIcon from "@/components/LoadingIcon.vue";
import TimeAuthor from "@/components/TimeAuthor.vue";

const route = useRoute();
const loading = ref(true);
const movie = ref();

onMounted(async () => {
	loading.value = true;
	const result = await fetch(`${import.meta.env.VITE_API_URL}/posts?slug=${route.params.slug}`);
	const json = await result.json();
	movie.value = json[0];
	loading.value = false;
});
</script>

<template>
	<main v-if="loading" class="container mx-auto py-6">
		<LoadingIcon class="w-[120px] h-[120px] mx-auto"/>
	</main>
	<main v-else class="container mx-auto py-6">
		<nav>
			<RouterLink to="/" class="font-mono">&larr; <span class="underline hover:no-underline">zpět</span>
			</RouterLink>
		</nav>

		<div class="w-2/3 mx-auto">

		</div>

		<article>
			<div class="prose lg:prose-xl mx-auto text-center pb-6">
				<h1 v-html="movie.title"/>
				<div>
					<TimeAuthor :time="movie.date" :author="movie.author.name"/>
				</div>
			</div>

			<iframe
				v-if="movie.acf.youtube_id"
				class="w-3/4 aspect-video mx-auto"
				:src="`https://www.youtube.com/embed/${movie.acf.youtube_id}`"
				:title="movie.title"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			/>

			<div class="prose lg:prose-xl mx-auto">
				<div v-html="movie.content"/>
			</div>

			<div class="prose lg:prose-xl mx-auto">
				<div class="flex justify-end">
					<div class="w-1/6 p-4 text-center bg-amber-400 font-medium">
						<div>Hodnocení</div>
						<span class="text-6xl">{{ movie.acf.rating }}</span> / 5
					</div>
				</div>
			</div>
		</article>
	</main>
</template>
