<template>
	<v-app>
		<v-main>
			<Nav />
			<v-divider class="my-1" />
			<SideNav />
			<div v-if="survivorView" :key="`cp-${refreshKey}`">
				<CharacterSheet v-if="selectedCharacter" :c="selectedCharacter" />
			</div>
			
			<div v-else :key="`sp-${refreshKey}`">		
				<SettlementSheet v-if="selectedSettlement" :s="selectedSettlement" />
			</div>
		</v-main>
		<Popup />
	</v-app>
</template>

<script setup lang="ts">
import Nav from "@/components/Nav.vue";
import Popup from "@/components/Popup.vue";
import SideNav from "@/components/SideNav.vue";
import { load } from "@/logics/system";
import { survivorView, refreshKey } from "@/logics/global";
import { onMounted } from "vue";
import { useTheme } from "vuetify";
import { selectedSettlement } from "@/logics/settlement";
import { selectedCharacter } from "./logics/character";

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
.v-navigation-drawer__content{
	overflow-y: hidden;
}
.sheetWrapper{
	display: grid;
	overflow-y: auto;	
	height: calc(100vh - 56px);
	justify-content: center;
}
.sheetPanelWrapper{
	display: grid;
	gap: .25em;
	align-items: flex-start;
	align-content: start;
	width: 100%;
	height: calc(100vh - 132px - 32px - 16px - 40px);
	overflow-x: hidden;
	overflow-y: scroll;
}
.autocomplete-suggestions-wrapper{
	position: relative;
}
.autocomplete-suggestions {
	border: 1px solid #d4d4d4;
	border-radius: 8px;
	border-top: none;
	position: absolute;
	max-height: 200px;
	overflow-y: auto;
	background-color: #d4d4d4;
	color: black;
	z-index: 99;
}
.autocomplete-suggestion {
	padding: .25em;
	cursor: pointer;
}
.autocomplete-suggestion.active {
	background-color: rgba(100,100,100,.3);
}	
</style>
