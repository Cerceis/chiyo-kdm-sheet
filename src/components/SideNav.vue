<template>
 	<v-navigation-drawer
		@mouseover="rail = false"
		@mouseleave="keepOpen ? null  :rail = true"
	 	v-model="drawer"
        :rail="rail"
        permanent
		width="300"
		style="overflow-y: hidden"
	>
		<v-list>
			<v-list-item>
				<div class="grid justify-center">
					<KDMImage src="chiyokdm" />
					<div class="caption text-caption">
						v1.3
					</div>
					<v-checkbox
						v-model="keepOpen"
						density="compact"
						hide-details
						label="Keep Open"
					/>
				</div>
			</v-list-item>
		</v-list>
		<v-divider class="mb-2" />
		<div class="mx-2">
			<div class="d-flex align-start gap-1">
				<v-text-field
					v-model="keyword"
					density="compact"
					variant="outlined"
					hide-details
					placeholder="Search..."
					class="mb-2"
				/>
				<v-menu open-on-hover :close-on-content-click="false">
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							color="primary" size="40"
							disabled
						>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</template>
					<v-list class="border">
						<v-list-item prepend-icon="mdi-export" title="Export selected survivors" />
					</v-list>
				</v-menu>
			</div>
			
			<CharacterPanel v-if="survivorView" :keyword="keyword" />
			<SettlementPanel v-else :keyword="keyword" />
		</div>
	</v-navigation-drawer>
</template>
 
<script setup lang="ts">
import { ref, Ref } from "vue";
import { survivorView } from "@/logics/global";
import CharacterPanel from "@/components/CharacterPanel.vue";
import SettlementPanel from "@/components/SettlementPanel.vue";

const drawer: Ref<boolean> = ref(true);
const rail: Ref<boolean> = ref(true);
const keepOpen: Ref<boolean> = ref(false);
const keyword: Ref<string> = ref("");
 
</script>
 
<style scoped>
 
</style>