<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router';
import { useHead } from '@unhead/vue';
import {onMounted, ref} from 'vue';
import router from "@/router";

useHead({ titleTemplate: (title?: string) => !title ? 'Movie Surfers' : `${title} - Movie Surfers` });
const route = useRoute();
const menus = ref([]);
onMounted(async () => {
	try {
		const result = await fetch(`${import.meta.env.VITE_API_URL}/menus`);
		menus.value = await result.json();

		if (result.status !== 200) {
			throw new Error(menus.value?.message);
		}
	} catch (e) {
		menus.value = [];
	}
});
</script>

<template>
	<div class="px-8">
		<header class="container py-16 md:py-32 mx-auto text-center border-b-2 border-slate-800">
			<div class="flex flex-wrap justify-between items-center">
				<h1 class="text-4xl font-extrabold"><RouterLink to="/">Movie Surfers</RouterLink></h1>
				<nav>
					<ul class="flex space-x-16 mt-16 sm:mt-0">
						<template v-for="main in menus.main" :key="main.id">
							<li>
								<RouterLink
									:to="`${main.url}`"
									class="underline"
									:target="main.target"
									:class="{
										'font-bold': router.currentRoute.value.fullPath === main.url
									}"
								>{{ main.title }}</RouterLink>
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
