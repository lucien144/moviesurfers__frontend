<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
	large?: boolean,
	tags: { type: [], default: [] }
}>();
</script>

<template>
	<ul>
		<li
			v-for="tag in props.tags"
			:key="tag"
			class="inline p-4 mr-4 bg-amber-400 font-mono uppercase"
			:class="[
				props.large ? 'text-sm' : 'text-xs',
				{'bg-film': tag.slug === 'film'},
				{'bg-serial': tag.slug === 'serial'},
			]"
			v-text="tag.title"
		/>
	</ul>
</template>
