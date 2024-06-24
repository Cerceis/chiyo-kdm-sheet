<template>
    <v-dialog v-for="(popup, i) in popupList" :key="i" v-model="popup.display" persistent width="max-content">
        <v-card class="theCard">
            <v-card-title class="pa-0">
                <v-sheet 
                    class="py-1 px-3"
                    :color="popup.color" 
                >
                    {{ popup.title }}
                </v-sheet>
            </v-card-title>
            <v-card-text>
                <template v-if="popup.loader">
                    <div class="loaderWrapper">
                        <div class="loader">
                            <div class="dot" v-for="i in 25"></div>
                        </div>
                    </div>
                    <div class="loaderText" v-html="popup.text"></div>
                </template>
                <template v-else>
                    <div v-html="popup.text"></div>
                </template>
            </v-card-text>
            <v-card-actions class="justify-end" v-if="!popup.loader">
                <v-btn v-if="!popup.singleBtn" color="error" @click="popup.cancel()">{{ popup.btnCancel }}</v-btn>
                <v-btn variant="outlined" color="success" @click="popup.ok()">{{ popup.btnOk }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
 
<script setup lang="ts">
import { popupList } from '@/logics/popup';

</script>
 
<style scoped>
.theCard{
    width: max-content;
    min-width: 300px;
}
.loaderWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70px;
}

.loader {
    position: relative;
}

.loaderText{
    text-align: center;
}

.loader .dot {
    animation-name: movement;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    height: 10px;
    position: absolute;
    top: -10px;
    transform: translate3d(0, -25px, 0) scale(1);
    width: 10px;
}

.loader .dot:nth-of-type(1) {
    animation-delay: -0.1s;
    left: 150px;
}

.loader .dot:nth-of-type(1)::before {
    animation-delay: -0.1s;
}

.loader .dot:nth-of-type(2) {
    animation-delay: -1.2s;
    left: 150px;
}

.loader .dot:nth-of-type(2)::before {
    animation-delay: -1.2s;
}

.loader .dot:nth-of-type(3) {
    animation-delay: -0.3s;
    left: 125px;
}

.loader .dot:nth-of-type(3)::before {
    animation-delay: -0.3s;
}

.loader .dot:nth-of-type(4) {
    animation-delay: -1.4s;
    left: 125px;
}

.loader .dot:nth-of-type(4)::before {
    animation-delay: -1.4s;
}

.loader .dot:nth-of-type(5) {
    animation-delay: -0.5s;
    left: 100px;
}

.loader .dot:nth-of-type(5)::before {
    animation-delay: -0.5s;
}

.loader .dot:nth-of-type(6) {
    animation-delay: -1.6s;
    left: 100px;
}

.loader .dot:nth-of-type(6)::before {
    animation-delay: -1.6s;
}

.loader .dot:nth-of-type(7) {
    animation-delay: -0.7s;
    left: 75px;
}

.loader .dot:nth-of-type(7)::before {
    animation-delay: -0.7s;
}

.loader .dot:nth-of-type(8) {
    animation-delay: -1.8s;
    left: 75px;
}

.loader .dot:nth-of-type(8)::before {
    animation-delay: -1.8s;
}

.loader .dot:nth-of-type(9) {
    animation-delay: -0.9s;
    left: 50px;
}

.loader .dot:nth-of-type(9)::before {
    animation-delay: -0.9s;
}

.loader .dot:nth-of-type(10) {
    animation-delay: -2s;
    left: 50px;
}

.loader .dot:nth-of-type(10)::before {
    animation-delay: -2s;
}

.loader .dot:nth-of-type(11) {
    animation-delay: -1.1s;
    left: 25px;
}

.loader .dot:nth-of-type(11)::before {
    animation-delay: -1.1s;
}

.loader .dot:nth-of-type(12) {
    animation-delay: -2.2s;
    left: 25px;
}

.loader .dot:nth-of-type(12)::before {
    animation-delay: -2.2s;
}

.loader .dot:nth-of-type(13) {
    animation-delay: -1.3s;
    left: 0px;
}

.loader .dot:nth-of-type(13)::before {
    animation-delay: -1.3s;
}

.loader .dot:nth-of-type(14) {
    animation-delay: -2.4s;
    left: 0px;
}

.loader .dot:nth-of-type(14)::before {
    animation-delay: -2.4s;
}

.loader .dot:nth-of-type(15) {
    animation-delay: -1.5s;
    left: -25px;
}

.loader .dot:nth-of-type(15)::before {
    animation-delay: -1.5s;
}

.loader .dot:nth-of-type(16) {
    animation-delay: -2.6s;
    left: -25px;
}

.loader .dot:nth-of-type(16)::before {
    animation-delay: -2.6s;
}

.loader .dot:nth-of-type(17) {
    animation-delay: -1.7s;
    left: -50px;
}

.loader .dot:nth-of-type(17)::before {
    animation-delay: -1.7s;
}

.loader .dot:nth-of-type(18) {
    animation-delay: -2.8s;
    left: -50px;
}

.loader .dot:nth-of-type(18)::before {
    animation-delay: -2.8s;
}

.loader .dot:nth-of-type(19) {
    animation-delay: -1.9s;
    left: -75px;
}

.loader .dot:nth-of-type(19)::before {
    animation-delay: -1.9s;
}

.loader .dot:nth-of-type(20) {
    animation-delay: -3s;
    left: -75px;
}

.loader .dot:nth-of-type(20)::before {
    animation-delay: -3s;
}

.loader .dot:nth-of-type(21) {
    animation-delay: -2.1s;
    left: -100px;
}

.loader .dot:nth-of-type(21)::before {
    animation-delay: -2.1s;
}

.loader .dot:nth-of-type(22) {
    animation-delay: -3.2s;
    left: -100px;
}

.loader .dot:nth-of-type(22)::before {
    animation-delay: -3.2s;
}

.loader .dot:nth-of-type(23) {
    animation-delay: -2.3s;
    left: -125px;
}

.loader .dot:nth-of-type(23)::before {
    animation-delay: -2.3s;
}

.loader .dot:nth-of-type(24) {
    animation-delay: -3.4s;
    left: -125px;
}

.loader .dot:nth-of-type(24)::before {
    animation-delay: -3.4s;
}

.loader .dot:nth-of-type(25) {
    animation-delay: -2.5s;
    left: -150px;
}

.loader .dot:nth-of-type(25)::before {
    animation-delay: -2.5s;
}

.loader .dot:nth-of-type(26) {
    animation-delay: -3.6s;
    left: -150px;
}

.loader .dot:nth-of-type(26)::before {
    animation-delay: -3.6s;
}

.loader .dot::before {
    animation-name: size-opacity;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    background: rgba(var(--v-theme-primary));
    border-radius: 50%;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
}

.loader .dot:nth-of-type(odd)::before {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 4px white;
}

.loader .dot:nth-of-type(even)::before {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 4px rgba(var(--v-theme-primary));
}


@keyframes movement {
    0% {
        transform: translate3d(0, -25px, 0);
        z-index: 0;
    }

    50% {
        transform: translate3d(0, 25px, 0);
        z-index: 10;
    }

    100% {
        transform: translate3d(0, -25px, 0);
        z-index: -5;
    }
}

@keyframes size-opacity {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    25% {
        transform: scale(2);
    }

    50% {
        opacity: 1;
    }

    75% {
        opacity: 0.35;
        transform: scale(0.25);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>

