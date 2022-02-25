<template>
    <div class="order-page">
        <menu-block @menu-click="menuOpen"/>
        <div class="order" :class="{ pageInfoIfMenuOpen: clicked }">
            <page-header/>
            <tabs-block/>
            <div class="order-info">
                <order-location/>
                <order-calc/>
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

export default {
    name: 'OrderPage',

    components: {
        MenuBlock,
        TabsBlock,
        OrderLocation,
        OrderCalc,
        PageHeader
    },

    data() {
        return {
            clicked: false
        }
    },

    methods: {
        menuOpen(value) {
            this.clicked = value;
        }
    }
}
</script>