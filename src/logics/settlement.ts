import { Generate } from "cerceis-lib";
import { ref, type Ref } from "vue";
import { Popup } from "@/logics/popup";
import { archive } from "@/logics/character";

export const settlements: Ref<Settlement[]> = ref([]);

export type SettlementTimeline = {
	value: boolean,
	year: number,
	text: string,
}

export type CheckboxTextItem = {
	text: string, value: boolean
}

export type Settlement = {
	id: string,
	type: "settlement",
	settlementName: string,
	survivalLimit: number,
	population: number,
	deathCount: number,
	timeline: SettlementTimeline[],
	milestones: { text: string, se: string, value: boolean }[],
	innovations: string[],
	settlementLocations: CheckboxTextItem[],
	principles: [
		string, CheckboxTextItem, CheckboxTextItem
	][],
	quarries: CheckboxTextItem[],
	namesis: {
		text: string, value: boolean, level: boolean[]
	}[],
	resourceStorage: {text: string, count: number}[],
	gearStorage: {text: string, count: number}[],
	lanternResearchLevel: number,
	monsterVolumes: string[]
	notes: string,
	lostSettlements: number,
}

export const settlementFunc = {
	generateSettlementDefaultTimeline(){
		return [
			{ "year": 1, "value": false, "text": "[SE] First Day, Returning Survivors" },
			{ "year": 2, "value": false, "text": "[SE] Endless Screams" },
			{ "year": 3, "value": false, "text": "" },
			{ "year": 4, "value": false, "text": "Namesis Encounter - Butcher Lvl 1" },
			{ "year": 5, "value": false, "text": "[SE] Hands of Heat" },
			{ "year": 6, "value": false, "text": "[SE] Armored Strangers" },
			{ "year": 7, "value": false, "text": "[SE] Phoenix Feather" },
			{ "year": 8, "value": false, "text": "" },
			{ "year": 9, "value": false, "text": "Namesis Encounter - King's Man Lvl 1" },
			{ "year": 10, "value": false, "text": "" },
			{ "year": 11, "value": false, "text": "[SE] Regal Visit" },
			{ "year": 12, "value": false, "text": "[SE] Principle: Conviction" },
			{ "year": 13, "value": false, "text": "Namesis Encounter - The Hand Lvl 1" },
			{ "year": 14, "value": false, "text": "" },
			{ "year": 15, "value": false, "text": "" },
			{ "year": 16, "value": false, "text": "Namesis Encounter - Butcher Lvl 2" },
			{ "year": 17, "value": false, "text": "" },
			{ "year": 18, "value": false, "text": "" },
			{ "year": 19, "value": false, "text": "Namesis Encounter - King's Man Lvl 2" },
			{ "year": 20, "value": false, "text": "[SE] Watched" },
			{ "year": 21, "value": false, "text": "" },
			{ "year": 22, "value": false, "text": "" },
			{ "year": 23, "value": false, "text": "Namesis Encounter - Butcher Lvl 3" },
			{ "year": 24, "value": false, "text": "" },
			{ "year": 25, "value": false, "text": "Namesis Encounter - Watcher" },
			{ "year": 26, "value": false, "text": "" },
			{ "year": 27, "value": false, "text": "" },
			{ "year": 28, "value": false, "text": "Namesis Encounter - King's Man Lvl 3" },
			{ "year": 29, "value": false, "text": "" },
			{ "year": 30, "value": false, "text": "Namesis Encounter - Gold Smoke Knight" },
			{ "year": 31, "value": false, "text": "" },
			{ "year": 32, "value": false, "text": "" },
			{ "year": 33, "value": false, "text": "" },
			{ "year": 34, "value": false, "text": "" },
			{ "year": 35, "value": false, "text": "" },
			{ "year": 36, "value": false, "text": "" },
		]
	},
	new(){
		const tmpSettlement: Settlement = {
			id: Generate.objectId(),
			type: "settlement",
			settlementName: "Unnamed Settlement",
			survivalLimit: 1,
			population: 0,
			deathCount: 0,
			timeline: this.generateSettlementDefaultTimeline(),
			milestones: [
				{ text: "First child is born", se: "Principle: New Life", value: false },
				{ text: "Population reaches 15", se: "Principle: Society", value: false },
				{ text: "Population reaches 0", se: "Game Over", value: false },
				{ text: "First time death count is updated", se: "Principle: Death", value: false },
				{ text: "Settlement has 5 innovations", se: "Hooded Knight", value: false },
			],
			innovations: ["Language"],
			settlementLocations: [
				{ text: "Lantern Hoard", value: true },
				{ text: "Bone Smith", value: false },
				{ text: "Skinnery", value: false },
				{ text: "Organ Grinder", value: false },
				{ text: "Catarium", value: false },
				{ text: "Weapon Crafter", value: false },
				{ text: "Leather Worker", value: false },
				{ text: "Stone Circle", value: false },
				{ text: "Barber Surgeon", value: false },
				{ text: "Plumery", value: false },
				{ text: "Blacksmith", value: false },
				{ text: "Mask Maker", value: false },
			],
			principles: [
				["New Life", { text: "Protect the Young", value: false }, { text: "Survival of the Fittest", value: false }],
				["Death", { text: "Cannibalize", value: false }, { text: "Graves", value: false }],
				["Society", { text: "Collective Toil", value: false }, { text: "Accept Darkness", value: false }],
				["Conviction", { text: "Barbaric", value: false }, { text: "Romantic", value: false }],
			],
			quarries: [
				{ text: "White Lion", value: true },
				{ text: "Screaming Antelope", value: false },
				{ text: "Phoenix", value: false },
			],
			namesis: [
				{ text: "Butcher", value: true, level: [false, false, false] },
				{ text: "King's Man", value: false, level: [false, false, false] },
				{ text: "The Hand", value: false, level: [false, false, false] },
			],
			resourceStorage: [{text:'', count:0}],
			gearStorage: [{text:'', count:0}],
			lanternResearchLevel: 0,
			monsterVolumes: [""],
			notes: "",
			lostSettlements: 0,
		}
		settlements.value.push(tmpSettlement);
		return tmpSettlement;
	},
	moveToArchive(s: Settlement){
		for(let i = 0; i < settlements.value.length; i++){
			if(settlements.value[i].id === s.id){
				archive.value.push(s)
				settlements.value.splice(i, 1);
				return;
			}
		}
	},
	async eraseSettlement(c: Settlement){
		const confirmation = new Popup({
			title: "Delete",
			color: "error",
			text: "You are about to permenantly delete a settlement. The data cannot be restore afterwards. Are you sure you want to proceed?"
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
	restore(s: Settlement){
		for(let i = 0; i < archive.value.length; i++){
			if(archive.value[i].id === s.id){
				settlements.value.push(s)
				archive.value.splice(i, 1);
				return;
			}
		}
	}
}