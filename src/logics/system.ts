import { Ref, ref, watch } from "vue";
import { characters, archive, characterFunc, Character } from "@/logics/character";
import { Settlement, settlementFunc, settlements } from "@/logics/settlement";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { refreshKey } from "@/logics/global";

// Settlements can be moved to archive too

dayjs.extend(relativeTime)

export const saving: Ref<boolean> = ref(false);
let lastSaved = dayjs();
export const lastSavedString: Ref<string> = ref(lastSaved.fromNow());
export const notSavedYet: Ref<boolean> = ref(true);

// Time interval
setInterval(() => {
	lastSavedString.value = lastSaved.fromNow();
}, 1000 * 44)

export const save = () => {
	saving.value = true;
	const root = {
		survivors: characters.value,
		archive: archive.value,
		settlements: settlements.value
	}
	const saveString = JSON.stringify(root);
	localStorage.setItem("chiyoKDMSaveString", saveString);
	lastSaved = dayjs();
	saving.value = false;
	notSavedYet.value = false;
	return saveString;
}

export const load = (inputString?: string) => {
	let saveString = null;
	if(inputString){
		saveString = inputString;
	}else{
		saveString = localStorage.getItem("chiyoKDMSaveString");
	}
	if(!saveString) return;
	const parsedSaveString = JSON.parse(saveString);
	characters.value = parsedSaveString.survivors.map( (c: Character) => {characterFunc.update(c); return c}) ?? [];
	archive.value = parsedSaveString.archive.map( (c: Character) => {characterFunc.update(c); return c}) ?? [];
	settlements.value = parsedSaveString.settlements.map( (s: Settlement) => {settlementFunc.update(s); return s}) ?? [];

	refreshKey.value ++;
}

let saveTimeout: any = null;
const watchedFunc = () => {
	notSavedYet.value = true;
	if(saveTimeout) clearTimeout(saveTimeout);
	saveTimeout = setTimeout(() => {
		save();
	}, 5000)
}
watch(
	() => characters.value,
	() => { watchedFunc	()},
	{ deep: true }
)
watch(
	() => archive.value,
	() => { watchedFunc	()},
	{ deep: true }
)
watch(
	() => settlements.value,
	() => { watchedFunc	()},
	{ deep: true }
)

export const saveThemeColor = (currentColor: string) => {
	localStorage.setItem("chiyoKDMThemeColor", currentColor);
}