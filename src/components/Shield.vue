<template>
	<div class="shieldWrapper">
		<div class="shieldInner" contenteditable>
			{{ value }}
		</div>
	</div>
</template>
 
<script setup lang="ts">

defineProps({
	value: {
		type: Number,
	}
}) 

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
	left: 50%;
	transform: translate(-50%, 0);
	font-size: 26px;
}
</style>