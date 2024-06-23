<template>
	<div class="ma-1 d-flex gap-1 align-center">
		Chiyo KDM Sheet 
		<div class="caption text-caption">v0.9</div>
		<v-btn  color="primary" size="small" @click="characterFunc.new()">
			<v-icon>mdi-plus</v-icon>
			New Survivor
		</v-btn>
		<v-btn  color="primary" size="28" @click="characterFunc.new()">
			<v-icon>mdi-export</v-icon>
		</v-btn>
		<v-btn  color="primary" size="28" @click="characterFunc.new()">
			<v-icon>mdi-import</v-icon>
		</v-btn>
		<v-divider vertical />
		<div class="styledRow text-caption">
			Survivors
			<v-switch
				v-model="survivorView"
				hide-details
				density="compact"
			></v-switch>
			Settlement
		</div>
		<v-divider vertical />
		<v-btn
		   @click="save()"
		   class="text-caption"
		>
			<template v-if="saving">
				<v-progress-circular
					color="green"
					indeterminate
					size="24"
				></v-progress-circular>
				Saving...
			</template>
			<template v-else>
				<v-icon color="green">mdi-content-save</v-icon>
				Saved: {{ lastSavedString }}
			</template>
		</v-btn>
		
	</div>
</template>
 
<script setup lang="ts">
import { characterFunc } from "@/logics/character";
import { survivorView } from "@/logics/global";
import { save, saving, lastSavedString } from "@/logics/system";

</script>
 
<style scoped>
 
</style>