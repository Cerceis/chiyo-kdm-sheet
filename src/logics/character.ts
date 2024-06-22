import { Generate } from "cerceis-lib";
import { ref, type Ref } from "vue";

export const characters: Ref<Character[]> = ref([]);
export const graveyard: Ref<Character[]> = ref([]);

type KDMCheckbox = {
	type: number,
	value: boolean,
}
type BodyPart = {
	armor: number,
	injury: { light: boolean, heavy: boolean },
}
export type Character = {
	id: string,
	name: string,
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
} = {
	new(){
		const tmpChar: Character = {
			id: Generate.objectId(),
			name: "",
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
				values: [],
			},
			disorders: {
				values: [],
			},
			abilitiesNImpairments: {
				locked: false,
				values: [],
			},
			oncePerLifetime: {
				locked: false,
				values: [],
			},
			family:{
				parents: [],
				childs: [],
			},
			notes: "",
		};
		characters.value.push(tmpChar);
		return tmpChar;
	}
}

