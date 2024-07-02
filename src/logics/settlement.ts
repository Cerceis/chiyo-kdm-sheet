import { Generate } from "cerceis-lib";
import { ref, type Ref } from "vue";
import { Popup } from "@/logics/popup";
import { archive } from "@/logics/character";

export const settlements: Ref<Settlement[]> = ref([]);
export const selectedSettlement: Ref<Settlement | null> = ref(null);
const currentVersion = 5;

export type SettlementTimeline = {
	value: boolean,
	year: number,
	text: string,
}

export type CheckboxTextItem = {
	text: string, value: boolean
}

export type Settlement = {
	v: number,
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
	resourceStorage: {id: string, text: string, count: number, show: boolean}[],
	gearStorage: {id: string, text: string, count: number, show: boolean}[],
	lanternResearchLevel: number,
	monsterVolumes: string[]
	notes: string,
	lostSettlements: number,
	survivorIds: string[],
	autoUpdatePopulation: boolean
}

export const settlementFunc = {
	generateSettlementDefaultTimeline(){
		return [
			{ "year": 1, "value": false, "text": "[SE] First Day, [B] Returning Survivors" },
			{ "year": 2, "value": false, "text": "[SE], [B]Endless Screams" },
			{ "year": 3, "value": false, "text": "[SE]" },
			{ "year": 4, "value": false, "text": "[SE], [NE]  Butcher Lvl 1" },
			{ "year": 5, "value": false, "text": "[SE], [B] Hands of Heat" },
			{ "year": 6, "value": false, "text": "[SE], [B] Armored Strangers" },
			{ "year": 7, "value": false, "text": "[SE], [B] Phoenix Feather" },
			{ "year": 8, "value": false, "text": "[SE]" },
			{ "year": 9, "value": false, "text": "[SE], [NE]  King's Man Lvl 1" },
			{ "year": 10, "value": false, "text": "[SE]" },
			{ "year": 11, "value": false, "text": "[SE], [B] Regal Visit" },
			{ "year": 12, "value": false, "text": "[SE], [B] Principle: Conviction" },
			{ "year": 13, "value": false, "text": "[SE], [NE]  The Hand Lvl 1" },
			{ "year": 14, "value": false, "text": "[SE]" },
			{ "year": 15, "value": false, "text": "[SE]" },
			{ "year": 16, "value": false, "text": "[SE], [NE]  Butcher Lvl 2" },
			{ "year": 17, "value": false, "text": "[SE]" },
			{ "year": 18, "value": false, "text": "[SE]" },
			{ "year": 19, "value": false, "text": "[SE], [NE]  King's Man Lvl 2" },
			{ "year": 20, "value": false, "text": "[SE], [B] Watched" },
			{ "year": 21, "value": false, "text": "[SE]" },
			{ "year": 22, "value": false, "text": "[SE]" },
			{ "year": 23, "value": false, "text": "[SE], [NE]  Butcher Lvl 3" },
			{ "year": 24, "value": false, "text": "[SE]" },
			{ "year": 25, "value": false, "text": "[SE], [NE]  Watcher" },
			{ "year": 26, "value": false, "text": "[SE]" },
			{ "year": 27, "value": false, "text": "[SE]" },
			{ "year": 28, "value": false, "text": "[SE], [NE]  King's Man Lvl 3" },
			{ "year": 29, "value": false, "text": "[SE]" },
			{ "year": 30, "value": false, "text": "[SE], [NE]  Gold Smoke Knight" },
			{ "year": 31, "value": false, "text": "[SE]" },
			{ "year": 32, "value": false, "text": "[SE]" },
			{ "year": 33, "value": false, "text": "[SE]" },
			{ "year": 34, "value": false, "text": "[SE]" },
			{ "year": 35, "value": false, "text": "[SE]" },
			{ "year": 36, "value": false, "text": "[SE]" },
		]
	},
	new(){
		const tmpSettlement: Settlement = {
			v: currentVersion,
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
			resourceStorage: [{id: Generate.objectId(), text:'', count:0, show: true}],
			gearStorage: [{id: Generate.objectId(), text:'', count:0, show: true}],
			lanternResearchLevel: 0,
			monsterVolumes: [""],
			notes: "",
			lostSettlements: 0,
			survivorIds: [],
			autoUpdatePopulation: false
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
	},
	update(s: Settlement){
		if(!s) return;
		if(!s.type) return;
		if(s.type !== "settlement") return;
		if(!s.v) s.v = 0;
		while(s.v < currentVersion)	{
			const upgradeTo: number = ++s.v;
			versionUpdaterFunctions[upgradeTo](s)
		}
	},
	move(sid: string, state: 1 | -1 | 2 | 3){
		for(let i = 0; i<settlements.value.length; i++){
			if(settlements.value[i].id === sid){
				// Invalid movement
				if(
					(i === 0 && state === -1) ||
					(i === settlements.value.length - 1 && state === 1)
				) return;
				// Top
				if(state === 2){
					const sett = settlements.value.splice(i, 1)[0];
					settlements.value.unshift(sett);
				}
				// End
				if(state === 3){
					const sett = settlements.value.splice(i, 1)[0];
					settlements.value.push(sett);
				}
				// Move back
				if(state === 1){
					[settlements.value[i], settlements.value[i+1]] = [settlements.value[i+1], settlements.value[i]];
					return;
				}
				// Move front
				if(state === -1){
					[settlements.value[i], settlements.value[i-1]] = [settlements.value[i-1], settlements.value[i]];
					return;
				}
			}
		}
	}
}

const versionUpdaterFunctions: any = {
	1:(s: Settlement) => {},
	/**
	 * Added id field to resource and gear
	 */
	2:(s: Settlement) => {
		for(let i = 0; i<s.resourceStorage.length; i++){
			s.resourceStorage[i].id = Generate.objectId();
		}
		for(let i = 0; i<s.gearStorage.length; i++){
			s.gearStorage[i].id = Generate.objectId();
		}
	},
	/**
	 * Added show field to resource and gear
	 */
	3:(s: Settlement) => {
		for(let i = 0; i<s.resourceStorage.length; i++){
			s.resourceStorage[i].show = true;
		}
		for(let i = 0; i<s.gearStorage.length; i++){
			s.gearStorage[i].show = true;
		}
	},
	/**
	 * Added survivorIds
	 */
	4:(s: Settlement) => {
		s.survivorIds = [];
	},
	/**
	 * Added autoupdate population
	 */
	5:(s: Settlement) => {
		s.autoUpdatePopulation = false;
	},
}