<template>
	<div>
		<div class="styledRowDense">
			<ToolTip text="Gender" v-if="c.gender.m || c.gender.f">
				<v-icon>{{ c.gender.m ? "mdi-gender-male" : c.gender.f ? "mdi-gender-female" : ""}}</v-icon>
			</ToolTip>
			<ToolTip text="Monster Controller" v-if="c.id === monsterControllerId">
				<v-icon color="warning">mdi-brain</v-icon>
			</ToolTip>
			<ToolTip text="Dead" v-if="c.dead">
				<v-icon color="red">mdi-emoticon-dead-outline</v-icon>
			</ToolTip>
			<ToolTip text="Cannot use Fighting Arts" v-if="c.fightingArts.locked">
				<KDMIcon icon="FightCancel" :size="24" />
			</ToolTip>
			<ToolTip text="Skip hunt" v-if="c.abilitiesNImpairments.locked">
				<KDMIcon icon="HuntCancel" :size="24" />
			</ToolTip>
		</div>
		<div class="d-flex justify-space-between align-start" >
			<div class="bodyPartWrapper">
				<KDMImage v-if="c.gender.m" src="Male" w="48px" style="opacity: .3" />
				<KDMImage v-else src="Female" w="48px" style="opacity: .3" />
				<v-icon class="bodyPartBox" size="24px" style="opacity: .3">mdi-brain</v-icon>
				<div :class="`bodyPartBox brain ${c.brain.injury.light?'lightInjury':''}`">
					{{ c.brain.insanity }}
				</div>
				<div :class="`bodyPartBox head ${c.head.injury.heavy?'heavyInjury':''}`">
					{{ c.head.armor }}
				</div>
				<div :class="`bodyPartBox armsLeft ${c.arms.injury.heavy?'heavyInjury':c.arms.injury.light?'lightInjury':''}`">
					{{ c.arms.armor }}
				</div>
				<div :class="`bodyPartBox armsRight ${c.arms.injury.heavy?'heavyInjury':c.arms.injury.light?'lightInjury':''}`">
					{{ c.arms.armor }}
				</div>
				<div :class="`bodyPartBox body ${c.body.injury.heavy?'heavyInjury':c.body.injury.light?'lightInjury':''}`">
					{{ c.body.armor }}
				</div>
				<div :class="`bodyPartBox waist ${c.waist.injury.heavy?'heavyInjury':c.waist.injury.light?'lightInjury':''}`">
					{{ c.waist.armor }}
				</div>
				<div :class="`bodyPartBox legsLeft ${c.legs.injury.heavy?'heavyInjury':c.legs.injury.light?'lightInjury':''}`">
					{{ c.legs.armor }}
				</div>
				<div :class="`bodyPartBox legsRight ${c.legs.injury.heavy?'heavyInjury':c.legs.injury.light?'lightInjury':''}`">
					{{ c.legs.armor }}
				</div>
			</div>
			<table class="text-caption">
				<tr>
					<td :class="c.survival.locked?'crossText':''">Survi</td>
					<td :class="c.survival.locked?'crossText':''">{{ c.survival.value }}</td>
					<td>Hunt XP</td>
					<td>{{ c.huntExp.reduce((a,b) => a + (b.value ? 1 : 0),0) }}</td>
				</tr>
				<tr>
					<td>Mov</td>
					<td>{{ c.movement.base + c.movement.gear }}</td>
					<td>Acc</td>
					<td>{{ c.accuracy.base + c.accuracy.gear }}</td>
				</tr>
				<tr>
					<td>Str</td>
					<td>{{ c.strength.base + c.strength.gear }}</td>
					<td>Evas</td>
					<td>{{ c.evasion.base + c.evasion.gear }}</td>
				</tr>
				<tr>
					<td>Luc</td>
					<td>{{ c.luck.base + c.luck.gear }}</td>
					<td>Spd</td>
					<td>{{ c.speed.base + c.speed.gear }}</td>
				</tr>
				<tr>
					<td>Coura</td>
					<td>{{ c.courage.level.reduce((a,b) => a + (b.value ? 1 : 0),0) }}</td>
					<td>Under</td>
					<td>{{ c.understanding.level.reduce((a,b) => a + (b.value ? 1 : 0),0) }}</td>
				</tr>
				
			</table>
		</div>
	</div>
</template>
 
<script setup lang="ts">
import { PropType, computed } from "vue";
import { Character } from "@/logics/character";

const props = defineProps({
	c: {
		type: Object as PropType<Character>,
		required: true
	},
	monsterControllerId:{
		type: String,
		default: ""
	}
})

const monsterControllerId = computed(() => props.monsterControllerId);
 
</script>
 
<style scoped>
.bodyPartWrapper{
	position: relative;
	width: fit-content;
} 
.bodyPartBox{
	font-size: 12px;
	position: absolute;
}
.lightInjury{
	color: orange;
}
.heavyInjury{
	color: red;
}
.brain{
	top: 0px;
	left: 150%;
}
.head{
	top: 0px;
	left: 50%;
	transform: translateX(-50%);
}
.armsLeft{
	top: 25%;
	left: 5%;
	transform: translate(-5%, -25%);
}
.armsRight{
	top: 25%;
	left: 95%;
	transform: translate(-95%, -25%);
}
.body{
	top: 25%;
	left: 50%;
	transform: translate(-50%, -25%);
}
.waist{
	top: 45%;
	left: 50%;
	transform: translate(-50%, -45%);
}
.legsLeft{
	top: 80%;
	left: 10%;
	transform: translate(-10%, -80%);
}
.legsRight{
	top: 80%;
	left: 90%;
	transform: translate(-90%, -80%);
}
td{
	padding: 0 .25em;
}
</style>