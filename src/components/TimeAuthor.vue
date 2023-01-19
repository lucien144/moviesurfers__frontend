<script setup lang="ts">
import {computed, defineProps} from 'vue';
import dayjs from 'dayjs';

const props = defineProps<{
	time: string,
	author: string,
}>();

const avatarImage = computed(() => new URL(`/src/assets/images/avatar-${props.author}.jpg`, import.meta.url).href);
</script>

<template>
	<div class="flex items-center space-x-8 text-xs font-semibold">
		<img :src="avatarImage" class="rounded-full w-[30px]" :title="props.author">
		<time v-text="dayjs(props.time).format('DD. MM. YYYY')"/>
	</div>
</template>

<style lang="scss" scoped>
</style>
