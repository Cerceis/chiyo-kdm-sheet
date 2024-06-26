<template>
	<ToolTip :text="text">
		<v-icon size="small">mdi-help-circle</v-icon>		
	</ToolTip>
</template>
 
<script setup lang="ts">
defineProps({
	text: {
		type: String,
		default: ""
	}
})
</script>
 
<style scoped>
 
</style>