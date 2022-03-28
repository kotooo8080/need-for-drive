<template>
    <div 
        class="order-page" 
        :class="{ 'confirmOpen': confirmOrder }" 
    >
        <menu-block @menu-click="menuOpen"/>
        <div 
            class="order" 
            :class="{ pageInfoIfMenuOpen: clicked }"
        >
            <page-header/>
            <tabs-block  
                :pageIndx="componentIndx"
                @selectedTabIndx='choiceComponent'
            />
            <div class="order-info" >
                <keep-alive><component @componentData="addNewDataInCalcBlock" @componentChanged="reloadPageData" :is="selectedComponent"></component></keep-alive>
                <order-calc 
                    :pageIndx="componentIndx"
                    :activateButton="activateButton"
                    @nextPage="choiceComponent" 
                    @confirmOrder="confirmOrder = true"
                    :refreshDataInCalc="refreshDataInCalc"
                />
            </div>
        </div>
        <confirmation-window v-if="confirmOrder" @closeConfirm="confirmOrder = false"/>
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
import ConfirmationWindow from '../components/ConfirmationWindow.vue'

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
        TotalBlock,
        ConfirmationWindow,
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
            componentIndx: 0,
            confirmOrder: false,
            refreshDataInCalc: {},
            activateButton: false
        }
    },

    created() {
        let lastEditedComponent = sessionStorage.getItem('current-tab');
        if(null !== lastEditedComponent) {
            this.componentIndx = Number(lastEditedComponent);
            this.selectedComponent = this.componentsNames[lastEditedComponent];
        }
    },

    methods: {
        menuOpen(value) {
            this.clicked = value;
        },

        choiceComponent(data) {
            if((this.componentIndx + 1 >= data.index || data.index == Number(sessionStorage.getItem('current-tab'))) && sessionStorage.getItem('current-tab') !== null && Number(sessionStorage.getItem('current-tab')) + 1 >= data.index) {
                this.selectedComponent = this.componentsNames[data.index];
                if(data) {
                    this.componentIndx = data.index;
                }
                this.activateButton = false;
            }
        },

        reloadPageData() {
            this.activateButton = true;
        },

        addNewDataInCalcBlock(data) {
            this.refreshDataInCalc = data;
        }
    },
}
</script>