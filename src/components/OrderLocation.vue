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
            pointName: ""
        }
    },

    watch: {
        locationName: function() {
            this.saveOrderData('city', this.locationName);
        },

        pointName: function() {
            this.saveOrderData('point', this.pointName);
        }
    },

    created() {
        let city = sessionStorage.getItem('city');
        let point = sessionStorage.getItem('point');
        
        if(city) this.locationName = city;
        if(point) this.pointName = point;
    },

    methods: {
        saveOrderData(dataName, dataValue) {
            sessionStorage.setItem(dataName, dataValue);
            this.$emit('componentData', { [dataName]: dataValue });

            if(this.locationName && this.pointName) {
                sessionStorage.setItem('current-tab', 0);
                this.$emit('componentChanged');
            }
        }
    },
}
</script>