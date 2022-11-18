<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
	time: string,
	author: string,
}>();
</script>

<template>
	<p class="font-mono text-xs"><time v-text="props.time"/> / {{ props.author }}</p>
</template>
