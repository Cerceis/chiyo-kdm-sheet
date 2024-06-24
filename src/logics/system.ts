import { Ref, ref, watch } from "vue";
import { characters, archive } from "@/logics/character";
import { settlements } from "@/logics/settlement";
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
	characters.value = parsedSaveString.survivors ?? [];
	archive.value = parsedSaveString.archive ?? [];
	settlements.value = parsedSaveString.settlements ?? [];
	refreshKey.value ++;
}

let saveTimeout: any = null;

watch(
	() => characters.value || archive.value,
	() => {
		notSavedYet.value = true;
		if(saveTimeout) clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			save();
		}, 5000)
	},
	{ deep: true }
)