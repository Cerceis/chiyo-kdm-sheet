import { Ref, ref, watch } from "vue";
import { characters } from "@/logics/character";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)

export const saving: Ref<boolean> = ref(false);
let lastSaved = dayjs();
export const lastSavedString: Ref<string> = ref(lastSaved.fromNow());

// Time interval
setInterval(() => {
	lastSavedString.value = lastSaved.fromNow();
}, 1000 * 44)

export const save = () => {
	saving.value = true;
	const root = {
		survivors: characters.value
	}
	localStorage.setItem("chiyoKDMSaveString", JSON.stringify(root));
	lastSaved = dayjs();
	saving.value = false;
}

export const load = () => {
	const saveString = localStorage.getItem("chiyoKDMSaveString");
	if(!saveString) return;
	const parsedSaveString = JSON.parse(saveString);
	characters.value = parsedSaveString.survivors;
}

let saveTimeout: any = null;

watch(
	() => characters.value,
	() => {
		if(saveTimeout) clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			save();
		}, 5000)
	},
	{ deep: true }
)