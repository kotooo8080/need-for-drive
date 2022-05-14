<template>
    <div class="total-block">
        <div class="total-info">
            <h3 v-if="totalCarModel">{{ totalCarModel }}</h3>
            <h4 v-if="totalCarNumber" class="car-number">{{ totalCarNumber }}</h4>
            <h4 v-if="totalCarOption1"><span>Топливо </span>100%</h4>
            <h4 v-if="totalCarOption2"><span>Детское кресло</span></h4>
            <h4 v-if="totalCarOption3"><span>Правый руль</span></h4>
            <h4 v-if="totalStartDate"><span>Доступно с </span>{{ totalStartDate }}</h4>
        </div>
        <img
            v-if="totalCarPhoto" 
            :src="totalCarPhoto" 
            alt=""
        >
    </div>
</template> 

<script>

export default {
    name: 'TotalBlock',

    props: {
        modelChanged: Number
    },

    data() {
        return {
            totalCarPhoto: '',
            totalCarModel: '',
            totalCarNumber: '',
            totalStartDate: '',
            totalCarOption1: false,
            totalCarOption2: false,
            totalCarOption3: false,
            selectedCar: {}
        }
    },

    created() {
        this.getCarById();
    },

    watch: {
        modelChanged: function() {
            this.totalCarPhoto = '';
            this.totalCarModel = '';
            this.totalCarNumber = '';
            this.totalStartDate = '';
            this.selectedCar = {};
            this.getCarById();
        }
    },

    methods: {
        getCarById() {
            let cardId = sessionStorage.getItem('car-id');
            if(cardId) {
                this.axios.get('https://api-factory.simbirsoft1.com/api/db/car/' + cardId, {
                    headers: {
                        'X-Api-Factory-Application-Id': process.env.VUE_APP_APPLICATION_ID
                    }
                }).then((response) => {
                    this.selectedCar = response.data.data;
                    this.fillCarData();
                });
            }
        },

        fillCarData() {
            this.totalCarPhoto = this.selectedCar.thumbnail.path;
            this.totalCarModel = this.selectedCar.name;
            this.totalCarNumber = this.selectedCar.number;
            this.totalStartDate = sessionStorage.getItem('start-date') ? sessionStorage.getItem('start-date') : '';
    
            this.totalCarOption1 = sessionStorage.getItem('checked-services').split(',').indexOf('ch1') + 1 ? true : false;
            this.totalCarOption2 = sessionStorage.getItem('checked-services').split(',').indexOf('ch2') + 1 ? true : false;
            this.totalCarOption3 = sessionStorage.getItem('checked-services').split(',').indexOf('ch3') + 1 ? true : false;
        }
    }
}
</script>