<template>
	<img :width="size" :height="size" :src="getImgSrc()"  />
</template>
 
<script setup lang="ts">

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
 
const getImgSrc = () => {
    return new URL(`../assets/images/${props.icon}.png`, import.meta.url).href;
};
</script>
 
<style scoped>
 
</style>