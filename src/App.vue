<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router';
import { useHead } from '@unhead/vue';
import {onMounted, ref} from 'vue';
import router from "@/router";

useHead({ titleTemplate: (title?: string) => !title ? 'Movie Surfers' : `${title} - Movie Surfers` });
const route = useRoute();
const categories = ref([]);
onMounted(async () => {
	try {
		const result = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
		categories.value = await result.json();

		if (result.status !== 200) {
			throw new Error(categories.value?.message);
		}
	} catch (e) {
		categories.value = [];
	}
});
</script>

<template>
	<div class="px-8">
		<header class="container py-16 md:py-32 mx-auto text-center border-b-2 border-slate-800">
			<div class="flex justify-between items-center">
				<h1 class="text-4xl font-extrabold"><RouterLink to="/">Movie Surfers</RouterLink></h1>
				<nav>
					<ul class="flex space-x-16">
						<template v-for="category in categories" :key="category.id">
							<li v-if="['Recenze', 'Trailer', 'Kultovky'].includes(category.name)">
								<RouterLink
									:to="`/${category.slug}--${category.id}/`"
									class="underline"
									:class="{
										'font-bold': router.currentRoute.value.fullPath === `/${category.slug}/`
									}"
								>{{ category.name }}</RouterLink>
							</li>
						</template>
					</ul>
				</nav>
			</div>
		</header>

		<router-view :key="router.currentRoute.value.fullPath" v-slot="{ Component }">
			<keep-alive include="HomeView">
				<component :is="Component" />
			</keep-alive>
		</router-view>

		<footer class="container py-16 mx-auto border-t-2 text-gray-500 text-sm text-right">
			&copy; {{ (new Date()).getFullYear() }} Všechna práva vyhrazena.
		</footer>
	</div>
</template>

<style lang="scss">
html,
body {
	@apply font-light;
}
</style>
