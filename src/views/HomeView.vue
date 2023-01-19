<script setup lang="ts">
import {
	onMounted, ref, reactive, watch, 
} from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import MovieBanner from '@/components/MovieBanner.vue';
import MoviePreview from '@/components/MoviePreview.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';

const route = useRoute();
useHead({ title: null });

const loadingSticky = ref(true);
const loading = ref(true);
const reviews = ref([]);
const trailers = ref([]);
const stickies = ref([]);

const pagination = reactive({
	page: /*route.query.p ??*/ 1,
	pages: 1,
});

const fetchApi = async (uri: string) => {
	let json = [];

	try {
		const result = await fetch(`${import.meta.env.VITE_API_URL}${uri}`);
		json = await result.json();

		if (result.status !== 200) {
			throw new Error(json?.message);
		}
	} catch (e) {
		json = [];
	}

	return json;
};

const fetchSticky = async () => {
	loadingSticky.value = true;
	let json = await fetchApi(`/posts?per_page=2&sticky=1`);

	if (json.length <= 2) {
		json = [...json, ...(await fetchApi(`/posts?per_page=${2 - json.length}&exclude=${json.map(movie => movie.id).join(',')}`))];
	}

	stickies.value = json;
	loadingSticky.value = false;
};

const fetchPosts = async (category: number[], limit: number = 6) => {
	return await fetchApi(`/posts?per_page=${limit}&categories=${category.join(',')}&exclude=${stickies.value.map(movie => movie.id).join(',')}`);
};

onMounted(async () => {
	await fetchSticky();
	loading.value = true;
	[reviews.value, trailers.value] = await Promise.all([fetchPosts([8], 3), fetchPosts([4, 14], 10)]); // Recenze + trailery
	loading.value = false;
});
</script>

<template>
	<main class="container mx-auto py-16">
		<section v-if="stickies.length" class="hero w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:h-[60vh] md:min-h-[640px]">
			<div
				v-for="movie in stickies"
				:key="movie.id"
				class="h-[40vh] md:h-auto"
			>
				<MovieBanner
						large
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
			</div>
		</section>

		<template v-for="(section, index) in [trailers, reviews]" :key="index">
			<section v-if="section.length > 0" class="mt-32">
				<h2 class="text-2xl font-extrabold border-b-2 pb-8 mb-8">
					{{ index === 0 ? 'Trailery' : 'Recenze' }}
				</h2>
				<div
					class="grid grid-cols-1 gap-8 pb-16"
					:class="{
						'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5': index === 0,
						'md:grid-cols-3': index === 1
					}"
				>
					<MoviePreview
						v-for="movie in section"
						:key="movie.slug"
						:movie="{
							slug: movie.slug,
							name: movie.title,
							author: movie.author.name,
							excerpt: movie.excerpt,
							categories: movie.categories,
							image: movie.featured_media
					}"/>
				</div>
			</section>
		</template>

		<LoadingIcon v-if="loading" class="w-[120px] h-[120px] mx-auto"/>

<!--		<aside v-if="pagination.page < pagination.pages" class="text-center mt-8 font-mono">-->
<!--			&lt;!&ndash;<RouterLink :to="{path: '/', query: {p: pagination.page + 1}}">&downarrow; <span class="underline underline-offset-2 hover:no-underline">Načíst více</span></RouterLink>&ndash;&gt;-->
<!--			<button @click="fetchPosts(true)">&downarrow; <span class="underline underline-offset-2 hover:no-underline">Načíst více</span></button>-->
<!--		</aside>-->
	</main>
</template>
