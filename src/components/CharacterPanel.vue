<template>
	<div class="d-flex justify-center ma-3">
		<v-expansion-panels style="max-width: 900px;">
			<v-expansion-panel v-for="survivor in characters">
				<v-expansion-panel-title>
					<div class="d-flex justify-space-between w-100 align-center">
						{{ survivor.name === '' ? 'Unnamed Survivor' : survivor.name }}
						<div class="styledRow">
							<v-icon>mdi-brain</v-icon>
							<v-btn @click="$event.stopPropagation()" color="primary" size="small">
								Set Monster Controller
							</v-btn>
							<v-btn @click="$event.stopPropagation()" color="primary" size="small">
								Send to graveyard
							</v-btn>
						</div>
					</div>
					
				</v-expansion-panel-title>
				<v-expansion-panel-text>
					<CharacterSheet :c="survivor" />
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>
 
<script setup lang="ts">
import { characters, characterFunc } from '@/logics/character';
import CharacterSheet from '@/components/CharacterSheet.vue';

</script>
 
<style scoped>
 
</style>