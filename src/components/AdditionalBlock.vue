<template>
    <div class="additional-block">
        <div class="color">
            <p>Цвет</p>
            <div class="colors">
                <div
                    v-for="color in colors" 
                    :key="color.name"
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
                        type="search" 
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
                        type="search"  
                        @focus="endDateTime = ''" 
                        @focusout="valChecker"
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
                >
                <label 
                    :for=tariff.name
                    :class="{ 'active-label': activeTariff === tariff.name }" 
                >{{ tariff.description }}</label>
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
                >{{ service.description }}</label>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AdditionalBlock',

    data() {
        return {
            startDateTime: '12.06.2019 12:00',
            endDateTime: 'Введите дату и время',
            activeColor: 'any',
            activeTariff: 'tar1',
            checkedServices: [],

            colors: [
                { name: 'any', rusName: 'Любой' },
                { name: 'red', rusName: 'Красный' },
                { name: 'blue', rusName: 'Голубой' }
            ],

            tariffs: [
                { name: 'tar1', description: 'Поминутно, 7₽/мин' },
                { name: 'tar2', description: 'На сутки, 1999₽/сутки' }
            ],

            services: [
                { name: 'ch1', description: 'Полный бак, 500₽' },
                { name: 'ch2', description: 'Детское кресло, 200₽' },
                { name: 'ch3', description: 'Правый руль, 1600₽' }
            ]
        }
    },

    methods: {
        serviceCheck(servName) {
            return (this.checkedServices.indexOf(servName) + 1);
        }
    }
}
</script>