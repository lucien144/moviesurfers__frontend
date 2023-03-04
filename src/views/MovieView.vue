<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import LoadingIcon from '@/components/LoadingIcon.vue';
import TimeAuthor from '@/components/TimeAuthor.vue';
import MovieTags from '@/components/MovieTags.vue';

const route = useRoute();
const loading = ref(true);
const movie = ref();

const props = defineProps({ type: String });

onMounted(async () => {
	loading.value = true;
	const result = await fetch(`${import.meta.env.VITE_API_URL}/${props.type}?acf_format=standard&slug=${route.params.slug}`);
	const json = await result.json();
	movie.value = json[0];
	loading.value = false;
	useHead({ title: movie.value.title });

	window.twttr.ready(twttr => {
		twttr.widgets.load();
	});
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

		<article>
			<div class="prose lg:prose-xl mx-auto text-center pb-16">
				<h1 v-html="movie.title"/>
				<div class="flex flex-col items-center not-prose">
					<MovieTags
							class="mb-8"
							large
							:tags="movie.categories"
					/>
					<TimeAuthor :time="movie.date" :author="movie.author.name"/>
				</div>
			</div>

			<iframe
				v-if="movie.acf.youtube_id"
				:src="`https://www.youtube.com/embed/${movie.acf.youtube_id}`"
				:title="movie.title"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			/>
			<img v-else-if="movie.featured_media" :src="movie.featured_media" class="max-h-[80vh] w-full object-cover">

			<div
				v-html="movie.content"
				class="my-32"
			/>

			<ul v-if="movie.tags" class="flex">
				<li
						v-for="tag in movie.tags"
						:key="tag.id"
						class="text-lg italic underline"
				>
					<RouterLink :to="`/tag/${tag.slug}--${tag.id}`">#{{ tag.title }}</RouterLink>
				</li>
			</ul>

			<div v-if="props.type === 'posts'" class="prose lg:prose-xl mx-auto">
				<div class="flex justify-end">
					<div class="w-1/3 md:w-1/5 p-8 text-center bg-amber-400 font-medium">
						<div>
							Hodnocení
							<div class="font-mono text-xs">@{{ movie.author.name }}</div>
						</div>
						<span class="text-6xl">{{ movie.acf.rating }}</span> / 5
					</div>

					<template v-if="movie.acf.rating_others">
						<div
								v-for="(other, key) in movie.acf.rating_others"
								:key="key"
								class="w-1/3 md:w-1/5 p-8 text-center bg-amber-100 font-medium ml-1"
						>
							<div>
								Hodnocení
								<div class="font-mono text-xs">@{{ other.user.nickname }}</div>
							</div>
							<span class="text-6xl">{{ other.rating }}</span> / 5
						</div>
					</template>
				</div>
			</div>
		</article>
	</main>
</template>

<style lang="scss" scoped>
:deep(iframe) {
  @apply w-3/4 aspect-video mx-auto;
}
:deep(p iframe) {
  @apply w-full h-full aspect-video mx-auto;
}

:deep(h2) {
  @apply text-3xl;
}
:deep(h3) {
  @apply text-2xl;
}
:deep(h4) {
  @apply text-xl;
}

:deep(p),
:deep(ul),
:deep(ol),
:deep(h2),
:deep(h3),
:deep(h4) {
  @apply mt-8 prose lg:prose-xl mx-auto;
}

:deep(.twitter-tweet) {
  @apply mx-auto;
}
</style>
