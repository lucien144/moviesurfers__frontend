<script setup lang="ts">
import {onMounted, ref, reactive, watch} from 'vue';
import {useRoute} from "vue-router";
import {useHead} from '@unhead/vue';
import MovieBanner from '@/components/MovieBanner.vue';
import MoviePreview from '@/components/MoviePreview.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';

const route = useRoute();
useHead({title: null});

const loading = ref(true);
const banner = ref();
const banners = ref([]);
const previews = ref([]);

const pagination = reactive({
	page: route.query.p ?? 1,
	pages: 1,
});

const fetchPosts = async (append = false) => {
	loading.value = true;
	let json = [];

	try {
		const result = await fetch(`${import.meta.env.VITE_API_URL}/posts?per_page=13&page=${pagination.page}`);
		pagination.pages = result.headers.get('x-wp-totalpages') ?? pagination.pages;
		json = await result.json();

		if (result.status !== 200) {
			throw new Error(json?.message);
		}
	} catch (e) {
		console.warn(e);
		json = [];
	}

	if (!append) {
		banner.value = json[0] ?? {};
		banners.value = json.slice(1, 4);
		previews.value = json.slice(4);
	} else {
		previews.value = [...previews.value, ...json];
	}
	loading.value = false;
};

onMounted(() => {
	fetchPosts();
});

watch(() => route.query.p, (page, old) => {
	pagination.page = page ?? 1;
	fetchPosts(true);
});
</script>

<template>
	<main class="container mx-auto p-3 md:px-0 md:py-6">
		<section v-if="banner && banners" class="hero w-full grid grid-cols-12 md:grid-rows-3 gap-2 md:h-[60vh] md:min-h-[640px]">
			<div class="md:row-span-3 col-span-12 md:col-span-7 h-[40vh] md:h-auto">
				<MovieBanner
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

		<LoadingIcon v-if="loading" class="w-[120px] h-[120px] mx-auto"/>

		<aside v-if="pagination.page < pagination.pages" class="text-center mt-8 font-mono">
			<RouterLink :to="{path: '/', query: {p: pagination.page + 1}}">&downarrow; <span
				class="underline underline-offset-2 hover:no-underline">Načíst více</span></RouterLink>
		</aside>
	</main>
</template>
