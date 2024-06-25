<template>
	<div class="d-flex">
		<div class="survivalDrawer">
			<v-text-field
				v-model="keyword"
				density="compact"
				variant="outlined"
				hide-details
				placeholder="Search..."
			/>
			<v-list-item 
				v-for="survivor in filteredSurvivor" 
				class="survivalCard"
				@click="selectedCharacter = survivor;"
				style="min-height: 200px;"
			>
				<div>
					<v-icon 
						v-if="survivor.id === monsterController" class="mr-1"
						color="warning"
					>mdi-brain</v-icon>
					<v-icon 
						v-if="survivor.dead" class="mr-1"
						color="red"
					>mdi-emoticon-dead-outline</v-icon>
					<span>{{ survivor.name }}</span>
					<v-divider class="my-1"/>
					<CharacterSummary :c="survivor" />
				</div>
				<v-divider class="my-1" />
				<div class="d-flex justify-end gap-1">
					<v-tooltip text="Move up">
						<template v-slot:activator="{ props }">
							<v-btn
								v-bind="props"
								@click="$event.stopPropagation(); characterFunc.move(survivor.id, -1)"
								color="primary"
								size="32"
							>
								<v-icon>mdi-arrow-up-bold</v-icon>
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
							>
								<v-icon>mdi-arrow-down-bold</v-icon>
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
		<div class="d-flex justify-center w-100 survivalSheetWrapper">		
			<CharacterSheet v-if="selectedCharacter" :c="selectedCharacter" />
		</div>
	</div>
</template>
 
<script setup lang="ts">
import { ref, Ref, computed, onMounted, onUnmounted } from "vue";
import { characters, characterFunc, Character } from '@/logics/character';
import CharacterSheet from '@/components/CharacterSheet.vue';
import CharacterSummary from "@/components/CharacterSummary.vue";

const keyword: Ref<string> = ref("");
const selectedCharacter: Ref<Character | null> = ref(null);
const monsterController: Ref<string> = ref("");

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
	window.addEventListener("keyup", hotkeyListeners)
})
onUnmounted(() => window.removeEventListener("keyup", hotkeyListeners))

</script>
 
<style scoped>
.survivalDrawer{
	display: grid;
	gap: .25em;
	align-items: flex-start;
	align-content: start;
	width: 280px;
	max-width: 280px;
	height: calc(100vh - 56px - 40px);
	overflow-x: hidden;
	overflow-y: scroll;
}
.survivalSheetWrapper{
	height: calc(100vh - 56px);
	overflow-x: hidden;
	overflow-y: scroll;
}
.survivalCard{
	background: rgba(50, 50, 50);
	border-radius: 6px !important;
	padding: 2px 4px;
	margin: 2px;
}
</style>