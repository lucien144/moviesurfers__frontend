<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useHead } from '@unhead/vue';

useHead({ titleTemplate: (title?: string) => !title ? 'Movie Surfers' : `${title} - Movie Surfers` });

</script>

<template>
	<header class="container p-3 md:px-0 md:py-6 mx-auto text-center border-b-2 border-slate-800">
		<h1 class="text-4xl"><RouterLink to="/">Movie Surfers</RouterLink></h1>
		<p class="text-xl m-0 p-0">
			<span class="block py-3">🍿🤙</span>
			<em>Čumět na filmy by nám šlo, psát už moc ne.</em>
		</p>
	</header>

	<router-view v-slot="{ Component }">
		<keep-alive include="HomeView">
			<component :is="Component" />
		</keep-alive>
	</router-view>

	<footer class="container py-6 mx-auto border-t-2 text-gray-500 text-sm text-right font-sans">
		&copy; {{ (new Date()).getFullYear() }} Všechna práva vyhrazena.
	</footer>
</template>

<style lang="scss">
html,
body {
	@apply font-serif;
}
</style>
