<template>
	<div class="boxWrapper">
		<div class="boxInner" contenteditable :value="props.modelValue" @input="sync($event.target as any)">
			{{ props.modelValue }}
		</div>
	</div>
</template>
 
<script setup lang="ts">

const props = defineProps({
	modelValue:{
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
.boxWrapper{
	position: relative;
	border: 1px solid rgba(255,255,255,.3);
	height: 48px;
	width: 48px;
	overflow: hidden;
}
.boxInner{
	position: absolute;
	font-size: 36px;
	top: -10px;
	left: 50%; 
	transform: translateX(-50%);
	min-width: 36px;
	text-align: center;
}
</style>