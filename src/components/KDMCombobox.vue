<template>
	<v-combobox 
		chips multiple hide-details
		variant="outlined"
	>
		<template v-slot:selection="{ item }">
			<v-chip small>
				{{ item }}
			</v-chip>
		</template>
	</v-combobox>
</template>

<script setup lang="ts">

</script>

<style>
.v-field__input {
	padding: 0 .25em !important;
	min-height: 24px !important;
}

.v-field__input input {
	outline: none !important;

}

.v-field__input,
.v-field__field {
	height: 24px !important;
}
</style>
<style scoped></style>