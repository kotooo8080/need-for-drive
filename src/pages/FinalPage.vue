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
                <total-block 
                    :finalModel="carName"
                    :finalNumber="carNumber"
                    :finalOption1="fullTank"
                    :finalOption2="rightWheel"
                    :finalOption3="childChair"
                    :finalDateFrom="dateFrom"
                />
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
            orderId: '',
            carName: '',
            carNumber: '',
            fullTank: false,
            rightWheel: false,
            childChair: false,
            dateFrom: ''
        }
    },

    created() {
        this.orderId = sessionStorage.getItem('order-id');
        this.getOrderData();
    },

    methods: {
        menuOpen(value) {
            this.clicked = value;
        },

        getOrderData() {
            this.axios.get('https://api-factory.simbirsoft1.com/api/db/order/' + this.orderId, {
                headers: {
                    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b'
                }
            }).then((response) => {
                let responseData = response.data.data;
                this.carName = responseData.carId.name;
                this.carNumber = responseData.carId.number;
                this.fullTank = responseData.isFullTank;
                this.rightWheel = responseData.isRightWheel;
                this.childChair = responseData.isNeedChildChair;
                this.dateFrom = sessionStorage.getItem('start-date');
            });
        }
    },
}
</script>