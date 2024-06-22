<template>
	<div class="ma-1 d-flex gap-1 align-center">
		Chiyo KDM Sheet 
		<v-btn  color="primary" size="small" @click="characterFunc.new()">New</v-btn>
	</div>
</template>
 
<script setup lang="ts">
import { characterFunc } from "@/logics/character";
import { onMounted } from "vue";

onMounted(() => {
	characterFunc.new();
})
</script>
 
<style scoped>
 
</style>