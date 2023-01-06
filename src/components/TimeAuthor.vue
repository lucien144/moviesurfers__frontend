<script setup lang="ts">
import { defineProps } from 'vue';
import dayjs from 'dayjs';

const props = defineProps<{
	time: string,
	author: string,
}>();
</script>

<template>
	<p class="font-mono text-xs"><time v-text="dayjs(props.time).format('DD. MM. YYYY')"/> / {{ props.author }}</p>
</template>
