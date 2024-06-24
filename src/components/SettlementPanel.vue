<template>
	<div class="d-flex">
		<div class="settlementDrawer">
			<v-text-field
				v-model="keyword"
				density="compact"
				variant="outlined"
				hide-details
				placeholder="Search..."
			/>
			<v-list-item 
				v-for="settlement in filteredSettlement" 
				class="settlementCard"
				@click="selectedSettlement = settlement;"
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
		<div class="d-flex justify-center w-100 settlementSheetWrapper">		
			<SettlementSheet v-if="selectedSettlement" :s="selectedSettlement" />
		</div>
	</div>
</template>
 
<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import { settlements, settlementFunc, Settlement } from '@/logics/settlement';
import SettlementSheet from '@/components/SettlementSheet.vue';

const keyword: Ref<string> = ref("");
const selectedSettlement: Ref<Settlement | null> = ref(null);
const monsterController: Ref<string> = ref("");

const filteredSettlement = computed( () => {
	const fk = keyword.value.toUpperCase();
	return settlements.value.filter(ss => ss.settlementName.toUpperCase().includes(fk));
})

</script>
 
<style scoped>
.settlementDrawer{
	display: grid;
	gap: .25em;
	align-items: flex-start;
	align-content: start;
	width: 280px;
	max-width: 280px;
	height: calc(100vh - 56px);
	overflow-x: hidden;
	overflow-y: scroll;
}
.settlementSheetWrapper{
	height: calc(100vh - 56px);
	overflow-x: hidden;
	overflow-y: scroll;
}
.settlementCard{
	background: rgba(50, 50, 50);
	border-radius: 6px !important;
	padding: 2px 4px;
	margin: 2px;
}
</style>