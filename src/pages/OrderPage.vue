<template>
    <div class="order-page">
        <menu-block @menu-click="menuOpen"/>
        <div class="order" :class="{ pageInfoIfMenuOpen: clicked }">
            <page-header/>
            <tabs-block @selectedTabIndx='choiceComponent' :pageIndx="componentIndx"/>
            <div class="order-info" >
                <keep-alive><component :is="selectedComponent"></component></keep-alive>
                <order-calc @nextPage="choiceComponent" :pageIndx="componentIndx"/>
            </div>
        </div>
    </div>
</template>

<script>
import MenuBlock from '../components/MenuBlock.vue'
import OrderLocation from '../components/OrderLocation.vue'
import OrderCalc from '../components/OrderCalc.vue'
import TabsBlock from '../components/TabsBlock.vue'
import PageHeader from '../components/PageHeader.vue'
import CarModel from '../components/CarModel.vue'
import AdditionalBlock from '../components/AdditionalBlock.vue'
import TotalBlock from '../components/TotalBlock.vue'

export default {
    name: 'OrderPage',

    components: {
        MenuBlock,
        PageHeader,
        TabsBlock,

        OrderCalc,
        OrderLocation,
        CarModel,
        AdditionalBlock,
        TotalBlock
    },

    data() {
        return {
            clicked: false,
            selectedComponent: "OrderLocation",
            componentsNames: [
                "OrderLocation",
                "CarModel",
                "AdditionalBlock",
                "TotalBlock"
            ],
            componentIndx: 0
        }
    },

    methods: {
        menuOpen(value) {
            this.clicked = value;
        },

        choiceComponent(data) {
            this.selectedComponent = this.componentsNames[data.index];
            
            if(data) {
                this.componentIndx = data.index;
            }
        }
    },
}
</script>