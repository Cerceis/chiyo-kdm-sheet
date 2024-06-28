<template>
	<div class="pa-1">
		<div class="text-caption caption">Settlement sheet version: {{ s.v }}</div>
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
						<input type="text" v-model="timeline.text" style="width: 350px;">
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
							<input type="text" v-model="s.milestones[i].text" style="width: 300px" />
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
				</tr>
				<tr>
					<td>
						<input @keyup="filterResources" v-model="resourceKeyword" type="text" placeholder="Search keyword">
					</td>
					<td align="right">
						<v-btn size="24" color="primary" @click="s.resourceStorage.sort((a,b) => a.text.localeCompare(b.text))">
							<v-icon>mdi-sort-alphabetical-ascending</v-icon>
						</v-btn>
					</td>
					<td>
						<v-btn @click="s.resourceStorage.push({id: Generate.objectId(), text:'', count:1, show: true})" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</td>
				</tr>
				<template v-for="(v, i) in s.resourceStorage">
					<tr v-if="s.resourceStorage[i].show">
						<td>
							<input @keyup="triggerNewLine($event, () => s.resourceStorage.push({id: Generate.objectId(), text:'', count:1, show: true}) )" type="text" v-model="s.resourceStorage[i].text" />
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
				</template>
			</table>
			<v-divider vertical />
			<table>
				<tr>
					<td>Gear Storage</td>
				</tr>
				<tr>
					<td>
						<input @keyup="filterGears" v-model="gearKeyword" type="text" placeholder="Search keyword">
					</td>
					<td align="right">
						<v-btn size="24" color="primary" @click="s.gearStorage.sort((a,b) => a.text.localeCompare(b.text))">
							<v-icon>mdi-sort-alphabetical-ascending</v-icon>
						</v-btn>
					</td>
					<td>
						<v-btn @click="s.gearStorage.push({id: Generate.objectId(), text:'', count:1, show: true})" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</td>
				</tr>
				<template v-for="(v, i) in s.gearStorage">				
					<tr v-if="s.gearStorage[i].show">
						<td>
							<input @keyup="triggerNewLine($event, () => s.gearStorage.push({id: Generate.objectId(), text:'', count:1, show: true}) )" type="text" v-model="s.gearStorage[i].text" />
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
				</template>
			</table>
		</div>
		<v-divider class="my-2" />
		<div>
			<div>
				Survivors 
				<v-btn @click="showSelectSurvivorDialog = true" color="success" size="24">
					<v-icon>mdi-plus</v-icon>
				</v-btn>	
			</div>
			<div class="survivorGrid mt-3">
				<div 
					v-for="survivor in settlementSurvivors"
					class="survivorItem"
				>
					<span>{{ survivor.name }}</span>
					<v-divider class="my-1"/>
					<CharacterSummary :c="survivor" :monster-controller-id="monsterController" />
					<v-divider class="my-1"/>
					<div class="d-flex justify-end gap-1">
						<ToolTip text="Set as monster controller">
							<v-btn
								v-bind="props"
								@click="$event.stopPropagation(); monsterController = survivor.id"
								color="primary"
								size="32"
							>
								<v-icon>mdi-brain</v-icon>
							</v-btn>
						</ToolTip>
						<ToolTip v-if="swapFromId" text="Swap to here">
							<v-btn
								@click="swap(survivor.id)"
								color="warning" size="32"
							>
								<v-icon>mdi-target</v-icon>
							</v-btn>
						</ToolTip>
						<ToolTip v-else text="Swap position">
							<v-btn
								@click="swapFromId = survivor.id"
								color="primary" size="32"
							>
								<v-icon>mdi-swap-horizontal-bold</v-icon>
							</v-btn>
						</ToolTip>
						<ToolTip text="Check out">
							<v-btn
								@click="selectedSurvivorToCheckOut = survivor; showSelectedSurvivorDialog = true;"
								color="primary" size="32"
							>
								<v-icon>mdi-magnify</v-icon>
							</v-btn>
						</ToolTip>
					</div>
				</div>
			</div>
		</div>
		<v-divider class="mt-1" />
		<!----Notes---->
		<div class="d-flex justify-center pb-3">
			<div>
				Notes
				<textarea v-model="s.notes" cols="100" rows="5"></textarea>
			</div>
		</div>
		<!----Select survivor---->
		<v-dialog v-model="showSelectSurvivorDialog" persistent>
			<v-sheet>
				<div class="d-flex justify-space-between align-center ml-2 mb-2">
					Add survivor to settlement
					<v-btn
					   @click="showSelectSurvivorDialog = false"
					   color="error" size="32"
					>
					   <v-icon>mdi-close</v-icon>
					</v-btn>
				</div>
				<div class="mx-3 styledRow">
					<v-btn
					   @click="s.survivorIds = characters.map(c => c.id)"
					   color="success"
					>
						<v-icon>mdi-checkbox-marked</v-icon>
					   Check All
					</v-btn>
					<v-btn
					   @click="s.survivorIds = []"
					   color="error"
					>
						<v-icon>mdi-checkbox-blank-off-outline</v-icon>
					   Uncheck All
					</v-btn>
					<v-btn
					   @click="characterFunc.new()"
					   color="success"
					>
						<v-icon>mdi-plus</v-icon>
					   New survivor
					</v-btn>
					<v-text-field
						v-model="selectSurviorKeyword"
						variant="outlined"
						density="compact"
						hide-details
						placeholder="Search name..."
					/>
				</div>
				<v-table>
					<thead>
						<tr>
							<th>Add</th>
							<th>Name</th>
							<th>Status</th>
							<th>XP</th>
							<th>Sur</th>
							<th>Mov</th>
							<th>Acc</th>
							<th>Str</th>
							<th>Eva</th>
							<th>Luc</th>
							<th>Spd</th>
							<th>Lum</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="survivor in filteredSurvivor">
							<td>
								<input v-model="props.s.survivorIds" type="checkbox" class="largeCheckbox" :value="survivor.id" />
							</td>
							<td>{{ survivor.name }}</td>
							<td>
								<div class="styledRowDense">
									<ToolTip text="Gender" v-if="survivor.gender.m || survivor.gender.f">
										<v-icon>{{ survivor.gender.m ? "mdi-gender-male" : survivor.gender.f ? "mdi-gender-female" : ""}}</v-icon>
									</ToolTip>
									<ToolTip text="Monster Controller" v-if="survivor.id === monsterController">
										<v-icon color="warning">mdi-brain</v-icon>
									</ToolTip>
									<ToolTip text="Dead" v-if="survivor.dead">
										<v-icon color="red">mdi-emoticon-dead-outline</v-icon>
									</ToolTip>
									<ToolTip text="Cannot use Fighting Arts" v-if="survivor.fightingArts.locked">
										<KDMIcon icon="FightCancel" :size="24" />
									</ToolTip>
									<ToolTip text="Skip hunt" v-if="survivor.abilitiesNImpairments.locked">
										<KDMIcon icon="HuntCancel" :size="24" />
									</ToolTip>
								</div>
							</td>
							<td>{{ survivor.huntExp.reduce((a,b) => a + (b.value ? 1 : 0),0) }}</td>
							<td>{{ survivor.survival.value }}</td>
							<td>{{ survivor.movement.base + survivor.movement.gear }}</td>
							<td>{{ survivor.accuracy.base + survivor.accuracy.gear }}</td>
							<td>{{ survivor.strength.base + survivor.strength.gear }}</td>
							<td>{{ survivor.evasion.base + survivor.evasion.gear }}</td>
							<td>{{ survivor.luck.base + survivor.luck.gear }}</td>
							<td>{{ survivor.speed.base + survivor.speed.gear }}</td>
							<td>{{ survivor.lumi.base + survivor.lumi.gear }}</td>
						</tr>
					</tbody>
				</v-table>
			</v-sheet>
		</v-dialog>
		<!----Selected survivor---->
		<v-dialog v-model="showSelectedSurvivorDialog" persistent>
			<v-sheet v-if="selectedSurvivorToCheckOut">
				<div class="d-flex justify-space-between align-center ml-2 mb-2">
					Check out survivor
					<v-btn
					   @click="showSelectedSurvivorDialog = false"
					   color="error" size="32"
					>
					   <v-icon>mdi-close</v-icon>
					</v-btn>
				</div>
				<CharacterSheet :c="selectedSurvivorToCheckOut" />
			</v-sheet>
		</v-dialog>
	</div>
</template>
 
<script setup lang="ts">
import { Generate } from "cerceis-lib";
import { Settlement } from "@/logics/settlement";
import { characters, monsterController, characterFunc, Character } from "@/logics/character";
import CharacterSummary from "@/components/CharacterSummary.vue";
import CharacterSheet from '@/components/CharacterSheet.vue';
import { PropType, ref, Ref, computed } from "vue";

const showSelectSurvivorDialog: Ref<boolean> = ref(false);
const showSelectedSurvivorDialog: Ref<boolean> = ref(false);
const selectSurviorKeyword: Ref<string> = ref("");
const selectedSurvivorToCheckOut: Ref<Character | null> = ref(null);

const props = defineProps({
	s:{
		type: Object as PropType<Settlement>,
		required: true,
	}
})

const triggerNewLine = (e: KeyboardEvent, func: Function) => {
	if(!e || !e.code) return;
	if(e.code === "Enter"){
		func();
		setTimeout(() => {
			const t = e.target as HTMLElement || null
			if(!t) return;
			t.closest("tr")?.nextElementSibling?.querySelector("input")?.focus();
		}, 50);
	}
}

const resourceKeyword: Ref<string> = ref("");
const gearKeyword: Ref<string> = ref("");

const filterResources = () => {
	const fixedWord = resourceKeyword.value.toUpperCase();
	if(fixedWord === ""){
		for(let i = 0; i<props.s.resourceStorage.length; i++){
			props.s.resourceStorage[i].show = true;
		}	
		return;
	}
	for(let i = 0; i<props.s.resourceStorage.length; i++){
		if(props.s.resourceStorage[i].text.toUpperCase().includes(fixedWord)){
			props.s.resourceStorage[i].show = true
		}else{
			props.s.resourceStorage[i].show = false
		}
	}
}

const filterGears = () => {
	const fixedWord = gearKeyword.value.toUpperCase();
	if(fixedWord === ""){
		for(let i = 0; i<props.s.gearStorage.length; i++){
			props.s.gearStorage[i].show = true;
		}	
		return;
	}
	for(let i = 0; i<props.s.gearStorage.length; i++){
		if(props.s.gearStorage[i].text.toUpperCase().includes(fixedWord)){
			props.s.gearStorage[i].show = true
		}else{
			props.s.gearStorage[i].show = false
		}
	}
}

const settlementSurvivors = computed(() => {
	return characters.value.filter(c => props.s.survivorIds.includes(c.id))
})

const filteredSurvivor = computed(() => {
	return characters.value.filter(c => c.name.toUpperCase().includes(selectSurviorKeyword.value.toUpperCase()))
})

// Swap
const swapFromId: Ref<string> = ref("");
const swap = (toId: string) => {
	if(!swapFromId.value || !toId) return;
	characterFunc.swap(swapFromId.value, toId);
	swapFromId.value = "";
}


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
.survivorGrid{
	display: grid;
	gap: .25em;
	grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
}
.survivorItem{
	display: grid;
	align-items: space-between;
	min-height: 180px;
	width: 250px;
	min-width: 250px;
	padding: .25em;
	border-radius: .5em;
	border: 1px solid rgba(255,255,255,.3);
}
</style>