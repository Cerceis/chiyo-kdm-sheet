<template>
	<div class="pa-2">
		<div class="styledRow">
			<div>
				<input v-model="s.settlementName" type="text">
				<div class="text-caption caption">
					When the settlement is named for the first time, returning survivors gain +1 survival.
				</div>
			</div>
			<v-divider vertical />
			<div class="grid justify-center">
				Survival Limit
				<BoxInput v-model="s.survivalLimit" />
			</div>
			<div class="grid justify-center">
				Population
				<BoxInput v-model="s.population" />
			</div>
			<div class="grid justify-center">
				Death Count
				<BoxInput v-model="s.deathCount" />
			</div>
			<div class="grid justify-center">
				Lost Settlements
				<BoxInput v-model="s.lostSettlements" />
			</div>
		</div>
		<v-divider class="my-1"/>
		<div class="styledRow align-start">
			<table class="tableWithBorder">
				<tr>
					<th></th><th>Year</th><th>Events</th>
				</tr>
				<tr v-for="timeline in s.timeline">
					<td>
						<input class="largeCheckbox" v-model="timeline.value" type="checkbox">
					</td>
					<td class="borderLeft">LY {{timeline.year}}</td>
					<td>
						<input type="text" v-model="timeline.text" style="width: 280px;">
					</td>
				</tr>
			</table>
			<div class="grid justify-center">
				<div class="borderTable styledRow">
					<div>
						Lantern Research Level
						<div class="text-caption caption">
							Your settlements progress researching the secrets of the Final Lantern.
						</div>
					</div>
					<BoxInput />
				</div>
				<table>
					<tr>
						<td>Monster Volumes</td>
						<td>
							<v-btn @click="s.monsterVolumes.push('')" color="success" size="24">
								<v-icon>mdi-plus</v-icon>
							</v-btn>	
						</td>
					</tr>
					<tr v-for="(v, i) in s.monsterVolumes">
						<td>
							<input type="text" v-model="s.monsterVolumes[i]" />
						</td>
						<td>
							<v-btn @click="s.monsterVolumes.splice(i, 1)" color="error" size="24">
								<v-icon>mdi-close</v-icon>
							</v-btn>	
						</td>
					</tr>
				</table>
				<table>
					<tr>
						<td colspan="3">Milestone Story Events</td>
						<td>
							<v-btn @click="s.milestones.push({ text: '', se: '', value: false })" color="success" size="24">
								<v-icon>mdi-plus</v-icon>
							</v-btn>	
						</td>
					</tr>
					<tr v-for="(v, i) in s.milestones">
						<td>
							<input type="checkbox" class="mr-1 largeCheckbox" v-model="s.milestones[i].value" />
						</td>
						<td>
							<input type="text" v-model="s.milestones[i].text" style="width: 220px" />
						</td>
						<td>
							<div class="styledRowDense">
								<KDMIcon icon="Book" /><input type="text" v-model="s.milestones[i].se" />
							</div>
						</td>
						<td>
							<v-btn @click="s.milestones.splice(i, 1)" color="error" size="24">
								<v-icon>mdi-close</v-icon>
							</v-btn>	
						</td>
					</tr>
				</table>
				<div>
					<div class="styledRow">
						Principles
						<v-btn @click="s.principles.push(['', {text: '', value: false}, {text: '', value: false}])" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</div>
					<div v-for="(v, i) in s.principles" class="borderTable">
						<div class="d-flex justify-space-between mb-1">
							<input type="text" v-model="s.principles[i][0]" />
							<v-btn @click="s.principles.splice(i, 1)" color="error" size="24">
								<v-icon>mdi-close</v-icon>
							</v-btn>	
						</div>
						<div class="styledRow">
							<input class="largeCheckbox" type="checkbox" v-model="s.principles[i][1].value">
							<input type="text" v-model="s.principles[i][1].text" />
							or
							<input class="largeCheckbox" type="checkbox" v-model="s.principles[i][2].value">
							<input type="text" v-model="s.principles[i][2].text" />
						</div>
					</div>
				</div>
				
				<div class="styledRow align-start">
					<table>
						<tr>
							<td colspan="2">Quarries</td>
							<td>
								<v-btn @click="s.quarries.push({text: '', value: false})" color="success" size="24">
									<v-icon>mdi-plus</v-icon>
								</v-btn>	
							</td>
						</tr>
						<tr v-for="(v, i) in s.quarries">
							<td>
								<input class="largeCheckbox" type="checkbox" v-model="s.quarries[i].value" />
							</td>
							<td>
								<input type="text" v-model="s.quarries[i].text" />
							</td>
							<td>
								<v-btn @click="s.quarries.splice(i, 1)" color="error" size="24">
									<v-icon>mdi-close</v-icon>
								</v-btn>	
							</td>
						</tr>
					</table>
					<v-divider vertical />
					<table>
						<tr>
							<td colspan="2">Nemesis</td>
							<td align="center">1</td><td align="center">2</td><td align="center">3</td>
							<td>
								<v-btn @click="s.namesis.push({text: '', value: false, level: [false, false, false]})" color="success" size="24">
									<v-icon>mdi-plus</v-icon>
								</v-btn>	
							</td>
						</tr>
						<tr v-for="(v, i) in s.namesis">
							<td>
								<input class="largeCheckbox" type="checkbox" v-model="s.namesis[i].value" />
							</td>
							<td>
								<input type="text" v-model="s.namesis[i].text" />
							</td>
							<td><input class="largeCheckbox" type="checkbox" v-model="s.namesis[i].level[0]"></td>
							<td><input class="largeCheckbox" type="checkbox" v-model="s.namesis[i].level[1]"></td>
							<td><input class="largeCheckbox" type="checkbox" v-model="s.namesis[i].level[2]"></td>
							<td>
								<v-btn @click="s.namesis.splice(i, 1)" color="error" size="24">
									<v-icon>mdi-close</v-icon>
								</v-btn>	
							</td>
						</tr>
					</table>
				</div>

			</div>
		</div>
		<v-divider class="my-1"/>
		<div class="styledRow align-start">
			<table>
				<tr>
					<td>Innovations</td>
					<td>
						<v-btn @click="s.innovations.push('')" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</td>
				</tr>
				<tr v-for="(v, i) in s.innovations">
					<td>
						<input type="text" v-model="s.innovations[i]" />
					</td>
					<td>
						<v-btn @click="s.innovations.splice(i, 1)" color="error" size="24">
							<v-icon>mdi-close</v-icon>
						</v-btn>	
					</td>
				</tr>
			</table>
			<v-divider vertical />
			<table>
				<tr>
					<td colspan="2">Settlement Locations</td>
					<td>
						<v-btn @click="s.settlementLocations.push({text: '', value: false})" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</td>
				</tr>
				<tr v-for="(v, i) in s.settlementLocations">
					<td>
						<input class="largeCheckbox" type="checkbox" v-model="s.settlementLocations[i].value" />
					</td>
					<td>
						<input type="text" v-model="s.settlementLocations[i].text" />
					</td>
					<td>
						<v-btn @click="s.settlementLocations.splice(i, 1)" color="error" size="24">
							<v-icon>mdi-close</v-icon>
						</v-btn>	
					</td>
				</tr>
			</table>
			<v-divider vertical />
			<table>
				<tr>
					<td>Resource Storage</td>
					<td></td>
					<td>
						<v-btn @click="s.resourceStorage.push({text:'', count:1})" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</td>
				</tr>
				<tr v-for="(v, i) in s.resourceStorage">
					<td>
						<input type="text" v-model="s.resourceStorage[i].text" />
					</td>
					<td>
						<input type="number" v-model="s.resourceStorage[i].count" style="width:48px" />
					</td>
					<td>
						<v-btn @click="s.resourceStorage.splice(i, 1)" color="error" size="24">
							<v-icon>mdi-close</v-icon>
						</v-btn>	
					</td>
				</tr>
			</table>
			<v-divider vertical />
			<table>
				<tr>
					<td>Gear Storage</td>
					<td></td>
					<td>
						<v-btn @click="s.gearStorage.push({text:'', count:1})" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</td>
				</tr>
				<tr v-for="(v, i) in s.gearStorage">
					<td>
						<input type="text" v-model="s.gearStorage[i].text" />
					</td>
					<td>
						<input type="number" v-model="s.gearStorage[i].count" style="width:48px" />
					</td>
					<td>
						<v-btn @click="s.gearStorage.splice(i, 1)" color="error" size="24">
							<v-icon>mdi-close</v-icon>
						</v-btn>	
					</td>
				</tr>
			</table>
		</div>
		<v-divider class="mt-1" />
		<div class="d-flex justify-center pb-3">
			<div>
				Notes
				<textarea v-model="s.notes" cols="100" rows="5"></textarea>
			</div>
		</div>
	</div>
</template>
 
<script setup lang="ts">
import { Settlement } from "@/logics/settlement";
import { PropType } from "vue";

defineProps({
	s:{
		type: Object as PropType<Settlement>,
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
.checkT2{
	outline: 1px solid rgb(255, 134, 233);
}
.checkT3{
	outline: 1px solid rgb(255, 247, 0);
}
.square{
	min-width: 8px;
	min-height: 8px;
	max-width: 8px;
	max-height: 8px;
	border-radius: 1px;
	border: 1px solid black;;
}
.crossText{
	position: relative;  
}
.crossText:after {
  position: absolute;
  left: 0;
  top: 50%;
  height: 1px;
  background: #c00;
  content: "";
  width: 100%;
  display: block;
}
.tableWithBorder{
	border-collapse: collapse;
}
.tableWithBorder td{
	padding: 0px 4px;
	border-left: 1px solid rgba(255,255,255,.3);
	border-top: 1px solid rgba(255,255,255,.3);
	border-bottom: 1px solid rgba(255,255,255,.3);
}
</style>