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
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
*{
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>
