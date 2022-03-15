<template>
    <div class="order-location">
        <div class="city">
            <p>Город</p>
            <div class="location-input">
                <input 
                    v-model="locationName"
                >
                <button 
                    class="close" 
                    @click="locationName = ''"
                ></button>
            </div>
        </div>
        <div class="point-of-issue">
            <p>Пункт выдачи</p>
            <input 
                v-model="pointName" 
                type="text" 
                @focus="pointName = ''" 
                @focusout="poinOfIssueValChecker"
            >
        </div>
        <p class="map">Выбрать на карте:</p>
        <iframe class="map-iframe" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae20e0670f1205c3160e4aa6d276e6a89b7ba0ff7abb0bd6c9b580dcdde006c3f&amp;source=constructor" width="736" height="352" frameborder="0"></iframe>
    </div>
</template>

<script>

export default {
    name: 'OrderLocation',

    data() {
        return {
            locationName: "Ульяновск",
            pointName: "Начните вводить пункт ..."
        }
    },

    methods: {
        poinOfIssueValChecker() {
            if(this.pointName == '') {
                this.pointName = "Начните вводить пункт ...";
            }
        },
    }
}
</script>