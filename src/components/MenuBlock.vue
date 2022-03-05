<template>
    <div class="menu" :class="{ 'open-menu': toggleValue }">
        <div class="lines" :class="{ open: toggleValue }" @click="toggleVisibilityLangSwitcher()">
            <div class="first_line"></div>
            <div class="mid"></div>
            <div class="third_line"></div>
        </div>
        <div class="menu-items" @click="toggleVisibilityLangSwitcher()">
            <router-link
                v-for="(item, indx) in items" :key="`menu-item-${indx}`" 
                tag="a"
                :to="item.linkText"
            >
                {{ item.itemText }}
            </router-link>
        </div>
        <div class="social-icons">
            <svg><use xlink:href="../assets/img/social/sprite.svg#telegram"></use></svg>
            <svg><use xlink:href="../assets/img/social/sprite.svg#facebook"></use></svg>
            <svg><use xlink:href="../assets/img/social/sprite.svg#instagram" width="32" height="32"></use></svg>
        </div>
        <lang-switcher v-if="!toggleValue"/>
    </div>
</template>

<script>
import LangSwitcher from './LangSwitcher.vue';

export default {
    name: 'MenuBlock',

    components: {
        LangSwitcher
    },

    data() {
        return {
            toggleValue: false,
            
            items: [
                { linkText: '/', itemText: 'Парковка' },
                { linkText: '/', itemText: 'Страховка' },
                { linkText: '/', itemText: 'Бензин' },
                { linkText: '/', itemText: 'Обслуживание' },
            ]
        }
    },

    methods: {
        toggleVisibilityLangSwitcher() {
            this.toggleValue = !this.toggleValue;
            this.$emit('menu-click', this.toggleValue);
        },
    }
}
</script>
