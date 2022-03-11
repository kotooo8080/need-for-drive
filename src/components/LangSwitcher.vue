<template>
    <div class="lang">
        <button 
            class="lang-button" 
            @click="switchLang()"
        >
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
            switcherOn: false,
        }
    },

    methods: {
        switchLang() {
            if(!this.switcherOn) {
                this.lang = "Рус";
            } else {
                this.lang = "Eng";
            }
            this.switcherOn = !this.switcherOn;
        },
    }
}
</script>