import { Generate } from "cerceis-lib";
import { ref, type Ref } from "vue";
import { Popup } from "@/logics/popup";
import { Settlement } from "@/logics/settlement";

/**
 * How to update schema.
 * 1) Increase currentVersion by 1.
 * 2) Create versionUpdaterFunctions for the newly created version.
 * Done.
 * Same goes for settlements
 */

export const characters: Ref<Character[]> = ref([]);
export const archive: Ref<(Character | Settlement)[]> = ref([]);
export const monsterController: Ref<string> = ref("");
const currentVersion = 2;

export type KDMCheckbox = {
	type: number,
	value: boolean,
}
type BodyPart = {
	armor: number,
	injury: { 
		light: boolean,
		heavy: boolean 
		severe:{
			text: string,
			description: string,
			value: boolean[],
		}[]
	},
}
export type Character = {
	v: number,
	id: string,
	type: "character",
	name: string,
	nextDeparture: string,
	dead: boolean,
	gender: {
		m: boolean, f: boolean,
	},
	huntExp: KDMCheckbox[],
	chronicles:{
		age: string,
		born: string,
		death: string,
		cause: string,
	},
	survival: {
		value: number,
		locked: boolean,
		dodge: boolean,
		encourage: boolean,
		surge: boolean,
		dash: boolean,
		endure: boolean,
		fistPump: boolean,
		systemicPressure: number,
	},
	movement: { base: number, gear: number },
	accuracy: { base: number, gear: number },
	strength: { base: number, gear: number },
	evasion: { base: number, gear: number },
	luck: { base: number, gear: number },
	speed: { base: number, gear: number },
	lumi: { base: number, gear: number },
	brain: {
		insanity: number,
		torment: number,
		injury: { light: boolean }
	},
	head: BodyPart,
	arms: BodyPart,
	body: BodyPart,
	waist: BodyPart,
	legs: BodyPart,
	weaponProficiency:{
		type: string,
		level: KDMCheckbox[],
	},
	courage: {
		level: KDMCheckbox[],
		stalwart: boolean,
		prepared: boolean,
		matchmaker: boolean,
	},
	understanding: {
		level: KDMCheckbox[],
		analyze: boolean,
		explore: boolean,
		tinker: boolean,
	},
	fightingArts: {
		locked: boolean,
		values: string[],
	},
	disorders: {
		values: string[],
	},
	abilitiesNImpairments: {
		locked: boolean,
		values: string[],
	},
	oncePerLifetime: {
		locked: boolean,
		values: string[],
	},
	family:{
		parents: string[],
		childs: string[],
	},
	notes: string,
	philosophy:{
		text: string,
		rank: number,
		ponder: string,
		neurosis: string,
		tenetKnowledge: {
			text: string,
			values: boolean[]
		},
		rules: string,
		observationConditions: string,
	},
	knowledge:{
		text: string,
		locked: boolean,
		knowledges: {
			knowledgeName: {
				text: string,
				values: boolean[]
			},
			rules: string,
			observationConditions: string,
		}[]
	}
}

export const usefulFuncs = {
	generateKDMCheckbox(types: number[]){
		const tmp: KDMCheckbox[] = [];
		types.forEach(t => tmp.push({type: t, value: false}))
		return tmp;
	},
	generateBodyPart(armor: number = 0, part: string){
		const tmp: BodyPart =  {
			armor,
			injury: { 
				light: false, heavy: false, severe: []
			}
		}
		if(part === "head"){
			tmp.injury.severe = [
				{
					text: "Intracranial Hemmorhage",
					description: "Cannot use or gain survival",
					value: [false]
				},
				{
					text: "Deaf",
					description: "-1 permanent Evasion",
					value: [false]
				},
				{
					text: "Blind",
					description: "[X] -1 permanent Accuracy<br>[X][X] -4 permanent Accuracy",
					value: [false, false]
				},
				{
					text: "Shattered Jaw",
					description: "Cannot consume or Encourage",
					value: [false]
				},
			]
		}
		if(part === "arms"){
			tmp.injury.severe = [
				{
					text: "Dismembered Arm",
					description: "[X] Cannot activate two-handed weapons<br>[X][X] Cannot activate weapons",
					value: [false, false]
				},
				{
					text: "Ruptured Muscle",
					description: "Cannot activate Fighting Arts",
					value: [false]
				},
				{
					text: "Contracture",
					description: "-1 permanent Accuracy",
					value: [false]
				},
				{
					text: "Broken Arm",
					description: "[X] -1 permanent Accuracy<br>[X][X] -1 permanent Strength",
					value: [false, false]
				},
			]
		}
		if(part === "body"){
			tmp.injury.severe = [
				{
					text: "Gaping Chest Wound",
					description: "-1 permanent Strength",
					value: [false, false, false, false, false]
				},
				{
					text: "Destroyed Back",
					description: "-2 permanent Movement. Cannot activate gear with 2+ Strength",
					value: [false]
				},
				{
					text: "Broken Rib",
					description: "-1 permanent Speed",
					value: [false, false, false, false, false]
				},
			]
		}
		if(part === "waist"){
			tmp.injury.severe = [
				{
					text: "Intestinal Prolapse",
					description: "Cannot wear waist armor",
					value: [false]
				},
				{
					text: "Warped Pelvis",
					description: "-1 permanent Luck",
					value: [false, false, false, false, false]
				},
				{
					text: "Destroyed Genitals",
					description: "Cannot be chosen for Intimacy",
					value: [false]
				},
				{
					text: "Broken Hip",
					description: "-1 permanent Movement. Cannot Dodge",
					value: [false]
				},
			]
		}
		if(part === "legs"){
			tmp.injury.severe = [
				{
					text: "Dismembered Leg",
					description: "[X] -2 permanent Movement<br>[X][X] Retire at the end of the next showdown or settlement phase.",
					value: [false, false]
				},
				{
					text: "Hamstrung",
					description: "Cannot use Fighting Arts or Abilities",
					value: [false]
				},
				{
					text: "Broken Leg",
					description: "-1 permanent Movement",
					value: [false, false]
				},
			]
		}
		return tmp;
	},
	generateKnowledge(){
		return{
			knowledgeName: {
				text: "",
				values: [false, false, false, false, false, false, false, false, false]
			},
			rules: "",
			observationConditions: "",
		}
	}
}

export const characterFunc = {
	new(){
		const tmpChar: Character = {
			v: currentVersion,
			id: Generate.objectId(),
			type: "character",
			name: `Unnamed Survivor ${characters.value.length}`,
			nextDeparture: "",
			dead: false,
			gender: {
				m: false, f: false,
			},
			huntExp: usefulFuncs.generateKDMCheckbox([1,2,1,1,1,2,1,1,1,2,1,1,1,2,3]),
			chronicles:{
				age: "",
				born: "",
				death: "",
				cause: "",
			},
			survival: {
				value: 1,
				locked: false,
				dodge: true,
				encourage: false,
				surge: false,
				dash: false,
				endure: false,
				fistPump: false,
				systemicPressure: 0
			},
			movement: { base: 5, gear: 0 },
			accuracy: { base: 0, gear: 0 },
			strength: { base: 0, gear: 0 },
			evasion: { base: 0, gear: 0 },
			luck: { base: 0, gear: 0 },
			speed: { base: 0, gear: 0 },
			lumi: { base: 0, gear: 0 },
			brain: {
				insanity: 0,
				torment: 0,
				injury: { light: false }
			},
			head: usefulFuncs.generateBodyPart(0, "head"),
			arms: usefulFuncs.generateBodyPart(0, "arms"),
			body: usefulFuncs.generateBodyPart(0, "body"),
			waist: usefulFuncs.generateBodyPart(1, "waist"),
			legs: usefulFuncs.generateBodyPart(0, "legs"),
			weaponProficiency:{
				type: "",
				level: usefulFuncs.generateKDMCheckbox([1,1,2,1,1,1,1,2]),
			},
			courage: {
				level: usefulFuncs.generateKDMCheckbox([1,1,2,1,1,1,1,1,2]),
				stalwart: false,
				prepared: false,
				matchmaker: false,
			},
			understanding: {
				level: usefulFuncs.generateKDMCheckbox([1,1,2,1,1,1,1,1,2]),
				analyze: false,
				explore: false,
				tinker: false,
			},
			fightingArts: {
				locked: false,
				values: [""],
			},
			disorders: {
				values: [""],
			},
			abilitiesNImpairments: {
				locked: false,
				values: [""],
			},
			oncePerLifetime: {
				locked: false,
				values: [""],
			},
			family:{
				parents: [""],
				childs: [""],
			},
			notes: "",
			philosophy:{
				text: "",
				rank: 0,
				ponder: "",
				neurosis: "",
				tenetKnowledge: {
					text: "",
					values: [false, false, false, false, false, false, false, false, false]
				},
				rules: "",
				observationConditions: "",
			},
			knowledge:{
				text: "",
				locked: false,
				knowledges: [usefulFuncs.generateKnowledge()]
			}
		};
		characters.value.push(tmpChar);
		return tmpChar;
	},
	moveToArchive(c: Character){
		for(let i = 0; i < characters.value.length; i++){
			if(characters.value[i].id === c.id){
				archive.value.push(c)
				characters.value.splice(i, 1);
				return;
			}
		}
	},
	async eraseSurvivor(c: Character){
		const confirmation = new Popup({
			title: "Delete",
			color: "error",
			text: "You are about to permenantly delete a survivor. The data cannot be restore afterwards. Are you sure you want to proceed?"
		})
		const confirmed = await confirmation.prompt();
		if(!confirmed) return;
		for(let i = 0; i < archive.value.length; i++){
			if(archive.value[i].id === c.id){
				archive.value.splice(i, 1);
				break;
			}
		}
	},
	restore(c: Character){
		for(let i = 0; i < archive.value.length; i++){
			if(archive.value[i].id === c.id){
				characters.value.push(c)
				archive.value.splice(i, 1);
				return;
			}
		}
	},
	update(c: Character){
		if(!c) return;
		if(!c.type) return;
		if(c.type !== "character") return;
		if(!c.v) c.v = 0;
		while(c.v < currentVersion)	{
			const upgradeTo: number = ++c.v;
			versionUpdaterFunctions[upgradeTo](c)
		}
	},
	move(cid: string, state: 1 | -1 | 2 | 3){
		for(let i = 0; i<characters.value.length; i++){
			if(characters.value[i].id === cid){
				// Invalid movement
				if(
					(i === 0 && state === -1) ||
					(i === characters.value.length - 1 && state === 1)
				) return;
				// Top
				if(state === 2){
					const char = characters.value.splice(i, 1)[0];
					characters.value.unshift(char);
				}
				// End
				if(state === 3){
					const char = characters.value.splice(i, 1)[0];
					characters.value.push(char);
				}
				// Move back
				if(state === 1){
					[characters.value[i], characters.value[i+1]] = [characters.value[i+1], characters.value[i]];
					return;
				}
				// Move front
				if(state === -1){
					[characters.value[i], characters.value[i-1]] = [characters.value[i-1], characters.value[i]];
					return;
				}
			}
		}
	},
	swap(id1: string, id2:string){
		// Find the indices of the items with the given IDs
		const index1 = characters.value.findIndex(item => item.id === id1);
		const index2 = characters.value.findIndex(item => item.id === id2);
	
		// Check if both items are found
		if (index1 === -1 || index2 === -1) {
			throw new Error('One or both IDs not found in the list');
		}
	
		// Swap the items
		[characters.value[index1], characters.value[index2]] = [characters.value[index2], characters.value[index1]];
	}
}

const versionUpdaterFunctions: any = {
	/**
	 * Added death trigger
	 */
	1:(c: Character) => {
		c.dead = false;
	},
	/**
	 * Added Survival - Fist Pump
	 * Added Survival - Systemic Pressure
	 * Added Lumi
	 * Added Torment to brain section
	 * Added Next Departure
	 * Added severe injuries
	 * Added Philosophy
	 * Added Knowledge
	 */
	2:(c: Character) => {
		c.survival.fistPump = false;
		c.survival.systemicPressure = 0;
		c.lumi = { base: 0, gear: 0 };
		c.brain.torment = 0;
		c.nextDeparture = "";
		c.head.injury.severe = usefulFuncs.generateBodyPart(c.head.armor, "head").injury.severe;
		c.arms.injury.severe = usefulFuncs.generateBodyPart(c.arms.armor, "arms").injury.severe;
		c.body.injury.severe = usefulFuncs.generateBodyPart(c.body.armor, "body").injury.severe;
		c.waist.injury.severe = usefulFuncs.generateBodyPart(c.waist.armor, "waist").injury.severe;
		c.legs.injury.severe = usefulFuncs.generateBodyPart(c.legs.armor, "legs").injury.severe;
		c.philosophy = {
			text: "",
			rank: 0,
			ponder: "",
			neurosis: "",
			tenetKnowledge: {
				text: "",
				values: [false, false, false, false, false, false, false, false, false]
			},
			rules: "",
			observationConditions: "",
		},
		c.knowledge = {
			text: "",
			locked: false,
			knowledges: [{
				knowledgeName: {
					text: "",
					values: [false, false, false, false, false, false, false, false, false]
				},
				rules: "",
				observationConditions: "",
			}]
		}
	}
}

