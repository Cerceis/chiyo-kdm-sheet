<template>
	<div class="ma-1 d-flex gap-1 align-center">
		Chiyo KDM Sheet 
		<div class="caption text-caption">v0.9</div>
		<v-btn  color="primary" size="small" @click="characterFunc.new()">
			<v-icon>mdi-plus</v-icon>
			New Survivor
		</v-btn>
		<v-btn  color="primary" size="small" @click="characterFunc.new()">
			<v-icon>mdi-export</v-icon>
			Export
		</v-btn>
		<v-btn  color="primary" size="small" @click="characterFunc.new()">
			<v-icon>mdi-import</v-icon>
			Import
		</v-btn>
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