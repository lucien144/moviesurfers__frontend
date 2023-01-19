<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useHead } from '@unhead/vue';

useHead({ titleTemplate: (title?: string) => !title ? 'Movie Surfers' : `${title} - Movie Surfers` });

</script>

<template>
	<div class="px-8">
		<header class="container py-16 md:py-32 mx-auto text-center border-b-2 border-slate-800">
			<h1 class="text-4xl font-extrabold"><RouterLink to="/">Movie Surfers</RouterLink></h1>
		</header>

		<router-view v-slot="{ Component }">
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
