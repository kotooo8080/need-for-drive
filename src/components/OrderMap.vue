<template>
    <div id="order-map">
        <yandex-map
            id="my-map"
            :settings="map.settings"
            :coords="map.coords"
            :zoom="map.zoom"
            :controls="map.controls"
            class="map"
        >
            <ymap-marker
                v-for="entity in entities"
                :key="entity.id"
                :marker-id="entity.id" 
                :cityId="entity.cityId"
                :coords="entity.location"
                class="place-mark"
                @click="markerClick(entity)"
            />
        </yandex-map>
    </div>
</template>

<script>
import { yandexMap, ymapMarker, loadYmap } from 'vue-yandex-maps'

export default {
    name: "OrderMap",

    components: { 
        yandexMap,  
        ymapMarker
    },

    props: {
        listOfPoints: Array,
        cityFind: Number,
        locationName: String
    },

    data() {
        return {
            map: {
                settings: {
                    apiKey: process.env.VUE_APP_MAP_API_KEY,
                    lang: 'ru_RU',
                    coordorder: 'latlong',
                    version: '2.1'
                },
                coords: [54.3282, 48.3866],
                controls: ['rulerControl', 'zoomControl'],
                zoom: 11,
            },

            placeCoords: '',
            placeCoordsValue: [],
            entities: [],
        }
    },
    methods: {
        async getCoords(place) {
            let promise = this.axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this.map.settings.apiKey}&geocode=${place}`)
            .then((res) => {
                this.placeCoords = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
                this.placeCoordsValue = [ this.placeCoords.split(' ')[1], this.placeCoords.split(' ')[0] ];
            });
            return await promise;
        },

        markerClick(marker) {
            sessionStorage.setItem('point-id', marker.id);
            sessionStorage.setItem('city-id', marker.cityId);
        }
    },

    watch: {
        listOfPoints: function() {
            this.listOfPoints.forEach(el => {
                if(el.cityId && el.cityId.name && el.address) {
                    this.getCoords(el.cityId.name + ',' + el.address).then(() => {
                        let arr = this.placeCoordsValue;
                        this.entities.push({
                            id: el.id,
                            cityId: el.cityId.id,
                            name: el.cityId.name,
                            location: arr
                        });
                    });
                }
            });
        },

        cityFind: function() {
            if(this.cityFind) {
                this.getCoords(this.locationName).then(() => {
                    this.map.coords = this.placeCoordsValue;
                })
            }
        }
    },

    async mounted() {
        this.markers = []
        this.entities.forEach(item => {
            this.markers.push({ id: item.id, coords: item.location });
        });

        let settings = this.markers;
        await loadYmap(settings);
    }
};
</script>
