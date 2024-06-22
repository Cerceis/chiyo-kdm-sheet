<template>
	<img :width="size" :height="size" :src="imgSrc"  />
</template>
 
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
	icon:{
		type: String,
		require: true,
	},
	size: {
		type: Number,
		default: 24
	}
})
 
const imgSrc = computed(() => {
    const path = new URL('@/assets/images/', import.meta.url);
    return `${path}/${props.icon}.png`
});
</script>
 
<style scoped>
 
</style>