<template>
	<input type="text" id="autocompleteInput" placeholder="Type # to see suggestions...">
</template>
 
<script setup lang="ts">
 
</script>
 
<style scoped>
.autocomplete-suggestions {
	border: 1px solid #d4d4d4;
	border-top: none;
	position: absolute;
	max-height: 150px;
	overflow-y: auto;
	background-color: white;
	z-index: 99;
}

.autocomplete-suggestion {
	padding: 10px;
	cursor: pointer;
}

.autocomplete-suggestion.active {
	background-color: #e9e9e9;
}
</style>