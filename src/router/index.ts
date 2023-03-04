import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MovieView from '../views/MovieView.vue';
import CategoryView from "@/views/CategoryView.vue";
import TagView from "@/views/TagView.vue";

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
			path: '/:slug--:id/',
			name: 'category',
			component: CategoryView,
		},{
			path: '/tag/:slug--:id/',
			name: 'tag',
			component: TagView,
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
