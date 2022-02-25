<template>
    <div class="info" :class="{ infoIfMenuOpen: clicked }">
        <div class="info-header">
            <div class="row">
                <h3 class="green">Need for drive</h3>
                <location-choice />
            </div>
        </div>
        <div class="hero-block">
            <h1>Каршеринг</h1>
            <h1 class="green">Need for drive</h1>
            <h4>Поминутная аренда авто твоего города</h4>
        </div>
        <button>Забронировать</button>
        <page-footer />
    </div>
</template>

<script>
import LocationChoice from '../components/LocationChoice.vue'
import PageFooter from '../components/PageFooter.vue'

export default {
    name: 'InfoBlock',

    components: {
        LocationChoice,
        PageFooter
    },

    props: {
        clicked: Boolean,
    }
}
</script>
