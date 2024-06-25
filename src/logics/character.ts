import { Generate } from "cerceis-lib";
import { ref, type Ref } from "vue";
import { Popup } from "@/logics/popup";
import { Settlement } from "@/logics/settlement";

/**
 * How to update schema.
 * 1) Increase currentVersion by 1.
 * 2) Create versionUpdaterFunctions for the newly created version.
 * Done.
 * Smae goes for settlements
 */

export const characters: Ref<Character[]> = ref([]);
export const archive: Ref<(Character | Settlement)[]> = ref([]);
const currentVersion = 1;

export type KDMCheckbox = {
	type: number,
	value: boolean,
}
type BodyPart = {
	armor: number,
	injury: { light: boolean, heavy: boolean },
}
export type Character = {
	v: number,
	id: string,
	type: "character",
	name: string,
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
	},
	movement: { base: number, gear: number },
	accuracy: { base: number, gear: number },
	strength: { base: number, gear: number },
	evasion: { base: number, gear: number },
	luck: { base: number, gear: number },
	speed: { base: number, gear: number },
	brain: {
		insanity: number,
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
}

export const usefulFuncs = {
	generateKDMCheckbox(types: number[]){
		const tmp: KDMCheckbox[] = [];
		types.forEach(t => tmp.push({type: t, value: false}))
		return tmp;
	},
	generateBodyPart(armor: number = 0){
		return {
			armor,
			injury: { light: false, heavy: false }
		}
	}
}

export const characterFunc: {
	new: () => Character,
	moveToArchive: (c: Character) => void,
	eraseSurvivor: (c: Character) => Promise<void>,
	restore: (c: Character) => void,
	update: (c: Character) => void,
} = {
	new(){
		const tmpChar: Character = {
			v: currentVersion,
			id: Generate.objectId(),
			type: "character",
			name: "Unnamed Survivor",
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
			},
			movement: { base: 5, gear: 0 },
			accuracy: { base: 0, gear: 0 },
			strength: { base: 0, gear: 0 },
			evasion: { base: 0, gear: 0 },
			luck: { base: 0, gear: 0 },
			speed: { base: 0, gear: 0 },
			brain: {
				insanity: 0,
				injury: { light: false }
			},
			head: usefulFuncs.generateBodyPart(),
			arms: usefulFuncs.generateBodyPart(),
			body: usefulFuncs.generateBodyPart(),
			waist: usefulFuncs.generateBodyPart(1),
			legs: usefulFuncs.generateBodyPart(),
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
	}
}

const versionUpdaterFunctions: any = {
	1:(c: Character) => {
		c.dead = false;
	}
}

