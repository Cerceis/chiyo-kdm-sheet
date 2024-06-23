<template>
	<v-app>
		<v-main>
			<Nav />
			<v-divider class="my-1" />
			<CharacterPanel />
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
import Nav from "@/components/Nav.vue";
import CharacterPanel from '@/components/CharacterPanel.vue';
import { load } from "@/logics/system";
import { onMounted } from "vue";

onMounted(() => {
	load();
})

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
*{
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
.styledRow{
	display: flex;
	align-items: center;
	gap: .5em;
}
.styledRowDense{
	display: flex;
	align-items: center;
}
input, textarea{
	outline: 1px solid rgba(255,255,255,.3);
	border-radius: 4px;
	padding: 0 .25em;
	display: flex;
	justify-content: center;
	align-items: center;
}
.v-expansion-panel-text__wrapper{
	padding: 0;
}
</style>
