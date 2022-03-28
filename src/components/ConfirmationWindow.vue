<template>
    <div class="confirmation-window">
        <h3>Подтвердить заказ</h3>
        <div class="buttons">
            <button 
                class="ok"
                @click="sendOrderData"
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

    data() {
        return {
            listOfStatuses: [],
            fullTank: false,
            childChair: false,
            rightWheel: false
        }
    },

    created() {
        this.getStatuses();
        let servArr = sessionStorage.getItem('checked-services').split(',');
        this.fullTank = (servArr.find((el) => el == 'ch1') + 1) ? true : false;
        this.childChair = (servArr.find((el) => el == 'ch2') + 1) ? true : false;
        this.rightWheel = (servArr.find((el) => el == 'ch3') + 1) ? true : false;
    },

    methods: {
        closeConfirm() {
            this.$emit('closeConfirm', false);
        },

        getStatuses() {
            this.axios.get('https://api-factory.simbirsoft1.com/api/db/orderStatus', {
                headers: {
                    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b'
                }
            }).then((response) => {
                this.listOfStatuses = response.data.data;
            });
        },

        parseDate(dateStr) {
            let date = dateStr.split(' ')[0];
            let time = dateStr.split(' ')[1];
            let result = date.split('.')[2] + '-' + date.split('.')[1] + '-' + date.split('.')[0] + 'T' + time;
            return (new Date(result).getTime());
        },

        sendOrderData() {
            this.axios({
                method: 'post',
                url: 'https://api-factory.simbirsoft1.com/api/db/order',
                headers: {
                    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: {
                    "orderStatusId": `${this.listOfStatuses[0].id}`,
                    "cityId": `${sessionStorage.getItem('city-id')}`,
                    "pointId": `${sessionStorage.getItem('point-id')}`,
                    "carId": `${sessionStorage.getItem('car-id')}`,
                    "color": `${sessionStorage.getItem('color')}`,
                    "dateFrom": `${this.parseDate(sessionStorage.getItem('start-date'))}`,
                    "dateTo": `${this.parseDate(sessionStorage.getItem('end-date'))}`,
                    "rateId": `${sessionStorage.getItem('active-tariff-id')}`,
                    "price": `${parseInt(sessionStorage.getItem('car-price'))}`,
                    "isFullTank": `${this.fullTank}`,
                    "isNeedChildChair": `${this.childChair}`,
                    "isRightWheel": `${this.rightWheel}`
                } 
            }).then((response) => {
                sessionStorage.setItem('order-id', response.data.data.id);
                this.$router.push('/final?id=' + response.data.data.id);
            });
        },

        confirmOrder() {
            this.sendOrderData();
        }
    }
}
</script>