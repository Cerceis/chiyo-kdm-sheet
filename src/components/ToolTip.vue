<template>
    <v-tooltip v-if="!solid" :location="location">
        <template v-slot:activator="{ props }">
            <div v-bind="props">
                <slot ></slot>
            </div>
        </template>
        <div v-if="text" v-html="text" class="tipText"></div>
        <slot v-else name="text"></slot>
    </v-tooltip>
    <v-menu v-else open-on-hover :close-on-content-click="false" :location="location">
        <template v-slot:activator="{ props }">
            <div v-bind="props">
                <slot ></slot>
            </div>
        </template>
        <v-sheet class="border pa-3 readingPaper">
            <div v-if="text" v-html="text" class="tipText"></div>
            <slot v-else name="text"></slot>
        </v-sheet>
    </v-menu>
</template>
 
<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
    text: {
        type: String,
        default: ""
    },
    location: {
        type: String as PropType<"top" | "left" | "right" | "bottom">,
        default: "bottom"
    },
    solid: {
        type: Boolean,
        default: true
    }
})
 
</script>

<style scoped>
.tipText{
	white-space: break-spaces;
}
.readingPaper{
	background-color: rgb(200, 200, 200) !important;
	color: black;
}
</style>