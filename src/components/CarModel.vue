<template>
    <div class="car-model">
        <div class="options">
            <div>
                <input 
                    id="all"
                    v-model="activeModels"
                    type="radio"  
                    name="radio" 
                    value="all"  
                    checked>
                <label 
                    for="all"
                    :class="{ 'active-label': activeModels === 'all' }" 
                >Все модели</label>
            </div>
            <div>
                <input 
                    id="cheap"
                    v-model="activeModels"
                    type="radio"  
                    name="radio" 
                    value="cheap" 
                >
                <label 
                    for="cheap"
                    :class="{ 'active-label': activeModels === 'cheap' }" 
                >Эконом</label>
            </div>
            <div>
                <input 
                    id="premium" 
                    v-model="activeModels"
                    type="radio" 
                    name="radio" 
                    value="premium" 
                >
                <label  
                    for="premium"
                    :class="{ 'active-label': activeModels === 'premium' }"
                >Премиум</label>
            </div>
        </div>
        <div class="products">
            <product-card
                v-for="(card, indx) in cards" 
                :key=card.id
                tag="a"
                :model="card.model"
                :price="card.price"
                :photo="card.photo"
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
            cards: [
                { id: 'card1', model: 'ELANTRA', price: '12 000 - 25 000 ₽', photo: 'img1.jpg' },
                { id: 'card2', model: 'i30 N', price: '10 000 - 32 000 ₽', photo: 'img2.jpg' },
                { id: 'card3', model: 'CRETA', price: '12 000 - 25 000 ₽', photo: 'img3.jpg' },
                { id: 'card4', model: 'SONATA', price: '10 000 - 32 000 ₽', photo: 'img4.jpg' },
                { id: 'card5', model: 'ELANTRA', price: '12 000 - 25 000 ₽', photo: 'img1.jpg' },
                { id: 'card6', model: 'i30 N', price: '10 000 - 32 000 ₽', photo: 'img2.jpg' },
            ],
            activeModels: 'all',
            activeCard: -1
        }
    },

    created() {
        let index = sessionStorage.getItem('car-index');
        if(index) {
            this.activeCard = Number(index);
        }
    },

    methods: {
        choiceCar(carIndex) {
            this.activeCard = carIndex;
            sessionStorage.setItem('car-model', 'Hyndai, ' + this.cards[carIndex].model);
            sessionStorage.setItem('car-index', carIndex);
            sessionStorage.setItem('car-price', this.cards[carIndex].price);
            sessionStorage.setItem('current-tab', 1);
            this.$emit('componentData', { model: 'Hyndai, ' + this.cards[carIndex].model, price: this.cards[carIndex].price });
            this.$emit('componentChanged');
        },
    },
}
</script>