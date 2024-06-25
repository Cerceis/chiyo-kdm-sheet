<template>
	<div class="ma-1 d-flex gap-1 align-center">
		Chiyo KDM Sheet 
		<div class="caption text-caption">
			v1.02
		</div>
		<v-btn  color="primary" size="small" @click="characterFunc.new()">
			<v-icon>mdi-plus</v-icon>
			New Survivor
		</v-btn>
		<v-btn  color="primary" size="small" @click="settlementFunc.new()">
			<v-icon>mdi-plus</v-icon>
			New Settlement
		</v-btn>
		<v-tooltip text="Export">
			<template v-slot:activator="{ props }">
				<v-btn  v-bind="props" color="primary" size="28" @click="initSavedString()">
					<v-icon>mdi-export</v-icon>
				</v-btn>
			</template>
		</v-tooltip>
		<v-tooltip text="Import">
			<template v-slot:activator="{ props }">
				<v-btn  v-bind="props" color="primary" size="28" @click="initSavedString(false)">
					<v-icon>mdi-import</v-icon>
				</v-btn>
			</template>
		</v-tooltip>
		
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

		<v-tooltip text="Github">
			<template v-slot:activator="{ props }">
				<v-btn
					@click="openURL('https://github.com/Cerceis/chiyo-kdm-sheet')"
					color="primary" size="32"
					v-bind="props"
				>
					<v-icon>mdi-github</v-icon>
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
		

		<v-divider vertical />
		<div class="styledRow text-caption">
			Settlement
			<v-switch
				v-model="survivorView"
				hide-details
				density="compact"
			></v-switch>
			Survivors
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
			<v-chip density="compact" class="text-caption crossText" color="secondary">GCE</v-chip>
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
import { Ref, ref } from "vue";
import { characterFunc, archive } from "@/logics/character";
import { settlementFunc } from "@/logics/settlement";
import { survivorView } from "@/logics/global";
import { save, saving, lastSavedString, notSavedYet, load } from "@/logics/system";
import { FromString } from "cerceis-lib";

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