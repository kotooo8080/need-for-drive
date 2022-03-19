<template>
    <div class="confirmation-window">
        <h3>Подтвердить заказ</h3>
        <div class="buttons">
            <button 
                class="ok"
                @click="$router.push('/final')"
            >Подтвердить</button>
            <button 
                class="cancel"
                @click="closeConfirm"
            >Вернуться</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ConfirmationWindow',

    methods: {
        closeConfirm() {
            this.$emit('closeConfirm', false);
        }
    }
}
</script>