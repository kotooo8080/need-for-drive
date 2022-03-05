<template>
    <div class="order-calculation">
        <p>Ваш заказ:</p>
        <div class="pickup-point-address">
            <h5 class="item-name">Пункт выдачи</h5>
            <h5 v-if="screenWidthChecker()" class="dots">......................</h5>
            <h5 v-else>.......</h5>
            <h5 class="address">Ульяновск, Нариманова 42</h5>
        </div>
        <div class="price-block">
            <p>Цена:</p>
            <h4>от 8000 до 12000 ₽</h4>
        </div>
        <button>Выбрать модель</button>
    </div>
</template>

<script>

export default {
    name: 'OrderCalc',
    components: {
    },

    data() {
        return {
        }
    },
    
    methods: {
        screenWidthChecker() {
            if(window.screen.width > 1023 || window.screen.width <= 767) {
                return true;
            }
        }
    }
}
</script>