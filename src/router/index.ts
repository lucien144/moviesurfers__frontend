import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MovieView from '../views/MovieView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/aktualne/:slug',
			name: 'aktualne',
			component: MovieView,
			props: { type: 'news' },
		},
		{
			path: '/:category/:slug',
			name: 'movie',
			component: MovieView,
			props: { type: 'posts' },
		},
	],
});

export default router;
