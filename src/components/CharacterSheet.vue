<template>
	<v-card class="pa-2">
		<div class="styledRow">
			Name
			<input v-model="c.name"/>
			M<v-checkbox v-model="c.gender.m" density="compact" variant="outlined" hide-details/>
			F<v-checkbox v-model="c.gender.f" density="compact" variant="outlined" hide-details/>
		</div>
		<v-divider class="mb-2" />
		<div class="text-caption caption">When you name your survivor, gain +1 survival</div>
		<div class="borderTable">
			div
			<BoxInput v-model="c.survival.value" />
			<div class="grid gap-1">
				Survival
				<div class="styledRowDense">
					<v-checkbox v-model="c.survival.locked" density="compact" variant="outlined" hide-details/>
					<span class="text-caption styledRow">
						<KDMIcon icon="Lock" :size="16" />Cannot spend survival
					</span>
				</div>
			</div>
			<tr>
				<td class="grid justify-center align-center">
					
				</td>
				<td>
					
				</td>
			</tr>
			<tr>
				<td>
					<div class="grid">
						<div class="styledRowDense">
							<v-checkbox v-model="c.survival.dodge" density="compact" variant="outlined" hide-details/> 
							Dodge
						</div>
						<div class="styledRowDense">
							<v-checkbox v-model="c.survival.encourage" density="compact" variant="outlined" hide-details/> 
							Encourage
						</div>
						<div class="styledRowDense">
							<v-checkbox v-model="c.survival.surge" density="compact" variant="outlined" hide-details/> 
							Surge
						</div>
					</div>
				</td>
				<td>
					<div class="grid">
						<div class="styledRowDense">
							<v-checkbox v-model="c.survival.dash" density="compact" variant="outlined" hide-details/> 
							Dash
						</div>
						<div class="styledRowDense">
							<v-checkbox v-model="c.survival.endure" density="compact" variant="outlined" hide-details/> 
							Endure
						</div>
					</div>
				</td>
			</tr>
		</div>

		
		<KDMIcon icon="Head" />
		<Shield v-model="c.head.armor" />
	</v-card>
</template>
 
<script setup lang="ts">
import { Character } from "@/logics/character";
import { PropType } from "vue";
import KDMIcon from "./KDMIcon.vue";

defineProps({
	c:{
		type: Object as PropType<Character>,
		required: true,
	}
})
 
</script>
 
<style scoped>
.borderTable{
	width: max-content;
	border: 1px solid rgba(255,255,255,.3);
	padding: .5em;
}
</style>