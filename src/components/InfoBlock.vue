<template>
    <div class="info" :class="{ infoIfMenuOpen: clicked }">
        <div v-if="screenWidthChecker()" class="info-header">
            <div class="row">
                <h3 class="green">Need for drive</h3>
                <location-choice />
            </div>
        </div>
        <page-header v-else/>
        <div class="hero-block">
            <h1>Каршеринг</h1>
            <h1 class="green">Need for drive</h1>
            <h4>Поминутная аренда авто твоего города</h4>
        </div>
        <button @click="$router.push('/order')">Забронировать</button>
        <page-footer />
    </div>
</template>

<script>
import LocationChoice from '../components/LocationChoice.vue'
import PageHeader from '../components/PageHeader.vue'
import PageFooter from '../components/PageFooter.vue'

export default {
    name: 'InfoBlock',

    components: {
        LocationChoice,
        PageHeader,
        PageFooter
    },

    props: {
        clicked: Boolean,
    },
    
    methods: {
        screenWidthChecker() {
            if(window.screen.width < 767) {
                return true;
            }
        }
    }
}
</script>
