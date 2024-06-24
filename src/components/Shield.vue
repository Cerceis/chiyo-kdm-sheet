<template>
	<div class="shieldWrapper">
		<div class="shieldInner" contenteditable @input="sync($event.target as any)">
			{{ props.modelValue }}
		</div>
	</div>
</template>
 
<script setup lang="ts">

const props = defineProps({
	modelValue: {
		type: [String, Number],
	}
}) 

const emit = defineEmits(["update:modelValue"])

const sync = (e: HTMLDivElement | null) => {
	if(!e) return;
	emit("update:modelValue", e.textContent?.trim())
}

</script>
 
<style scoped>
.shieldWrapper{
	position: relative;
	height: 48px;
	width: 48px;
	background-image: url("../assets/images/Shield.png");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
.shieldInner{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 26px;
	min-width: 30px;
	text-align: center;
}
</style>