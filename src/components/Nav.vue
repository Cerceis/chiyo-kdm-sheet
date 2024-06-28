<template>
	<div class="ma-1 d-flex gap-1 align-center">
		Chiyo KDM Sheet 
		<div class="caption text-caption">
			v1.2
		</div>
		<v-btn  color="primary" size="small" @click="characterFunc.new()">
			<v-icon>mdi-plus</v-icon>
			New Survivor
		</v-btn>
		<v-btn  color="primary" size="small" @click="settlementFunc.new()">
			<v-icon>mdi-plus</v-icon>
			New Settlement
		</v-btn>

		<v-tooltip text="Archive">
			<template v-slot:activator="{ props }">
				<v-btn
					v-bind="props"
					@click=""
					color="primary"
					size="32"
				>
					<v-icon>mdi-grave-stone</v-icon>
					<v-menu activator="parent" :close-on-content-click="false">
						<v-list v-for="item in archive" density="compact" class="border">
							<template v-if="item.type === 'character'">
								<v-list-item :title="item.name">
									<template v-slot:append>
										<div class="d-flex ml-3 gap-1">
											<v-btn @click="characterFunc.restore(item)" color="primary" size="x-small">
												Restore
											</v-btn>
											<v-btn @click="characterFunc.eraseSurvivor(item)" color="primary" size="x-small">
												Erase
											</v-btn>
										</div>
									</template>
								</v-list-item>
							</template>
							<template v-if="item.type === 'settlement'">
								<v-list-item :title="item.settlementName">
									<template v-slot:append>
										<div class="d-flex ml-3 gap-1">
											<v-btn @click="settlementFunc.restore(item)" color="primary" size="x-small">
												Restore
											</v-btn>
											<v-btn @click="settlementFunc.eraseSettlement(item)" color="primary" size="x-small">
												Erase
											</v-btn>
										</div>
									</template>
								</v-list-item>
							</template>
						</v-list>
					</v-menu>
				</v-btn>
			</template>
		</v-tooltip>

		

		<v-tooltip text="Support me on Ko-fi">
			<template v-slot:activator="{ props }">
				<v-btn
					@click="openURL('https://ko-fi.com/T6T2W19IM')"
					color="primary" size="32"
					v-bind="props"
				>
					<v-icon>mdi-coffee</v-icon>
				</v-btn>
			</template>
		</v-tooltip>

		<v-menu open-on-hover :close-on-content-click="false">
			<template v-slot:activator="{ props }">
				<v-btn color="primary" v-bind="props" size="32">
					<v-icon>mdi-cog</v-icon>
				</v-btn>
			</template>

			<v-list density="compact" class="border">
				<v-list-item @click="initSavedString()">
					<v-list-item-title>Export</v-list-item-title>
					<template v-slot:prepend>
						<v-icon>mdi-export</v-icon>
					</template>
				</v-list-item>
				<v-list-item @click="initSavedString(false)">
					<v-list-item-title>Import</v-list-item-title>
					<template v-slot:prepend>
						<v-icon>mdi-import</v-icon>
					</template>
				</v-list-item>
				<v-list-item @click="openURL('https://github.com/Cerceis/chiyo-kdm-sheet')">
					<v-list-item-title>Github</v-list-item-title>
					<template v-slot:prepend>
						<v-icon>mdi-github</v-icon>
					</template>
				</v-list-item>
				<v-list-item>
					<v-list-item-title>Set switch tab hotkey</v-list-item-title>
					<div class="styledRow">
						<v-select 
							v-model="switchTabHotkeyPrefix"
							:items="prefixKeymap"
							item-title="label"
							item-value="code"
							density="compact"
							hide-details
							variant="outlined"
							style="max-width: 100px;"
							@change="saveHotkeys"
						/>
						+
						<div>
							{{ setKeyMode ? "Press any key..." : switchTabHotkey }}
						</div>
						<v-btn
							v-if="!setKeyMode"
						   @click="setKeyMode = true"
						   color="primary"
						>
						   Change
						</v-btn>
					</div>

					
				</v-list-item>
				<v-list-item>
					<v-list-item-title>Set theme color</v-list-item-title>
					<v-color-picker v-model="$vuetify.theme.themes.dark.colors.primary" @update:model-value="saveThemeColor($vuetify.theme.themes.dark.colors.primary)"></v-color-picker>
				</v-list-item>
			</v-list>
		</v-menu>

		<v-divider vertical />
		<div class="styledRow text-caption">
			<KDMIcon icon="Settlement" :size="32" />
			<v-switch
				v-model="survivorView"
				hide-details
				density="compact"
			></v-switch>
			<KDMIcon icon="Survivors" :size="32" />
		</div>
		<v-divider vertical />
		<v-btn
		   @click="save()"
		   class="text-caption"
		>
			<template v-if="notSavedYet">
				<v-icon color="red">mdi-content-save</v-icon>
				Not saved yet !
			</template>
			<template v-else-if="saving">
				<v-progress-circular
					color="green"
					indeterminate
					size="24"
				></v-progress-circular>
				Saving...
			</template>
			<template v-else>
				<v-icon color="green">mdi-content-save</v-icon>
				Saved: {{ lastSavedString }}
			</template>
		</v-btn>
		<div class="styledRow">
			<v-chip density="compact" class="text-caption" color="secondary">KDM: 1.6</v-chip>
			<v-chip density="compact" class="text-caption" color="secondary">GCE Partly</v-chip>
		</div>
		<v-dialog v-model="showDialog" persistent>
			<v-sheet class="pa-3">
				<div class="styledRow justify-space-between">
					Save String
					<v-btn
						@click="showDialog = false"
						color="error"
						size="32"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</div>
				<v-divider class="mt-1" />
				<div class="styledRow justify-space-between my-1">
					Copy this string, and save it somewhere. You can import data by using this string on other computer.
					<div class="d-flex gap-1">
						<v-btn
							@click="importString()"
							color="success"
						>
							Import data from string below
						</v-btn>
						<v-btn
							@click="FromString.copyToClipboard(saveString)"
							color="success"
							size="36"
						>
							<v-icon>mdi-content-copy</v-icon>
						</v-btn>
					</div>
				</div>
				<v-textarea 
					v-model="saveString"
					variant="outlined"
					hide-details
				/>
			</v-sheet>
		</v-dialog>
	</div>
</template>
 
<script setup lang="ts">
import { Ref, ref, onMounted, onUnmounted } from "vue";
import { characterFunc, archive } from "@/logics/character";
import { settlementFunc } from "@/logics/settlement";
import { 
	survivorView, switchTabHotkey, 
	prefixKeymap, switchTabHotkeyPrefix,
	saveHotkeys, loadHotkeys
} from "@/logics/global";
import { save, saving, lastSavedString, notSavedYet, load, saveThemeColor } from "@/logics/system";
import { FromString } from "cerceis-lib";

const setKeyMode: Ref<boolean> = ref(false);
const initSwitchTabHotkey = (e: any) => {
	if(!e) return;
	if(
		e.code.includes("Meta") || e.code.includes("Control") ||
		e.code.includes("Alt") || e.code.includes("Shift")
	) return;
	if(setKeyMode.value){
		switchTabHotkey.value = e.code;
		setKeyMode.value = false;
		saveHotkeys();
		return;
	}
	if(
		e.code === switchTabHotkey.value && 
		e[switchTabHotkeyPrefix.value]
	){
		survivorView.value = !survivorView.value;
	}
}

onMounted(() => {
	window.addEventListener("keyup", initSwitchTabHotkey);
	loadHotkeys();
})
onUnmounted(() => window.removeEventListener("keyup", initSwitchTabHotkey));

const openURL = (url: string) => {
    window.open(url, "_blank");
}

const showDialog: Ref<boolean> = ref(false);
const saveString: Ref<string> = ref("");

const initSavedString = (ex: boolean = true) => {
	saveString.value = "";
	if(ex){
		saveString.value = save();
	}
	showDialog.value = true;
}

const importString = () => {
	if(!saveString.value) return;
	load(saveString.value)
	showDialog.value = false;
}




</script>
 
<style scoped>
 
</style>