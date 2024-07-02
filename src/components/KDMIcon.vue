<template>
	<img :width="size" :height="size" :src="getImgSrc(icon as string)"  />
</template>
 
<script setup lang="ts">
import { getImgSrc } from "@/logics/global";

defineProps({
	icon:{
		type: String,
		required: true,
	},
	size: {
		type: Number,
		default: 24
	}
})

</script>
 
<style scoped>
 
</style>