<template>
	<v-app>
		<v-main>
			<Nav />
			<v-divider class="my-1" />
			<CharacterPanel v-if="survivorView" :key="`cp-${refreshKey}`" />
			<SettlementPanel v-else :key="`sp-${refreshKey}`" />
		</v-main>
		<Popup />
	</v-app>
</template>

<script setup lang="ts">
import Nav from "@/components/Nav.vue";
import Popup from "@/components/Popup.vue";
import CharacterPanel from '@/components/CharacterPanel.vue';
import SettlementPanel from "@/components/SettlementPanel.vue";
import { load } from "@/logics/system";
import { survivorView, refreshKey } from "@/logics/global";
import { onMounted } from "vue";
import { useTheme } from "vuetify";

onMounted(() => {
	load();
	// Load theme color
	const savedColor = localStorage.getItem("chiyoKDMThemeColor");
	if(savedColor) useTheme().themes.value.dark.colors.primary = savedColor;
})

</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
html{
	overflow: hidden;
}

*{
	font-family: "Montserrat", sans-serif !important;
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
.largeCheckbox{
	width: 24px;
	height: 24px;
}
.crossText{
	position: relative;  
}
.crossText:after {
  position: absolute;
  left: 0;
  top: 50%;
  height: 1px;
  background: #c00;
  content: "";
  width: 100%;
  display: block;
}
</style>
