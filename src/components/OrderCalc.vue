<template>
    <div class="order-calculation">
        <p>Ваш заказ:</p>
        <div class="pickup-point-address with-dots">
            <h5 class="item-name">Пункт выдачи</h5>
            <span class="dots"></span>
            <h5 class="item-value address">Ульяновск, Нариманова 42</h5>
        </div>
        <div 
            v-if="pageIndx >= 1" 
            class="order-model with-dots"
        >
            <h5 class="item-name">Модель</h5>
            <span class="dots"></span>
            <h5 class="item-value">Hyndai i30 N</h5>
        </div>
        <div 
            v-if="pageIndx >= 2" 
            class="car-color with-dots"
        >
            <h5 class="item-name">Цвет</h5>
            <span class="dots"></span>
            <h5 class="item-value">Голубой</h5>
        </div>
        <div 
            v-if="pageIndx >= 2" 
            class="rental-duration with-dots"
        >
            <h5 class="item-name">Длительность аренды</h5>
            <span class="dots"></span>
            <h5 class="item-value">1д2ч</h5>
        </div>
        <div 
            v-if="pageIndx >= 2" 
            class="order-tariff with-dots"
        >
            <h5 class="item-name">Тариф</h5>
            <span class="dots"></span>
            <h5 class="item-value">На сутки</h5>
        </div>
        <div 
            v-if="pageIndx >= 2" 
            class="add-options with-dots"
        >
            <h5 class="item-name">Полный бак</h5>
            <span class="dots"></span>
            <h5 class="item-value model">Да</h5>
        </div>

        <div class="price-block">
            <p>Цена:</p>
            <h4>от 8000 до 12000 ₽</h4>
        </div>
        <button 
            @click="displayNextPage" 
            class="active-button"
        >{{ buttonNames[pageIndx] }}</button>
    </div>
</template>

<script>

export default {
    name: 'OrderCalc',
    components: {
    },

    props: {
        pageIndx: Number
    },

    data() {
        return {
            buttonNames: [
                'Выбрать модель',
                'Дополнительно',
                'Итого',
                'Заказать'
            ]
        }
    },
    
    methods: {
        displayNextPage() {
            if(this.pageIndx < 3) {
                this.$emit('nextPage', { index: this.pageIndx + 1 });
            }
        }
    },
}
</script>