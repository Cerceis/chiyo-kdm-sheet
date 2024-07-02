<template>
	<div class="sheetPanelWrapper">
		<v-list-item 
			v-for="survivor in filteredSurvivor" 
			class="survivalCard"
			@click="selectedCharacter = survivor;"
			style="min-height: 224px;"
		>
			<div>
				<span>{{ survivor.name }}</span>
				<v-divider class="my-1"/>
				<CharacterSummary :c="survivor" :monster-controller-id="monsterController" />
			</div>
			<v-divider class="my-1" />
			<div class="d-flex justify-end gap-1">
				<v-tooltip text="Move to start">
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							@click="$event.stopPropagation(); characterFunc.move(survivor.id, 2)"
							color="primary"
							size="32"
							style="width: 18px;"
						>
							<v-icon>mdi-arrow-collapse-up</v-icon>
						</v-btn>
					</template>
				</v-tooltip>
				<v-tooltip text="Move to end">
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							@click="$event.stopPropagation(); characterFunc.move(survivor.id, 3)"
							color="primary"
							size="32"
							style="width: 18px;"
						>
							<v-icon>mdi-arrow-collapse-down</v-icon>
						</v-btn>
					</template>
				</v-tooltip>
				<v-tooltip text="Move up">
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							@click="$event.stopPropagation(); characterFunc.move(survivor.id, -1)"
							color="primary"
							size="32"
							style="width: 18px;"
						>
							<v-icon>mdi-arrow-up</v-icon>
						</v-btn>
					</template>
				</v-tooltip>
				<v-tooltip text="Move down">
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							@click="$event.stopPropagation(); characterFunc.move(survivor.id, 1)"
							color="primary"
							size="32"
							style="width: 18px;"
						>
							<v-icon>mdi-arrow-down</v-icon>
						</v-btn>
					</template>
				</v-tooltip>
				<v-tooltip text="Move to archive">
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							@click="$event.stopPropagation(); characterFunc.moveToArchive(survivor)"
							color="primary"
							size="32"
						>
							<v-icon>mdi-grave-stone</v-icon>
						</v-btn>
					</template>
				</v-tooltip>
				<v-tooltip text="Set as monster controller">
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							@click="$event.stopPropagation(); monsterController = survivor.id"
							color="primary"
							size="32"
						>
							<v-icon>mdi-brain</v-icon>
						</v-btn>
					</template>
				</v-tooltip>
			</div>
		</v-list-item>
	</div>
</template>
 
<script setup lang="ts">
import { ref, Ref, computed, onMounted, onUnmounted } from "vue";
import { characters, characterFunc, selectedCharacter, monsterController } from '@/logics/character';
import CharacterSummary from "@/components/CharacterSummary.vue";

const props = defineProps({
	keyword:{
		type: String,
		default: ""
	}
})

const keyword = computed(() => props.keyword);

const filteredSurvivor = computed( () => {
	const fk = keyword.value.toUpperCase();
	return characters.value.filter(cc => cc.name.toUpperCase().includes(fk));
})

const hotkeyListeners = (e: KeyboardEvent) => {
	if(!e ||!e.code || !selectedCharacter.value) return;
	if(e.code === "ArrowUp"){
		characterFunc.move(selectedCharacter.value.id, -1);
	}
	if(e.code === "ArrowDown"){
		characterFunc.move(selectedCharacter.value.id, 1);
	}
}

onMounted(() => {
	if(characters.value[0]) selectedCharacter.value = characters.value[0];
	window.addEventListener("keyup", hotkeyListeners)
})
onUnmounted(() => window.removeEventListener("keyup", hotkeyListeners))

</script>
 
<style scoped>
.survivalCard{
	background: rgba(50, 50, 50);
	border-radius: 6px !important;
	padding: 2px 4px;
	margin: 2px;
}
</style>