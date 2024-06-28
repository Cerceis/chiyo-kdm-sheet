
import { ref, Ref } from "vue";

export const survivorView: Ref<boolean> = ref(false);
export const refreshKey: Ref<number> = ref(0);

export const prefixKeymap = [
	{ code: "altKey", label: "Alt" },
	{ code: "ctrlKey", label: "Ctrl" },
	{ code: "metaKey", label: "Meta" },
	{ code: "shiftKey", label: "Shift" },
]
export const switchTabHotkeyPrefix: Ref<string> = ref("shiftKey");
export const switchTabHotkey: Ref<string> = ref("KeyS");

export const saveHotkeys = () => {
	localStorage.setItem("chiyoKDMHotkey", switchTabHotkey.value);
	localStorage.setItem("chiyoKDMHotkeyPrefix", switchTabHotkeyPrefix.value);
}

export const loadHotkeys = () => {
	const hk = localStorage.getItem("chiyoKDMHotkey");
	if(hk) switchTabHotkey.value = hk;
	const hkp = localStorage.getItem("chiyoKDMHotkeyPrefix");
	if(hkp) switchTabHotkeyPrefix.value = hkp;
}