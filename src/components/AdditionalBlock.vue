<template>
    <div class="additional-block">
        <div class="color">
            <p>Цвет</p>
            <div class="colors">
                <div
                    v-for="color in colors" 
                    :key="color.name"
                    @change="saveAdditionalData('color', color.rusName, color.name)"
                >
                    <input 
                        :id=color.name
                        v-model="activeColor"
                        type="radio"
                        name="radio1" 
                        :value=color.name
                    >
                    <label 
                        :for=color.name
                        :class="{ 'active-label': activeColor === color.name }" 
                    >{{ color.rusName }}</label>
                </div>
            </div>
        </div>
        <div class="date">
            <p>Дата аренды</p>
            <div class="start">
                <h3>С</h3>
                <div class="input-block">
                    <input 
                        v-model="startDateTime"
                        :class="{ 'not-valid': startNotValid }" 
                        @focusout="validateDateAndTime(startDateTime, true)"
                    >
                    <button 
                        class="close" 
                        @click="startDateTime = ''"
                    ></button>
                </div>
            </div>
            <div class="end">
                <h3>По</h3>
                <div class="input-block">
                    <input 
                        v-model="endDateTime"
                        :class="{ 'not-valid': endNotValid }" 
                        @focus="endDateTime = ''" 
                        @focusout="validateDateAndTime(endDateTime, false)"
                    >
                    <button 
                        class="close" 
                        @click="endDateTime = ''"
                    ></button>
                </div>
            </div>
        </div>
        <div class="tariff">
            <p>Тариф</p>
            <div
                v-for="tariff in tariffs" 
                :key="tariff.name"
            >
                <input 
                    :id=tariff.name
                    v-model="activeTariff"
                    type="radio"  
                    name="radio" 
                    :value=tariff.name 
                    @change="saveAdditionalData('tariff', tariff.description, tariff.name, tariff.id)" 
                >
                <label 
                    :for=tariff.name
                    :class="{ 'active-label': activeTariff === tariff.name }" 
                >{{ tariff.description }}, {{ tariff.tarPrice }}₽/{{ tariff.timeValue }}</label>
            </div>
        </div>
        <div class="add-services">
            <p>Доп услуги</p>
            <div 
                v-for="service in services" 
                :key="service.name"
                class="option"
            >
                <div class="input-block">
                    <input 
                        :id=service.name 
                        v-model="checkedServices" 
                        type="checkbox" 
                        name="checkbox" 
                        :value=service.name
                        @change="saveAdditionalData('service', service.description, service.name)" 
                    >
                    <img 
                        v-if="serviceCheck(service.name)" 
                        src="../assets/img/checked.svg" 
                        alt=""
                    >
                </div>
                <label 
                    :for=service.name
                    :class="{ 'active-label': serviceCheck(service.name)}" 
                >{{ service.description }}{{ service.servPrice }}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdditionalBlock',

    props: {
        newColors: Array
    },

    data() {
        return {
            startDateTime: 'Введите дату и время',
            endDateTime: 'Введите дату и время',
            activeColor: sessionStorage.getItem('active-color') || 'col0',
            activeTariff: sessionStorage.getItem('active-tariff')|| 'tar0',
            checkedServices: [],
            dateFilled: false,
            startNotValid: false,
            endNotValid: true,
            allDataValid: false,
            rates: [],
            calculatedPrice: 0,

            colors: [
                { name: 'col0', rusName: 'Любой' },
                { name: 'col1', rusName: 'Красный' },
                { name: 'col2', rusName: 'Голубой' }
            ],

            tariffs: [
                { id: 'tar0', name: 'tar0', description: 'Поминутно', tarPrice: '7', timeValue: 'мин' },
                { id: 'tar1', name: 'tar1', description: 'На сутки', tarPrice: '1999', timeValue: 'сутки' }
            ],

            services: [
                { name: 'ch1', description: 'Полный бак', servPrice: ', 500₽' },
                { name: 'ch2', description: 'Детское кресло', servPrice: ', 200₽' },
                { name: 'ch3', description: 'Правый руль', servPrice: ', 1600₽' }
            ]
        }
    },

    watch: {
        startDateTime: function() {
            this.validateDateAndTime(this.startDateTime, true);
        },

        endDateTime: function() {
            this.validateDateAndTime(this.endDateTime, false);
        },

        newColors: function() {
            if(this.newColors && this.newColors.length) {
                this.colors = [];
                this.newColors.forEach((el, indx) => {
                    this.colors[indx] = { name: 'col' + indx, rusName: el };
                });
            }
        }
    },

    created() {
        this.getRate();

        let date = new Date();
        let dayMonthYear = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();

        if(minutes.length === 1) {
            minutes = '0' + minutes;
        }
        if(hours.length === 1) {
            hours = '0' + hours;
        }
        this.startDateTime = dayMonthYear + ' ' + hours + ':' + minutes;

        let savedEndDate = sessionStorage.getItem('end-date');
        if(savedEndDate) this.endDateTime = savedEndDate;
        let chServ = sessionStorage.getItem('checked-services');
        if(chServ) {
            this.checkedServices = chServ.split(',');
        }

        let colors = sessionStorage.getItem('car-colors').split(',');
        colors.forEach((el, indx) => {
            this.colors[indx] = { name: 'col' + indx, rusName: el };
        });
    },

    methods: {
        getRate() {
            this.axios.get('https://api-factory.simbirsoft1.com/api/db/rate', {
                headers: {
                    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b'
                }
            }).then((response) => {
                let receivedRates = response.data.data;
                if(receivedRates) {
                    this.tariffs = [];
                    receivedRates.forEach((el, indx) => {
                        if(receivedRates[indx].rateTypeId) {
                            this.tariffs[indx] = { id: receivedRates[indx].id, name: 'tar' + indx, description: receivedRates[indx].rateTypeId.name, tarPrice: receivedRates[indx].price, timeValue: receivedRates[indx].rateTypeId.unit };
                        }
                    });
                }
                this.calculateFinalPrice();
            });
        },

        calculateFinalPrice() {
            let durationStr = sessionStorage.getItem('duration');
            if(durationStr) {
                let days = parseInt(durationStr.split('д')[0]),
                    hours = parseInt(durationStr.split('д')[1]),
                    durationInHours = days*24 + hours,
                    tariff = (this.tariffs.find(el => el.name == this.activeTariff)) || this.tariffs[0],
                    tariffDescription = tariff.description;

                this.calculatedPrice = 0;
                let price = parseInt(tariff.tarPrice);

                if(tariffDescription.toLowerCase().includes('минут')) {
                    this.calculatedPrice += durationInHours*60*price;
                } else if(tariffDescription.toLowerCase().includes('час')) {
                    this.calculatedPrice += durationInHours*price;
                } else if(tariffDescription.toLowerCase().includes('сут')) {
                    this.calculatedPrice += Math.ceil((durationInHours/24))*price;
                } else if(tariffDescription.toLowerCase().includes('недел')) {
                    this.calculatedPrice += Math.ceil((durationInHours/24/7))*price;
                } else if(tariffDescription.toLowerCase().includes('мес')) {
                    this.calculatedPrice += Math.ceil((durationInHours/24/30))*price;
                } else if(tariffDescription.toLowerCase().includes('год')) {
                    this.calculatedPrice += Math.ceil((durationInHours/24/365))*price;
                }

                let servicesPrice = 0;
                this.checkedServices.forEach(chServ => {
                    servicesPrice += parseInt(this.services.find(serv => serv.name == chServ).servPrice.match(/\d+/))
                });
                this.calculatedPrice += servicesPrice;
                sessionStorage.setItem('car-price', this.calculatedPrice);
                this.$emit('finalPrice', { price: this.calculatedPrice });
            }
        },

        serviceCheck(servName) {
            return (this.checkedServices.indexOf(servName) + 1);
        },

        saveAdditionalData(dataName, dataValue, dataEngVal, dataId) {
            if(dataName === 'color' || dataName === 'tariff') {
                sessionStorage.setItem(`active-${dataName}`, dataEngVal);
                if(dataName === 'tariff') {
                    sessionStorage.setItem(`active-tariff-id`, dataId );
                }
            }
            if(dataName === 'service') {
                let servData = {};
                if(this.checkedServices.length) {
                    for(let i = 0; i < this.checkedServices.length; i++) {
                        servData[this.checkedServices[i]] = (this.services.find((item) => item.name == this.checkedServices[i])).description;
                    }
                    if (Object.keys(servData).length !== 0) {
                        sessionStorage.setItem('services', (Object.values(servData)).join(','));
                        sessionStorage.setItem('checked-services', (Object.keys(servData)).join(','));
                    }
                } else {
                    sessionStorage.setItem('services', '');
                    sessionStorage.setItem('checked-services', '');
                }
                this.$emit('componentData', { services: servData });
            }
            else {
                sessionStorage.setItem(dataName, dataValue);
                this.$emit('componentData', { [dataName]: dataValue });
                this.$emit('componentChanged');
            }
            sessionStorage.setItem('current-tab', 2);
            this.calculateFinalPrice();
        },

        inputNameCheck(startOrEnd, result) {
            if(startOrEnd) {
                this.startNotValid = result;
            } else {
                this.endNotValid = result;
            }
        },

        validateDateAndTime(dateAndTime, startOrEnd) {
            let dateAndTimeArr = dateAndTime.split(' ');
            let date = dateAndTimeArr[0];
            let time = dateAndTimeArr[1];

            if(date && time) {
                let arrD = date.split(".");
                arrD[1] -= 1;
                let d = new Date(arrD[2], arrD[1], arrD[0]);
    
                if(!((d.getFullYear() == arrD[2]) && (d.getMonth() >= arrD[1])) && (d.getFullYear() < arrD[2])) {
                    this.inputNameCheck(startOrEnd, true);
                } else {
                    this.inputNameCheck(startOrEnd, false);
                }
                if(!(/(([2][0-3])|([0-1][0-9])):([0-5][0-9])/.test(time) && time.split(':')[0] < 24 && time.split(':')[1] < 60 )) {
                    this.inputNameCheck(startOrEnd, true);
                }
            } else {
                this.inputNameCheck(startOrEnd, true);
            }
            if(!this.startNotValid && !this.endNotValid) {
                this.calculateDuration();
            }
        },

        dateToValidDate(dateString) {
            let validDate = dateString.split(' ')[0].split('.').reverse().join('-');
            return validDate;
        },

        calculateDuration() {
            let startInpData = this.startDateTime;
            let startDate = this.dateToValidDate(startInpData);

            let endInpData = this.endDateTime;
            let endDate = this.dateToValidDate(endInpData);

            let date1 = new Date(startDate + 'T' + startInpData.split(' ')[1]),
                date2 = new Date(endDate + 'T' + endInpData.split(' ')[1]);

            let diffInMs = (date2 - date1);
            let hours = Math.ceil(diffInMs/1000/60/60);
            let days = Math.round(hours/24);
            let mod = hours%24;

            let duration = days + 'д' + mod + 'ч';
            this.$emit('componentData', { 'duration': duration });
            this.$emit('componentChanged');
            sessionStorage.setItem('duration', duration );
            sessionStorage.setItem('start-date', startInpData);
            sessionStorage.setItem('end-date', endInpData);

            this.calculateFinalPrice();
        }
    },
}
</script>