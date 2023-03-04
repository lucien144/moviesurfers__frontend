<script setup lang="ts">
import {
	onMounted, ref, reactive, watch,
} from 'vue';
import {useRoute} from 'vue-router';
import {useHead} from '@unhead/vue';
import {transformImage} from '@/libs/imagekit';
import MovieBanner from '@/components/MovieBanner.vue';
import MoviePreview from '@/components/MoviePreview.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';
import TimeAuthor from "@/components/TimeAuthor.vue";

const route = useRoute();
useHead({title: null});

const loadingSticky = ref(true);
const loading = ref(true);
const reviews = ref([]);
const trailers = ref([]);
const stickies = ref([]);
const posters = ref([]);
const news = ref([]);
const lightbox = ref(null);

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
	let json = await fetchApi('/posts?per_page=2&sticky=1');

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
	[
		reviews.value,
		trailers.value,
		posters.value,
		news.value,
	] = await Promise.all([
		fetchPosts([8], 3), // Recenze
		fetchPosts([4, 14], 10), // Trailery
		fetchApi('/posters?per_page=6'), // Postery
		fetchApi('/news?per_page=6'), // Showbiz
	]);
	loading.value = false;
});
</script>

<template>
	<main class="container mx-auto py-16">
		<section
			v-if="stickies.length"
			class="hero w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:h-[60vh] md:min-h-[640px]"
		>
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
			<div :class="{'grid grid-cols-5 gap-8': index === 1}">
				<section v-if="section.length > 0" class="mt-32 col-span-12 lg:col-span-3">
					<div class="flex justify-between items-center border-b-2 pb-8 mb-8">
						<h2 class="text-2xl font-extrabold">
							{{ index === 0 ? 'Trailery' : 'Recenze' }}
						</h2>
						<RouterLink :to="`/${index === 0 ? 'trailer' : 'recenze'}/`" class="mr-16">
							Zobrazit vše &rarr;
						</RouterLink>
					</div>
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
								date: movie.date,
								author: movie.author.name,
								excerpt: movie.excerpt,
								categories: movie.categories,
								image: movie.featured_media
						}"/>
					</div>
				</section>
				<section v-if="index === 1 && news.length > 0" class="mt-32 col-span-12 lg:col-span-2">
					<h2 class="text-2xl font-extrabold border-b-2 pb-8 mb-8">
						Zajímavosti &amp; novinky
					</h2>
					<ul class="space-y-8">
						<li v-for="article in news" :key="article.id">
							<RouterLink :to="`/aktualne/${article.slug}`"
										class="flex items-center justify-between underline hover:no-underline">
								<span class="whitespace-nowrap overflow-hidden text-ellipsis">
									{{ article.title }}
								</span>
								<div class="flex items-center space-x-2">
								  <span
									  v-for="category in article.categories"
									  :key="category.id"
									  class="font-mono text-xs bg-gray-800 text-white p-1 whitespace-nowrap"
								  >
									  {{ category.title }}
								  </span>
									<TimeAuthor :time="article.date"/>
								</div>
							</RouterLink>
						</li>
					</ul>
				</section>
			</div>
		</template>

		<section v-if="posters.length > 0" class="mt-32">
			<h2 class="text-2xl font-extrabold border-b-2 pb-8 mb-8">
				Filmové plakáty
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-6 gap-8 pb-16">
				<div v-for="poster in posters"
					 class="mb-8 relative flex flex-col transform transition duration-1 ease-out hover:scale-[1.01]"
					 :key="poster.id">
					<picture>
						<template v-if="poster.featured_media">
							<source :srcset="transformImage(poster.featured_media, 'tr:w-250,h-370,f-webp')"
									type="image/webp">
							<source :srcset="transformImage(poster.featured_media, 'tr:w-250,h-370,f-jpg')"
									type="image/jpg">
							<img
								class="mb-8 h-full w-full shrink object-cover rounded"
								:src="transformImage(poster.featured_media, 'tr:w-250,h-370,f-jpg')"
							>
						</template>
						<img
							v-else
							class="mb-8 h-full w-full shrink object-cover rounded"
							src="https://picsum.photos/1296/1920"
						>
					</picture>
					<p class="text-sm text-center mt-4">{{ poster.title }}</p>
					<a
						:href="transformImage(poster.featured_media, 'tr:w-1296,h-1920,f-jpg')"
						@click.prevent="lightbox = transformImage(poster.featured_media, 'tr:w-1296,h-1920,f-jpg')"
						target="_blank"
						class="absolute inset-0 opacity-0"
					>
						Zobrazit
					</a>
				</div>
			</div>
		</section>

		<teleport to="body">
			<aside v-if="lightbox" class="fixed inset-0 z-10 flex justify-center items-center" @click="lightbox = null">
				<div class="absolute inset-0 bg-gray-500 opacity-80"/>
				<div class="relative z-20 w-full max-w-[80vw] h-full max-h-[80vh]">
					<LoadingIcon class="w-[120px] h-[120px] absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
					<img
						@click.stop=""
						class="relative z-20 h-full mx-auto"
						:src="lightbox"
					>
				</div>
				<button @click="lightbox = null" class="absolute top-3.5 right-3.5 text-white text-6xl hover:scale-150">
					&times;
				</button>
			</aside>
		</teleport>

		<LoadingIcon v-if="loading" class="w-[120px] h-[120px] mx-auto"/>

		<!--		<aside v-if="pagination.page < pagination.pages" class="text-center mt-8 font-mono">-->
		<!--			&lt;!&ndash;<RouterLink :to="{path: '/', query: {p: pagination.page + 1}}">&downarrow; <span class="underline underline-offset-2 hover:no-underline">Načíst více</span></RouterLink>&ndash;&gt;-->
		<!--			<button @click="fetchPosts(true)">&downarrow; <span class="underline underline-offset-2 hover:no-underline">Načíst více</span></button>-->
		<!--		</aside>-->
	</main>
</template>
