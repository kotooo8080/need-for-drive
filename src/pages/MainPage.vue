<template>
    <div class="main-page">
        <menu-block @menu-click="menuOpen"/>
        <div class="page-info" :class="{ pageInfoIfMenuOpen: clicked }">
            <info-block :clicked="clicked" />
            <slider-block :clicked="clicked" />
        </div>
        <router-view />
    </div>
</template>

<script>
import MenuBlock from '../components/MenuBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import SliderBlock from '../components/SliderBlock.vue'

export default {
    name: 'MainPage',
    components: {
        MenuBlock,
        InfoBlock,
        SliderBlock,
    },

    data() {
        return {
            clicked: false
        }
    },

    methods: {
        menuOpen(value) {
            this.clicked = value;
        }
    }
}
</script>