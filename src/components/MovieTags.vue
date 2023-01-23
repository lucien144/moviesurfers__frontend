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
				{'bg-film hidden': tag.slug === 'film'},
				{'bg-serial': tag.slug === 'serial'},
				{'bg-hry': tag.slug === 'hry'},
				{'bg-kultovky': tag.slug === 'kultovky'},
			]"
			v-text="tag.title"
		/>
	</ul>
</template>
