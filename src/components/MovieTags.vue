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
			class="inline p-1 mr-1 bg-amber-400 font-mono uppercase"
			:class="[props.large ? 'text-sm' : 'text-xs']"
			v-text="tag.title"
		/>
	</ul>
</template>
