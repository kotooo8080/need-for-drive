<template>
    <div class="order-page">
        <menu-block @menu-click="menuOpen"/>
        <div 
            class="order" 
            :class="{ pageInfoIfMenuOpen: clicked }"
        >
            <page-header/>
            <div class="order-number">Заказ номер RU58491823</div>
            <div class="order-info" >
                <total-block />
                <order-calc :finalOrderInfo="true"/>
            </div>
        </div>
    </div>
</template>

<script>
import MenuBlock from '../components/MenuBlock.vue'
import OrderCalc from '../components/OrderCalc.vue'
import PageHeader from '../components/PageHeader.vue'
import TotalBlock from '../components/TotalBlock.vue'

export default {
    name: 'FinalPage',

    components: {
        MenuBlock,
        PageHeader,

        OrderCalc,
        TotalBlock,
    },

    data() {
        return {
            clicked: false,
        }
    },

    methods: {
        menuOpen(value) {
            this.clicked = value;
        },
    },
}
</script>