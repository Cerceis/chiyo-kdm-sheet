<template>
	<div class="pa-2">
		<div class="d-flex justify-center">
			<div class="grid align-start">
				<div class="styledRow w-100">
					Name
					<input v-model="c.name"/>
					<v-checkbox v-model="c.gender.m" label="M" density="compact" hide-details/>
					<v-checkbox v-model="c.gender.f" label="F" density="compact" hide-details/>
					<v-checkbox v-model="c.dead" label="Dead" density="compact" hide-details/>
				</div>
				<v-divider class="mb-2" />
				<div class="text-caption caption">When you name your survivor, gain +1 survival</div>
				<div class="borderTable w-100">
					<div class="styledRow">
						<BoxInput v-model="c.survival.value" />
						<div class="grid">
							Survival
							<div class="styledRowDense">
								<v-checkbox v-model="c.survival.locked" density="compact" hide-details/>
								<span class="text-caption styledRow">
									<KDMIcon icon="Lock" :size="16" />Cannot spend survival
								</span>
							</div>
						</div>
						<div>
							<div class="styledRow"><input class="largeCheckbox" v-model="c.survival.dodge" type="checkbox"><div class=text-caption>Dodge</div></div>
							<div class="styledRow"><input class="largeCheckbox" v-model="c.survival.encourage" type="checkbox"><div class=text-caption>Encourage</div></div>
							<div class="styledRow"><input class="largeCheckbox" v-model="c.survival.surge" type="checkbox"><div class=text-caption>Surge</div></div>
							<div class="styledRow"><input class="largeCheckbox" v-model="c.survival.dash" type="checkbox"><div class=text-caption>Dash</div></div>
							<div class="styledRow"><input class="largeCheckbox" v-model="c.survival.endure" type="checkbox"><div class=text-caption>Endure</div></div>
						</div>
					</div>
				</div>
				<div class="borderTable w-100">
					<div class="text-captio n caption">Base + Gear</div>
					<div class="d-flex gap-1">
						<div class="grid justify-center">
							<BoxInput :v1="c.movement.base" :v2="c.movement.gear" @v1="c.movement.base = $event" @v2="c.movement.gear = $event" twin />
							<div class="text-caption">Movement</div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.accuracy.base" :v2="c.accuracy.gear" @v1="c.accuracy.base = $event" @v2="c.accuracy.gear = $event" twin />
							<div class="text-caption">Accuracy</div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.strength.base" :v2="c.strength.gear" @v1="c.strength.base = $event" @v2="c.strength.gear = $event" twin />
							<div class="text-caption">Strength</div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.evasion.base" :v2="c.evasion.gear" @v1="c.evasion.base = $event" @v2="c.evasion.gear = $event" twin />
							<div class="text-caption">Evasion</div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.luck.base" :v2="c.luck.gear" @v1="c.luck.base = $event" @v2="c.luck.gear = $event" twin />
							<div class="text-caption">Luck</div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.speed.base" :v2="c.speed.gear" @v1="c.speed.base = $event" @v2="c.speed.gear = $event" twin />
							<div class="text-caption">Speed</div>
						</div>
					</div>
				</div>
				<div class="borderTable w-100">
					<table>
						<tr>
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.brain.insanity"/> <div class="text-caption">Insanity</div>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between">
									Brain<div class="text-caption caption">If your insanity is 3+, you are insane.</div>							
								</div>
							</td>
							<td>
								<v-checkbox v-model="c.brain.injury.light" density="compact" hide-details/>
							</td>
						</tr>
						<tr>
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.head.armor"/>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between">
									<span class="styledRow"> <KDMIcon icon="Head" />Head</span><div class="text-caption caption">Heavy Injury: Knocked Down</div>							
								</div>
							</td>
							<td>
								<v-checkbox v-model="c.head.injury.heavy" label="H" color="error" density="compact" hide-details/>
							</td>
						</tr>
						<tr>
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.arms.armor"/>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between">
									<span class="styledRow"> <KDMIcon icon="Arms" />Arms</span><div class="text-caption caption">Heavy Injury: Knocked Down</div>							
								</div>
							</td>
							<td>
								<div class="d-flex">
									<v-checkbox v-model="c.arms.injury.light" label="L" density="compact" hide-details/>
									<v-checkbox v-model="c.arms.injury.heavy" label="H" color="error" density="compact" hide-details/>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.body.armor"/>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between">
									<span class="styledRow"> <KDMIcon icon="Body" />Body</span><div class="text-caption caption">Heavy Injury: Knocked Down</div>							
								</div>
							</td>
							<td>
								<div class="d-flex">
									<v-checkbox v-model="c.body.injury.light" label="L" density="compact" hide-details/>
									<v-checkbox v-model="c.body.injury.heavy" label="H" color="error" density="compact" hide-details/>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.waist.armor"/>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between">
									<span class="styledRow"> <KDMIcon icon="Waist" />Waist</span><div class="text-caption caption">Heavy Injury: Knocked Down</div>							
								</div>
							</td>
							<td>
								<div class="d-flex">
									<v-checkbox v-model="c.waist.injury.light" label="L" density="compact" hide-details/>
									<v-checkbox v-model="c.waist.injury.heavy" label="H" color="error" density="compact" hide-details/>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.legs.armor"/>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between">
									<span class="styledRow"> <KDMIcon icon="Legs" />Legs</span><div class="text-caption caption">Heavy Injury: Knocked Down</div>							
								</div>
							</td>
							<td>
								<div class="d-flex">
									<v-checkbox v-model="c.legs.injury.light" label="L" density="compact" hide-details/>
									<v-checkbox v-model="c.legs.injury.heavy" label="H" color="error" density="compact" hide-details/>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<v-divider class="mx-1" vertical />
			<div>
				<div class="styledRow">
					Hunt XP
					<div class="d-flex gap-1">
						<input v-for="exp in c.huntExp" type="checkbox" :class="exp.type === 2 ? 'checkT2' : exp.type === 3 ? 'checkT3' : '' " v-model="exp.value" />
					</div>
				</div>
				<v-divider />
				<div class="styledRow">
					<div class="square" style="background-color: rgb(255, 134, 233);"></div><KDMIcon icon="Book" :size="16"/> <span class="text-caption">Age</span>
					<div class="styledRowDense">
						<div class="square" style="background-color: rgb(255, 134, 233);"></div>
						<div class="square" style="background-color: rgb(255, 134, 233);"></div>
					</div>
					<KDMIcon icon="Book" :size="16"/> <span class="text-caption">Age</span>
					<div class="styledRowDense">
						<div class="square" style="background-color: rgb(255, 134, 233);"></div>
						<div class="square" style="background-color: rgb(255, 134, 233);"></div>
						<div class="square" style="background-color: rgb(255, 134, 233);"></div>
					</div>
					<KDMIcon icon="Book" :size="16"/> <span class="text-caption">Age</span>
					<div class="styledRowDense">
						<div class="square" style="background-color: rgb(255, 134, 233);"></div>
						<div class="square" style="background-color: rgb(255, 134, 233);"></div>
						<div class="square" style="background-color: rgb(255, 134, 233);"></div>
						<div class="square" style="background-color: rgb(255, 134, 233);"></div>
					</div>
					<KDMIcon icon="Book" :size="16"/> <span class="text-caption">Age</span>
					<div class="square" style="background-color: rgb(255, 247, 0);"></div><span class="text-caption">Retired</span>
				</div>
				<div class="borderTable w-100 d-flex gap-1 align-center">
					<div class="grid">
						Weapon Proficiency
						<div class="styledRow text-caption">
							Type: <input v-model="c.weaponProficiency.type"/>
						</div>
						<div class="text-caption caption">Select before hunt</div>
					</div>
					<div>
						<div class="d-flex gap-1">
							<input v-for="wpLevel in c.weaponProficiency.level" type="checkbox" :class="wpLevel.type === 2 ? 'checkT2' : '' " v-model="wpLevel.value" />
						</div>
						<div class="styledRow">
							<div class="square" style="background-color: rgb(255, 134, 233);"></div><span class="text-caption">Specialist</span>
							<div class="styledRowDense">
								<div class="square" style="background-color: rgb(255, 134, 233);"></div>
								<div class="square" style="background-color: rgb(255, 134, 233);"></div>
							</div>
							<span class="text-caption">Master</span>
						</div>
					</div>
				</div>
				<div class="d-flex">
					<div class="borderTable">
						Courage
						<div class="d-flex gap-1 my-1">
							<input v-for="cLevel in c.courage.level" type="checkbox" :class="cLevel.type === 2 ? 'checkT2' : '' " v-model="cLevel.value" />
						</div>
						<div class="styledRow">
							<div class="square" style="background-color: rgb(255, 134, 233);"></div><span class="text-caption">Bold</span>
							<div class="styledRowDense">
								<div class="square" style="background-color: rgb(255, 134, 233);"></div>
								<div class="square" style="background-color: rgb(255, 134, 233);"></div>
							</div>
							<span class="text-caption">See the Truth</span>
						</div>
						<v-divider/>
						<table>
							<tr>
								<td><v-checkbox v-model="c.courage.stalwart" density="compact" hide-details/></td>
								<td>									
									<div style="font-size: 14px;">
										<span class="font-weight-bold">Stalwart</span>:
										Can't be knocked down<br>
										by brain trauma or intimidate 
									</div>
								</td>
							</tr>
							<tr>
								<td><v-checkbox v-model="c.courage.prepared" density="compact" hide-details/></td>
								<td>									
									<div style="font-size: 14px;">
										<span class="font-weight-bold">Prepared</span>:
										Add Hunt XP to your<br>
										roll when determining a stranggler
									</div>
								</td>
							</tr>
							<tr>
								<td><v-checkbox v-model="c.courage.matchmaker" density="compact" hide-details/></td>
								<td>									
									<div style="font-size: 14px;">
										<span class="font-weight-bold">Matchmaker</span>:
										Spend 1 endeavor<br>
										to trigger intimacy story event
									</div>
								</td>
							</tr>
						</table>
					</div>
					<div class="borderTable">
						Understanding
						<div class="d-flex gap-1 my-1">
							<input v-for="cLevel in c.understanding.level" type="checkbox" :class="cLevel.type === 2 ? 'checkT2' : '' " v-model="cLevel.value" />
						</div>
						<div class="styledRow">
							<div class="square" style="background-color: rgb(255, 134, 233);"></div><span class="text-caption">Insight</span>
							<div class="styledRowDense">
								<div class="square" style="background-color: rgb(255, 134, 233);"></div>
								<div class="square" style="background-color: rgb(255, 134, 233);"></div>
							</div>
							<span class="text-caption">White Secret</span>
						</div>
						<v-divider/>
						<table>
							<tr>
								<td><v-checkbox v-model="c.understanding.analyze" density="compact" hide-details/></td>
								<td>									
									<div style="font-size: 14px;">
										<span class="font-weight-bold">Analyze</span>:
										Look at top of AI card<br>
										and return it to the top of the deck
									</div>
								</td>
							</tr>
							<tr>
								<td><v-checkbox v-model="c.understanding.explore" density="compact" hide-details/></td>
								<td>									
									<div style="font-size: 14px;">
										<span class="font-weight-bold">Explore</span>:
										Add +2 to your<br>
										investigate roll results.
									</div>
								</td>
							</tr>
							<tr>
								<td><v-checkbox v-model="c.understanding.tinker" density="compact" hide-details/></td>
								<td>									
									<div style="font-size: 14px;">
										<span class="font-weight-bold">Tinker</span>:
										+1 endeavor when you<br>
										are a returning survivor
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div>
					<table>
						<tr>
							<td>Chronicles</td>
							<td></td>
							<td rowspan="4">
								<div class="mx-1">
									Cause
									<textarea v-model="c.chronicles.cause" type="text" cols="37" rows="4" />
								</div>
							</td>
						</tr>
						<tr><td>Age</td><td><input v-model="c.chronicles.age" type="text" style="max-width: 130px;" /></td></tr>
						<tr><td>Born</td><td><input v-model="c.chronicles.born" type="text" style="max-width: 130px;" /></td></tr>
						<tr><td>Death</td><td><input v-model="c.chronicles.death" type="text" style="max-width: 130px;" /></td></tr>
					</table>
					<v-divider class="my-1" />

					<div class="d-flex justify-center gap-1">

						<table>
							<tr>
								<td>Parents</td><td>
									<v-btn @click="c.family.parents.push('')" color="success" size="24">
										<v-icon>mdi-plus</v-icon>
									</v-btn>	
								</td>
							</tr>
							<tr v-for="(v, i) in c.family.parents">
								<td>
									<input type="text" v-model="c.family.parents[i]" />
								</td>
								<td>
									<v-btn @click="c.family.parents.splice(i, 1)" color="error" size="24">
										<v-icon>mdi-close</v-icon>
									</v-btn>	
								</td>
							</tr>
						</table>

						<table>
							<tr>
								<td>Children</td><td>
									<v-btn @click="c.family.childs.push('')" color="success" size="24">
										<v-icon>mdi-plus</v-icon>
									</v-btn>	
								</td>
							</tr>
							<tr v-for="(v, i) in c.family.childs">
								<td>
									<input type="text" v-model="c.family.childs[i]" />
								</td>
								<td>
									<v-btn @click="c.family.childs.splice(i, 1)" color="error" size="24">
										<v-icon>mdi-close</v-icon>
									</v-btn>	
								</td>
							</tr>
						</table>

					</div>

				</div>
			</div>
		</div>
		<v-divider class="my-1" />
		<div class="styledRow align-start justify-center">

			<table>
				<tr>
					<td>
						<div class="styledRowDense">
							<input type="checkbox" v-model="c.fightingArts.locked" class="mr-1"/>
							<span class="text-caption styledRow">
								<KDMIcon icon="Lock" :size="16" />Cannot use Fighting Arts
							</span>
						</div>
					</td>
				</tr>
				<tr>
					<td>Fighting Arts (Max 3)</td><td>
						<v-btn @click="c.fightingArts.values.push('')" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</td>
				</tr>
				<tr v-for="(v, i) in c.fightingArts.values">
					<td :class="c.fightingArts.locked ? 'crossText' : ''">
						<input type="text" v-model="c.fightingArts.values[i]" />
					</td>
					<td>
						<v-btn @click="c.fightingArts.values.splice(i, 1)" color="error" size="24">
							<v-icon>mdi-close</v-icon>
						</v-btn>	
					</td>
				</tr>
			</table>

			<table>
				<tr>
					<td>Disorders (Max 3)</td><td>
						<v-btn @click="c.disorders.values.push('')" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</td>
				</tr>
				<tr v-for="(v, i) in c.disorders.values">
					<td>
						<input type="text" v-model="c.disorders.values[i]" />
					</td>
					<td>
						<v-btn @click="c.disorders.values.splice(i, 1)" color="error" size="24">
							<v-icon>mdi-close</v-icon>
						</v-btn>	
					</td>
				</tr>
			</table>

			<table>
				<tr>
					<td>
						<div class="styledRowDense">
							<input type="checkbox" v-model="c.abilitiesNImpairments.locked" class="mr-1"/>
							<span class="text-caption styledRow">
								<KDMIcon icon="Lock" :size="16" />Skip Next Hunt
							</span>
						</div>
					</td>
				</tr>
				<tr>
					<td>Abilities & Impairments </td><td>
						<v-btn @click="c.abilitiesNImpairments.values.push('')" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</td>
				</tr>
				<tr v-for="(v, i) in c.abilitiesNImpairments.values">
					<td :class="c.abilitiesNImpairments.locked ? 'crossText' : ''">
						<input type="text" v-model="c.abilitiesNImpairments.values[i]" />
					</td>
					<td>
						<v-btn @click="c.abilitiesNImpairments.values.splice(i, 1)" color="error" size="24">
							<v-icon>mdi-close</v-icon>
						</v-btn>	
					</td>
				</tr>
			</table>
			
			<table>
				<tr>
					<td>
						<div class="styledRowDense">
							<input type="checkbox" v-model="c.oncePerLifetime.locked" class="mr-1"/>
							<span class="text-caption styledRow">
								<KDMIcon icon="Lock" :size="16" />Reroll used
							</span>
						</div>
					</td>
				</tr>
				<tr>
					<td>Once Per Lifetime </td><td>
						<v-btn @click="c.oncePerLifetime.values.push('')" color="success" size="24">
							<v-icon>mdi-plus</v-icon>
						</v-btn>	
					</td>
				</tr>
				<tr v-for="(v, i) in c.oncePerLifetime.values">
					<td :class="c.oncePerLifetime.locked ? 'crossText' : ''">
						<input type="text" v-model="c.oncePerLifetime.values[i]" />
					</td>
					<td>
						<v-btn @click="c.oncePerLifetime.values.splice(i, 1)" color="error" size="24">
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
				<textarea v-model="c.notes" cols="100" rows="5"></textarea>
			</div>
		</div>
	</div>
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
</style>