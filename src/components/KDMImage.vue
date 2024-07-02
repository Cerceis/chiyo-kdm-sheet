<template>
	<img :width="w" :height="h" :src="getImgSrc(src)"  />
</template>
 
<script setup lang="ts">
import { getImgSrc } from "@/logics/global";

defineProps({
	src:{
		type: String,
		required: true,
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
</script>
 
<style scoped>
 
</style>