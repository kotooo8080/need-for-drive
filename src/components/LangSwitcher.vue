<template>
    <div class="lang">
        <button class="lang-button" v-on:click="switchLang()">
            <h4 class="green">{{ lang }}</h4>
        </button>
    </div>
</template>

<script>
export default {
    name: 'LangSwitcher',

    data() {
        return {
            lang: "Eng",
            val: false,
        }
    },

    methods: {
        switchLang() {
            if(!this.val) {
                this.lang = "Рус";
            } else {
                this.lang = "Eng";
            }
            this.val = !this.val;
        },
    }

}
</script>