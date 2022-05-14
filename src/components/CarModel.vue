<template>
    <div class="car-model">
        <div class="options">
            <div
                v-for="carClass in classes"
                :key=carClass
            >
                <input 
                    :id=carClass
                    v-model="activeModels"
                    type="radio" 
                    name="radio" 
                    :value=carClass
                    @click="filterCars(carClass)"
                >
                <label  
                    :for=carClass
                    :class="{ 'active-label': activeModels === carClass }" 
                >{{ carClass }}</label>
            </div>
        </div>
        <div class="products">
            <product-card
                v-for="(card, indx) in (filteredCars.length == 0 ? listOfCars : filteredCars) " 
                :key=indx
                tag="a"
                :model="card.name"
                :price="card.priceMin + ' - ' + card.priceMax + '₽'"
                :photo="card.thumbnail.path"
                :class="{ 'active-car': activeCard === indx }"
                @click="choiceCar(indx)"
            />
        </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
    name: 'CarModel',

    components: {
        ProductCard
    },

    data() {
        return {
            activeModels: 'Все',
            activeCard: -1,
            listOfCars: [],
            classes: new Set(),
            filteredCars: []
        }
    },

    created() {
        let index = sessionStorage.getItem('car-index');
        if(index) {
            this.activeCard = Number(index);
        }

        this.getList();
    },

    methods: {
        choiceCar(carIndex) {
            let carsList = this.filteredCars.length == 0 ? this.listOfCars : this.filteredCars;
            this.activeCard = carIndex;

            sessionStorage.setItem('car-model', carsList[carIndex].name);
            sessionStorage.setItem('car-index', carIndex);
            sessionStorage.setItem('car-price', carsList[carIndex].priceMin + ' - ' + carsList[carIndex].priceMax + '₽');
            sessionStorage.setItem('current-tab', 1);
            sessionStorage.setItem('car-colors', carsList[carIndex].colors);
            sessionStorage.setItem('car-id', carsList[carIndex].id)

            this.$emit('componentData', { model: carsList[carIndex].name, price: carsList[carIndex].priceMin + ' - ' + carsList[carIndex].priceMax + '₽' });
            this.$emit('componentChanged', carsList[carIndex].colors);
        },

        fillClassesFromServer() {
            this.classes.add('Все');
            this.listOfCars.forEach(el => {
                this.classes.add(el.categoryId.name);
            });
        },

        filterCars(categoryName) {
            if(categoryName !== 'Все') {
                this.filteredCars = this.listOfCars.filter(el => el.categoryId.name === categoryName);
            } else {
                this.filteredCars = [];
            }

            let carsList = this.filteredCars.length == 0 ? this.listOfCars : this.filteredCars;
            this.activeCard = 0;
            this.$emit('componentData', { model: carsList[0].name, price: carsList[0].priceMin + ' - ' + carsList[0].priceMax + '₽' });
            this.$emit('componentChanged', carsList[0].colors);
        },

        getList() {
            this.axios.get('https://api-factory.simbirsoft1.com/api/db/car', {
                headers: {
                    'X-Api-Factory-Application-Id': process.env.VUE_APP_APPLICATION_ID
                }
            }).then((response) => {
                this.listOfCars = response.data.data;
                this.fillClassesFromServer();
            });
        }
    },
}
</script>