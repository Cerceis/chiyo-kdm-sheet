<template>
	<div class="pa-2">
		<div class="d-flex justify-center">
			<div class="grid align-start">
				<div class="text-caption caption">Character sheet version: {{ c.v }}</div>
				<div class="styledRow w-100">
					Name
					<input v-model="c.name"/>
					<v-checkbox v-model="c.gender.m" label="M" density="compact" hide-details/>
					<v-checkbox v-model="c.gender.f" label="F" density="compact" hide-details/>
					<v-checkbox v-model="c.dead" label="Dead" density="compact" hide-details/>
				</div>
				<div class="text-caption caption">When you name your survivor, gain +1 survival</div>
				<div class="borderTable w-100">
					<div class="styledRow">
						<div class="grid">
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
							</div>
							<div class="styledRow">
								<BoxInput v-model="c.survival.systemicPressure" />	
								Systemic Pressure
							</div>
						</div>
						<table style="width:170px">
							<tr>
								<td><input class="largeCheckbox" v-model="c.survival.dodge" type="checkbox"></td>
								<td>Dodge</td>
								<td><HelpIcon :text="gameText.dodge" /></td>
							</tr>
							<tr>
								<td><input class="largeCheckbox" v-model="c.survival.encourage" type="checkbox"></td>
								<td>Encourage</td>
								<td><HelpIcon :text="gameText.encourage" /></td>
							</tr>
							<tr>
								<td><input class="largeCheckbox" v-model="c.survival.surge" type="checkbox"></td>
								<td>Surge</td>
								<td><HelpIcon :text="gameText.surge" /></td>
							</tr>
							<tr>
								<td><input class="largeCheckbox" v-model="c.survival.dash" type="checkbox"></td>
								<td>Dash</td>
								<td><HelpIcon :text="gameText.dash" /></td>
							</tr>
							<tr>
								<td><input class="largeCheckbox" v-model="c.survival.endure" type="checkbox"></td>
								<td>Endure</td>
								<td><HelpIcon :text="gameText.endure" /></td>
							</tr>
							<tr>
								<td><input class="largeCheckbox" v-model="c.survival.fistPump" type="checkbox"></td>
								<td>Fist Pump</td>
								<td><HelpIcon :text="gameText.fistPump" /></td>
							</tr>
						</table>
					</div>
				</div>
				<div class="borderTable w-100">
					<div class="text-captio n caption">Base + Gear</div>
					<div class="d-flex gap-1">
						<div class="grid justify-center">
							<BoxInput :v1="c.movement.base" :v2="c.movement.gear" @v1="c.movement.base = $event" @v2="c.movement.gear = $event" twin />
							<div class="grid text-caption justify-center">Movement <HelpIcon :text="gameText.movement" /> </div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.accuracy.base" :v2="c.accuracy.gear" @v1="c.accuracy.base = $event" @v2="c.accuracy.gear = $event" twin />
							<div class="grid text-caption justify-center">Accuracy <HelpIcon :text="gameText.accuracy" /></div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.strength.base" :v2="c.strength.gear" @v1="c.strength.base = $event" @v2="c.strength.gear = $event" twin />
							<div class="grid text-caption justify-center">Strength <HelpIcon :text="gameText.strength" /></div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.evasion.base" :v2="c.evasion.gear" @v1="c.evasion.base = $event" @v2="c.evasion.gear = $event" twin />
							<div class="grid text-caption justify-center">Evasion <HelpIcon :text="gameText.evasion" /></div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.luck.base" :v2="c.luck.gear" @v1="c.luck.base = $event" @v2="c.luck.gear = $event" twin />
							<div class="grid text-caption justify-center">Luck <HelpIcon :text="gameText.luck" /></div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.speed.base" :v2="c.speed.gear" @v1="c.speed.base = $event" @v2="c.speed.gear = $event" twin />
							<div class="grid text-caption justify-center">Speed <HelpIcon :text="gameText.speed" /></div>
						</div>
						<div class="grid justify-center">
							<BoxInput :v1="c.lumi.base" :v2="c.lumi.gear" @v1="c.lumi.base = $event" @v2="c.lumi.gear = $event" twin />
							<div class="text-caption">Lumi</div>
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
								<div class="grid align-item-space-between ml-1">
									Brain<div class="text-caption caption">If your insanity is 3+,<br> you are insane.</div>							
								</div>
							</td>
							<td>
								<v-checkbox v-model="c.brain.injury.light" density="compact" hide-details/>
							</td>
							<td>
								<div class="grid justify-center">
									<BoxInput v-model="c.brain.torment"/> <div class="text-caption">Torment</div>
								</div>
								
							</td>
						</tr>
						<tr class="topBorder">
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.head.armor"/>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between ml-1">
									<span class="styledRow"><KDMIcon icon="Head" />Head</span><div class="text-caption caption">Heavy Injury:<br>Knocked Down</div>							
								</div>
							</td>
							<td>
								<table>
									<tr v-for="sevInjuries in c.head.injury.severe">
										<td class="grid">
											<div class="text-caption styledRow">{{ sevInjuries.text }}<HelpIcon :text="sevInjuries.description" /></div>
											<div class="styledRowDense">
												<input v-for="(v,i) in sevInjuries.value" type="checkbox" v-model="sevInjuries.value[i]" />
											</div>
										</td>
									</tr>
								</table>
							</td>
							<td>
								<v-checkbox v-model="c.head.injury.heavy" label="H" color="error" density="compact" hide-details/>
							</td>
						</tr>
						<tr class="topBorder">
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.arms.armor"/>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between ml-1">
									<span class="styledRow"> <KDMIcon icon="Arms" />Arms</span><div class="text-caption caption">Heavy Injury:<br>Knocked Down</div>							
								</div>
							</td>
							<td>
								<table>
									<tr v-for="sevInjuries in c.arms.injury.severe">
										<td class="grid">
											<div class="text-caption styledRow">{{ sevInjuries.text }}<HelpIcon :text="sevInjuries.description" /></div>
											<div class="styledRowDense">
												<input v-for="(v,i) in sevInjuries.value" type="checkbox" v-model="sevInjuries.value[i]" />
											</div>
										</td>
									</tr>
								</table>
							</td>
							<td>
								<div class="d-flex">
									<v-checkbox v-model="c.arms.injury.light" label="L" density="compact" hide-details/>
									<v-checkbox v-model="c.arms.injury.heavy" label="H" color="error" density="compact" hide-details/>
								</div>
							</td>
						</tr>
						<tr class="topBorder">
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.body.armor"/>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between ml-1">
									<span class="styledRow"> <KDMIcon icon="Body" />Body</span><div class="text-caption caption">Heavy Injury:<br>Knocked Down</div>							
								</div>
							</td>
							<td>
								<table>
									<tr v-for="sevInjuries in c.body.injury.severe">
										<td class="grid">
											<div class="text-caption styledRow">{{ sevInjuries.text }}<HelpIcon :text="sevInjuries.description" /></div>
											<div class="styledRowDense">
												<input v-for="(v,i) in sevInjuries.value" type="checkbox" v-model="sevInjuries.value[i]" />
											</div>
										</td>
									</tr>
								</table>
							</td>
							<td>
								<div class="d-flex">
									<v-checkbox v-model="c.body.injury.light" label="L" density="compact" hide-details/>
									<v-checkbox v-model="c.body.injury.heavy" label="H" color="error" density="compact" hide-details/>
								</div>
							</td>
						</tr>
						<tr class="topBorder">
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.waist.armor"/>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between ml-1">
									<span class="styledRow"> <KDMIcon icon="Waist" />Waist</span><div class="text-caption caption">Heavy Injury:<br>Knocked Down</div>							
								</div>
							</td>
							<td>
								<table>
									<tr v-for="sevInjuries in c.waist.injury.severe">
										<td class="grid">
											<div class="text-caption styledRow">{{ sevInjuries.text }}<HelpIcon :text="sevInjuries.description" /></div>
											<div class="styledRowDense">
												<input v-for="(v,i) in sevInjuries.value" type="checkbox" v-model="sevInjuries.value[i]" />
											</div>
										</td>
									</tr>
								</table>
							</td>
							<td>
								<div class="d-flex">
									<v-checkbox v-model="c.waist.injury.light" label="L" density="compact" hide-details/>
									<v-checkbox v-model="c.waist.injury.heavy" label="H" color="error" density="compact" hide-details/>
								</div>
							</td>
						</tr>
						<tr class="topBorder">
							<td>
								<div class="grid justify-center">
									<Shield v-model="c.legs.armor"/>
								</div>
							</td>
							<td>
								<div class="grid align-item-space-between ml-1">
									<span class="styledRow"> <KDMIcon icon="Legs" />Legs</span><div class="text-caption caption">Heavy Injury:<br>Knocked Down</div>							
								</div>
							</td>
							<td>
								<table>
									<tr v-for="sevInjuries in c.legs.injury.severe">
										<td class="grid">
											<div class="text-caption styledRow">{{ sevInjuries.text }}<HelpIcon :text="sevInjuries.description" /></div>
											<div class="styledRowDense">
												<input v-for="(v,i) in sevInjuries.value" type="checkbox" v-model="sevInjuries.value[i]" />
											</div>
										</td>
									</tr>
								</table>
							</td>
							<td>
								<div class="d-flex">
									<v-checkbox v-model="c.legs.injury.light" label="L" density="compact" hide-details/>
									<v-checkbox v-model="c.legs.injury.heavy" label="H" color="error" density="compact" hide-details/>
								</div>
							</td>
						</tr>
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
									<div class="styledRow">
										Stalwart
										<HelpIcon text="Can't be knocked downby brain trauma or intimidate" />
									</div>							
								</td>
							</tr>
							<tr>
								<td><v-checkbox v-model="c.courage.prepared" density="compact" hide-details/></td>
								<td>		
									<div class="styledRow">
										Prepared
										<HelpIcon text="Add Hunt XP to your roll when determining a stranggler" />
									</div>								
								</td>
							</tr>
							<tr>
								<td><v-checkbox v-model="c.courage.matchmaker" density="compact" hide-details/></td>
								<td>		
									<div class="styledRow">
										Matchmaker
										<HelpIcon text="Spend 1 endeavor to trigger intimacy story event" />
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
									<div class="styledRow">
										Analyze
										<HelpIcon text="Look at top of AI card and return it to the top of the deck" />
									</div>	
								</td>
							</tr>
							<tr>
								<td><v-checkbox v-model="c.understanding.explore" density="compact" hide-details/></td>
								<td>			
									<div class="styledRow">
										Explore
										<HelpIcon text="Add +2 to your investigate roll results." />
									</div>							
								</td>
							</tr>
							<tr>
								<td><v-checkbox v-model="c.understanding.tinker" density="compact" hide-details/></td>
								<td>	
									<div class="styledRow">
										Tinker
										<HelpIcon text="+1 endeavor when you are a returning survivor" />
									</div>															
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div>
					<div class="w-100">
						Next Departure <input v-model="c.nextDeparture" type="text" class="w-100">
					</div>
					<table>
						<tr>
							<td>Chronicles</td>
							<td></td>
							<td rowspan="4">
								<div class="mx-1">
									Cause
									<textarea v-model="c.chronicles.cause" type="text" cols="27" rows="4" />
								</div>
							</td>
						</tr>
						<tr><td>Age</td><td><input v-model="c.chronicles.age" type="text" style="max-width: 130px;" /></td></tr>
						<tr><td>Born</td><td><input v-model="c.chronicles.born" type="text" style="max-width: 130px;" /></td></tr>
						<tr><td>Death</td><td><input v-model="c.chronicles.death" type="text" style="max-width: 130px;" /></td></tr>
					</table>
				</div>
				<div class="grid  gap-1 borderTable mt-1 w-100">
					<div class="d-flex justify-space-between">
						<div>
							Philosophy
							<input type="text" v-model="c.philosophy.text" style="width: 300px">
						</div>
						<BoxInput v-model="c.philosophy.rank" />
					</div>
					<div>
						<div class="styledRow">
							Ponder (Trigger when gain Hunt XP)
							<HelpIcon :text="gameText.ponder" />
						</div> 
						<input type="text" v-model="c.philosophy.ponder" style="width: 300px">
					</div>
					<div>
						Neurosis
						<input type="text" v-model="c.philosophy.neurosis" style="width: 300px">
					</div>
					<div>
						<div class="styledRow">
							Tenet Knowledge
							<div class="styledRowDense">
								<input v-for="(v,i) in c.philosophy.tenetKnowledge.values" type="checkbox" v-model="c.philosophy.tenetKnowledge.values[i]" />
								<v-btn
								@click="c.philosophy.tenetKnowledge.values.push(false)" 
								color="success" size="13" class="ml-3"
								>
									<v-icon size="x-small">mdi-plus</v-icon>
								</v-btn>
								<v-btn
								@click="c.philosophy.tenetKnowledge.values.pop()" 
								color="error" size="13"
								>
									<v-icon size="x-small">mdi-close</v-icon>
								</v-btn>
							</div>
						</div> 
						<input type="text" v-model="c.philosophy.tenetKnowledge.text" style="width: 300px">
					</div>
					<div>
						Rules
						<input type="text" v-model="c.philosophy.rules" style="width: 300px">
					</div>
					<div>
						Observation Conditions
						<input type="text" v-model="c.philosophy.observationConditions" style="width: 300px">
					</div>
				</div>
				<div class="grid  gap-1 borderTable mt-1 w-100">
					<div>
						<div class="styledRow">
							Knowledges 
							<v-btn @click="c.knowledge.knowledges.push(usefulFuncs.generateKnowledge())" color="success" size="18">
								<v-icon>mdi-plus</v-icon>
							</v-btn>	
						</div>
						
						<div class="styledRow text-caption">
							<input type="checkbox" v-model="c.knowledge.locked">
							If you cannot use fighting arts, you cannot use knowledge
						</div>
						<input type="text" v-model="c.knowledge.text" style="width: 300px">
					</div>
					<v-divider />
					<div v-for="(knowledge, ki) in c.knowledge.knowledges">
						<div>
							<div class="styledRow">
								<div class="styledRow">
									<v-btn @click="c.knowledge.knowledges.splice(ki, 1)" color="error" size="18">
										<v-icon>mdi-close</v-icon>
									</v-btn>	
									Knowledges Name
								</div>
								<div class="styledRowDense">
									<input v-for="(v,i) in knowledge.knowledgeName.values" type="checkbox" v-model="knowledge.knowledgeName.values[i]" />
									<v-btn
										@click="knowledge.knowledgeName.values.push(false)" 
										color="success" size="13" class="ml-3"
									>
										<v-icon size="x-small">mdi-plus</v-icon>
									</v-btn>
									<v-btn
										@click="knowledge.knowledgeName.values.pop()" 
										color="error" size="13"
									>
										<v-icon size="x-small">mdi-close</v-icon>
									</v-btn>
								</div>
							</div> 
							<input type="text" v-model="knowledge.knowledgeName.text" style="width: 300px">
						</div>
						<div>
							Rules
							<input type="text" v-model="knowledge.rules" style="width: 300px">
						</div>
						<div>
							Observation Conditions
							<input type="text" v-model="knowledge.observationConditions" style="width: 300px">
						</div>
						<v-divider class="mt-2" />
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
					<td>Fighting Arts</td><td>
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
import { Character, usefulFuncs } from "@/logics/character";
import { PropType } from "vue";
import KDMIcon from "./KDMIcon.vue"; 
import { gameText } from "@/logics/text";
 
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
.topBorder > td{
	border-top: 1px solid rgba(255,255,255,.3);
}

</style>