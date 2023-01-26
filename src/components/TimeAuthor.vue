<script setup lang="ts">
import {computed, defineProps} from 'vue';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/cs';
dayjs.locale('cs');
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);


const props = defineProps<{
	time: string,
	author: string,
}>();

const formatDate = () => {
	if (dayjs().diff(dayjs(props.time), 'd') <= 14) {
		return dayjs().to(dayjs(props.time));
	}

	if (dayjs(props.time).get('y') === dayjs().get('y')) {
		return dayjs(props.time).format('DD. MM.');
	}

	return dayjs(props.time).format('DD. MM. YY');
};

const avatarImage = computed(() => new URL(`/src/assets/images/avatar-${props.author}.jpg`, import.meta.url).href);
</script>

<template>
	<div class="flex items-center space-x-8 text-xs font-semibold">
		<img v-if="props.author" :src="avatarImage" class="rounded-full w-[30px]" :title="props.author">
		<time v-text="formatDate()" class="whitespace-nowrap"/>
	</div>
</template>

<style lang="scss" scoped>
</style>
