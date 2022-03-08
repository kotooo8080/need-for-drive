<template>
    <div class="car-model">
        <div class="options">
            <div>
                <input type="radio" id="all" name="radio" value="all" v-model="activeModels" checked>
                <label :class="{ 'active-label': activeModels === 'all' }" for="all">Все модели</label>
            </div>
            <div>
                <input type="radio" id="cheap" name="radio" value="cheap" v-model="activeModels">
                <label :class="{ 'active-label': activeModels === 'cheap' }" for="cheap">Эконом</label>
            </div>
            <div>
                <input type="radio" id="premium" name="radio" value="premium" v-model="activeModels">
                <label :class="{ 'active-label': activeModels === 'premium' }" for="premium">Премиум</label>
            </div>
        </div>
        <div class="products">
            <product-card
                v-for="(card, indx) in cards" :key="`card-item-${indx}`" 
                tag="a"
                @buyButtonClick = "buy(indx)"

                :model="card.model"
                :price="card.price"
                :photo="card.photo"
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
                { model: 'ELANTRA', price: '12 000 - 25 000 ₽', photo: 'img1.jpg' },
                { model: 'i30 N', price: '10 000 - 32 000 ₽', photo: 'img2.jpg' },
                { model: 'CRETA', price: '12 000 - 25 000 ₽', photo: 'img3.jpg' },
                { model: 'SONATA', price: '10 000 - 32 000 ₽', photo: 'img4.jpg' },
                { model: 'ELANTRA', price: '12 000 - 25 000 ₽', photo: 'img1.jpg' },
                { model: 'i30 N', price: '10 000 - 32 000 ₽', photo: 'img2.jpg' },
            ],
            activeModels: 'all'
        }
    },
}
</script>