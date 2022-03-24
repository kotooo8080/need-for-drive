<template>
    <div class="order-calculation">
        <p>Ваш заказ:</p>
        <div class="pickup-point-address with-dots">
            <h5 class="item-name">Пункт выдачи</h5>
            <span class="dots"></span>
            <h5 class="item-value address">{{city}}, {{point}}</h5>
        </div>
        <div 
            v-if="filledOrderData > 0" 
            class="order-model with-dots"
        >
            <h5 class="item-name">Модель</h5>
            <span class="dots"></span>
            <h5 class="item-value">{{ model }}</h5>
        </div>
        <div 
            v-if="filledOrderData > 1" 
            class="car-color with-dots"
        >
            <h5 class="item-name">Цвет</h5>
            <span class="dots"></span>
            <h5 class="item-value">{{ color }}</h5>
        </div>
        <div 
            v-if="filledOrderData > 1" 
            class="rental-duration with-dots"
        >
            <h5 class="item-name">Длительность аренды</h5>
            <span class="dots"></span>
            <h5 class="item-value">{{ duration }}</h5>
        </div>
        <div 
            v-if="filledOrderData > 1" 
            class="order-tariff with-dots"
        >
            <h5 class="item-name">Тариф</h5>
            <span class="dots"></span>
            <h5 class="item-value">{{ tariff }}</h5>
        </div>
        <div v-if="filledOrderData > 1 && services.length != 0">
            <div  
                class="add-options with-dots"
                v-for="service in services"
                :key=service
            >
                <h5 class="item-name">{{ service }}</h5>
                <span class="dots"></span>
                <h5 class="item-value model">Да</h5>
            </div>
        </div>
        <div class="price-block">
            <p>Цена:</p>
            <h4>{{ price }}</h4>
        </div>
        <button 
            v-if="!finalOrderInfo" 
            :class="{ 'active-button': activateButton || pageIndx === 3 }"
            @click="displayNextPage"
        >{{ buttonNames[pageIndx] }}</button>
        <button 
            v-else 
            class="active-button"
            :class="{ cancelButton: finalOrderInfo }"
            @click="$router.push('/order')"
        >{{ 'Отменить' }}</button>
    </div>
</template>

<script>

export default {
    name: 'OrderCalc',

    props: {
        pageIndx: Number,
        finalOrderInfo: Boolean,
        refreshDataInCalc: Object,
        activateButton: Boolean,
        calcPrice: Object
    },

    data() {
        return {
            buttonNames: [
                'Выбрать модель',
                'Дополнительно',
                'Итого',
                'Заказать'
            ],

            city: 'Ульяновск',
            point: 'Нариманова 42',
            model: 'Hyndai, ELANTRA',
            color: 'Любой',
            duration: '1д2ч',
            tariff: 'Поминутно',
            services: [],
            price: 'от 8000 до 12000 ₽',

            orderCalcData: new Map(),
            filledOrderData: -1
        }
    },

    created() {
        let filledData = sessionStorage.getItem('current-tab');
        if(filledData) this.filledOrderData = filledData;

        let city = sessionStorage.getItem('city');
        let point = sessionStorage.getItem('point');
        let car = sessionStorage.getItem('car-model');
        let color = sessionStorage.getItem('color');
        let price = sessionStorage.getItem('car-price');
        let tariff = sessionStorage.getItem('tariff');
        let services = sessionStorage.getItem('services');
        let duration = sessionStorage.getItem('duration');
        
        if(city) this.city = city;
        if(point) this.point = point;
        if(car) this.model = car;
        if(color) this.color = color;
        if(price) this.price = price;
        if(tariff) this.tariff = tariff;
        if(services) this.services = services.split(',');
        if(duration) this.duration = duration;
    },

    watch: {
        refreshDataInCalc: function() {
            let keys = Object.keys(this.refreshDataInCalc);
            for(let i = 0; i < keys.length; i++) {
                this.orderCalcData.set(keys[i], this.refreshDataInCalc[keys[i]]);
                this[keys[i]] = this.orderCalcData.get(keys[i]);
            }
            this.filledOrderData = sessionStorage.getItem('current-tab');
        }, 

        calcPrice: function() {
            this.orderCalcData.set('price', this.calcPrice.price);
            this.price = this.orderCalcData.get('price');
        },

        pageIndx: function() {
            if(this.pageIndx < this.filledOrderData) {
                if(this.pageIndx < 2) {
                    sessionStorage.removeItem('color');
                    sessionStorage.removeItem('tariff');
                    sessionStorage.removeItem('services');
                    sessionStorage.removeItem('checked-services');
                    sessionStorage.removeItem('duration');

                    this.orderCalcData.delete('color');
                    this.orderCalcData.delete('tariff');
                    this.orderCalcData.delete('services');
                    this.orderCalcData.delete('duration');
                }
                this.filledOrderData = sessionStorage.getItem('current-tab');
            }
        }
    },

    methods: {
        displayNextPage() {
            if(this.pageIndx < 3) {
                this.$emit('nextPage', { index: this.pageIndx + 1 });
            } else {
                this.$emit('confirmOrder');
            }
        }
    },
}
</script>