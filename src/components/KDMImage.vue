<template>
	<img :width="w" :height="h" :src="getImgSrc()"  />
</template>
 
<script setup lang="ts">

const props = defineProps({
	src:{
		type: String,
		require: true,
	},
	w:{
		type: String,
		default: ""
	},
	h:{
		type: String,
		default: ""
	}
})
 
const getImgSrc = () => {
    return new URL(`../assets/images/${props.src}.png`, import.meta.url).href;
};
</script>
 
<style scoped>
 
</style>