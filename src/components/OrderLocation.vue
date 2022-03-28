<template>
    <div class="order-location">
        <div class="city">
            <p>Город</p>
            <div class="location-input">
                <input 
                    v-model="locationName"
                    @focusout="searchCity"
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
        <order-map 
            :listOfPoints="listOfPoints"
            :cityFind="cityFind"
            :locationName="locationName"
        />
        <!-- <iframe class="map-iframe" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae20e0670f1205c3160e4aa6d276e6a89b7ba0ff7abb0bd6c9b580dcdde006c3f&amp;source=constructor" width="736" height="352" frameborder="0"></iframe> -->
    </div>
</template>
<script>
import OrderMap from './OrderMap.vue';
export default {
    name: 'OrderLocation',

    components: { 
        OrderMap 
    },

    data() {
        return {
            locationName: "Ульяновск",
            pointName: "",
            listOfCities: [],
            cityFind: 0,
            listOfPoints: []
        }
    },

    watch: {
        pointName: function() {
            this.saveOrderData('point', this.pointName);
        }
    },

    created() {
        let city = sessionStorage.getItem('city');
        let point = sessionStorage.getItem('point');
        
        if(city) this.locationName = city;
        if(point) this.pointName = point;

        this.getCities();
        this.getPoints();
    },

    methods: {
        getCities() {
            this.axios.get('https://api-factory.simbirsoft1.com/api/db/city', {
                headers: {
                    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b'
                }
            }).then((response) => {
                this.listOfCities = response.data.data;
            });
        },

        getPoints() {
            this.axios.get('https://api-factory.simbirsoft1.com/api/db/point', {
                headers: {
                    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b'
                }
            }).then((response) => {
                this.listOfPoints = response.data.data;
            });
        },

        searchCity() {
            this.listOfCities.forEach(el => {
                if(el.name == this.locationName) {
                    this.cityFind++;
                    if(this.listOfPoints.length){
                        let selectedPoint = this.listOfPoints.find(item => item.cityId.name == this.locationName);
                        this.pointName = selectedPoint.address;
                        sessionStorage.setItem('point-id', selectedPoint.id);
                        sessionStorage.setItem('city-id', selectedPoint.cityId.id);
                    }
                }
            });
            if(!this.cityFind) {
                this.pointName = '';
                this.saveOrderData('point', this.pointName);
            }
            this.saveOrderData('city', this.locationName);
        },

        saveOrderData(dataName, dataValue) {
            sessionStorage.setItem(dataName, dataValue);
            this.$emit('componentData', { [dataName]: dataValue });

            if(this.locationName && this.pointName) {
                sessionStorage.setItem('current-tab', 0);
                this.$emit('componentChanged');
            }
        },
    },
}
</script>