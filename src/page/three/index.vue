<template>
    <h2 v-for="i in 10" :key="i">吸顶效果{{ i }}</h2>
    <div class="useForCalc">
        <h1 class="useForStick" v-stick="{
            calcDomClass: '.useForCalc',
            stickDomClass: '.useForStick',
            fixedName: 'fixedH1Dom'
        }">--------吸顶元素--------</h1>
    </div>
    <h2 v-for="i in 40" :key="i">吸顶效果{{ i }}</h2>
</template>

<style>
h1 {
    width: 360px;
    background-color: #999;
}
</style>