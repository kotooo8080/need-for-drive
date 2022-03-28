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
            // cards: [
            //     { id: 'card1', model: 'ELANTRA', price: '12 000 - 25 000 ₽', photo: 'img1.jpg' },
            //     { id: 'card2', model: 'i30 N', price: '10 000 - 32 000 ₽', photo: 'img2.jpg' },
            //     { id: 'card3', model: 'CRETA', price: '12 000 - 25 000 ₽', photo: 'img3.jpg' },
            //     { id: 'card4', model: 'SONATA', price: '10 000 - 32 000 ₽', photo: 'img4.jpg' },
            //     { id: 'card5', model: 'ELANTRA', price: '12 000 - 25 000 ₽', photo: 'img1.jpg' },
            //     { id: 'card6', model: 'i30 N', price: '10 000 - 32 000 ₽', photo: 'img2.jpg' },
            // ],
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
            this.activeCard = carIndex;
            sessionStorage.setItem('car-model', this.listOfCars[carIndex].name);
            sessionStorage.setItem('car-index', carIndex);
            sessionStorage.setItem('car-price', this.listOfCars[carIndex].priceMin + ' - ' + this.listOfCars[carIndex].priceMax + '₽');
            sessionStorage.setItem('current-tab', 1);
            this.$emit('componentData', { model: this.listOfCars[carIndex].name, price: this.listOfCars[carIndex].priceMin + ' - ' + this.listOfCars[carIndex].priceMax + '₽' });
            this.$emit('componentChanged');
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
        },

        getList() {
            this.axios.get('https://api-factory.simbirsoft1.com/api/db/car', {
                headers: {
                    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b'
                }
            }).then((response) => {
                this.listOfCars = response.data.data;
                this.fillClassesFromServer();
            });
        }
    },
}
</script>