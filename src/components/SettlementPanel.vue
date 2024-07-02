<template>
	<div class="sheetPanelWrapper">
		<v-list-item 
			v-for="settlement in filteredSettlement" 
			class="settlementCard"
			@click="selectedSettlement = settlement;"
			style="min-height: 80px;"
		>
			<div>
				<v-icon 
					v-if="settlement.id === monsterController" class="mr-1"
					color="warning"
				>mdi-brain</v-icon>
				<span>{{ settlement.settlementName }}</span>
			</div>
			<v-divider class="my-1" />
			<div class="d-flex justify-end gap-1">
				<v-tooltip text="Move to start">
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							@click="$event.stopPropagation(); settlementFunc.move(settlement.id, 2)"
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
							@click="$event.stopPropagation(); settlementFunc.move(settlement.id, 3)"
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
							@click="$event.stopPropagation(); settlementFunc.move(settlement.id, -1)"
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
							@click="$event.stopPropagation(); settlementFunc.move(settlement.id, 1)"
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
							@click="$event.stopPropagation(); settlementFunc.moveToArchive(settlement)"
							color="primary"
							size="32"
						>
							<v-icon>mdi-grave-stone</v-icon>
						</v-btn>
					</template>
				</v-tooltip>
			</div>
		</v-list-item>
	</div>
</template>
 
<script setup lang="ts">
import { ref, Ref, computed, onMounted } from "vue";
import { settlements, settlementFunc, selectedSettlement } from '@/logics/settlement';

const props = defineProps({
	keyword:{
		type: String,
		default: ""
	}
})

const keyword = computed(() => props.keyword);
const monsterController: Ref<string> = ref("");

const filteredSettlement = computed( () => {
	const fk = keyword.value.toUpperCase();
	return settlements.value.filter(ss => ss.settlementName.toUpperCase().includes(fk));
})

onMounted(() => {
	if(settlements.value[0]) selectedSettlement.value = settlements.value[0];
})

</script>
 
<style scoped>
.settlementCard{
	background: rgba(50, 50, 50);
	border-radius: 6px !important;
	padding: 2px 4px;
	margin: 2px;
}
</style>