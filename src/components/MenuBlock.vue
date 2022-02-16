<template>
    <div class="menu" :class="{ 'open-menu': toggle_value }">
        <div class="lines" :class="{ open: toggle_value }" @click="openOrClose()">
            <div class="first_line"></div>
            <div class="mid"></div>
            <div class="third_line"></div>
        </div>
        <div class="menu-items" @click="openOrClose()">
            <router-link
                v-for="(item, indx) in items" :key=indx 
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
        <lang-switcher v-if="!toggle_value"/>
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
            toggle_value: false,
            
            items: [
                { linkText: '/car-sharing-project/', itemText: 'Парковка' },
                { linkText: '/car-sharing-project/', itemText: 'Страховка' },
                { linkText: '/car-sharing-project/', itemText: 'Бензин' },
                { linkText: '/car-sharing-project/', itemText: 'Обслуживание' },
            ]
        }
    },

    methods: {
        openOrClose() {
            this.toggle_value = !this.toggle_value;
            this.$emit('menu-click', this.toggle_value);
        },
    }
}
</script>
