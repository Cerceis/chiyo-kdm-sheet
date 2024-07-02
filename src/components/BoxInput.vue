<template>
	<div v-if="twin">
		<div class="boxWrapper">
			<div class="boxInner" @input="sync($event.target as any)">
				{{ val1 + val2 }}
			</div>
		</div>
		<div class="d-flex">
			<div class="boxWrapperMini" id="v1" :contenteditable="!readonly" @input="sync($event.target as any)">{{ val1 }}</div>
			<div class="boxWrapperMini" id="v2" :contenteditable="!readonly" @input="sync($event.target as any)">{{ val2 }}</div>
		</div>
	</div>
	<div v-else class="boxWrapper">
		<div class="boxInner" :contenteditable="!readonly" @input="sync($event.target as any)">
			{{ value ? value : props.modelValue }}
		</div>
	</div>
</template>
 
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
	twin:{
		type: Boolean,
		default: false,
	}, 
	modelValue:{
		type: [String, Number],
	},
	value:{
		type: [String, Number],
	},
	v1: {
		type: Number
	},
	v2: {
		type: Number
	},
	readonly:{
		type: Boolean,
		default: false,
	}
})

const val1 = computed(() => props.v1 ?? 0);
const val2 = computed(() => props.v2 ?? 0);

const emit = defineEmits(["update:modelValue", "v1", "v2"])

const sync = (e: HTMLDivElement | null) => {
	if(!e) return;
	if(props.twin){
		if(e.id === "v1") emit("v1", Number(e.textContent?.trim()));
		if(e.id === "v2") emit("v2", Number(e.textContent?.trim()));
		return;
	}
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
	top: 50%;
	left: 50%; 
	transform: translate(-50%, -50%);
	min-width: 36px;
	text-align: center;
}
.boxWrapperMini{
	position: relative;
	border: 1px solid rgba(255,255,255,.3);
	height: 24px;
	width: 24px;
	overflow: hidden;
	text-align: center;
	font-size: 16px;
}
</style>