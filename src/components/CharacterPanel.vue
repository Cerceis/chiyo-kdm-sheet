<template>
	<div class="ma-3">
		<CharacterSheet v-for="char in characters" :c="char" />
	</div>
</template>
 
<script setup lang="ts">
import { characters } from '@/logics/character';
import CharacterSheet from '@/components/CharacterSheet.vue';

</script>
 
<style scoped>
 
</style>