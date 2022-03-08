<template>
    <div class="additional-block">
        <div class="color">
            <p>Цвет</p>
            <div class="colors">
                <div>
                    <input type="radio" id="any" name="radio1" value="any" v-model="activeColor" checked>
                    <label :class="{ 'active-label': activeColor === 'any' }" for="any">Любой</label>
                </div>
                <div>
                    <input type="radio" id="red" name="radio1" value="red" v-model="activeColor">
                    <label :class="{ 'active-label': activeColor === 'red' }" for="red">Красный</label>
                </div>
                <div>
                    <input type="radio" id="blue" name="radio1" value="blue" v-model="activeColor">
                    <label :class="{ 'active-label': activeColor === 'blue' }" for="blue">Голубой</label>
                </div>
            </div>
        </div>
        <div class="date">
            <p>Дата аренды</p>
            <div class="start">
                <h3>С</h3>
                <div class="input-block">
                    <input type="search" v-model="startValue">
                    <button class="close" @click="startValue = ''"></button>
                </div>
            </div>
            <div class="end">
                <h3>По</h3>
                <div class="input-block">
                    <input type="search" v-model="endValue" @focus="endValue = ''" @focusout="valChecker">
                    <button class="close" @click="endValue = ''"></button>
                </div>
            </div>
        </div>
        <div class="tariff">
            <p>Тариф</p>
            <div>
                <input type="radio" id="tar1" name="radio" value="tar1" v-model="activeTariff" checked>
                <label :class="{ 'active-label': activeTariff === 'tar1' }" for="tar1">Поминутно, 7₽/мин</label>
            </div>
            <div>
                <input type="radio" id="tar2" name="radio" value="tar2" v-model="activeTariff">
                <label :class="{ 'active-label': activeTariff === 'tar2' }" for="tar2">На сутки, 1999₽/сутки</label>
            </div>
        </div>
        <div class="add-services">
            <p>Доп услуги</p>
            <div class="option">
                <div class="input-block">
                    <input type="checkbox" id="ch1" name="checkbox" value="ch1" v-model="checkedServices" checked>
                    <img v-if="checkedServices.indexOf('ch1') + 1" src="../assets/img/checked.svg" alt="">
                </div>
                <label :class="{ 'active-label': checkedServices.indexOf('ch1') + 1 }" for="ch1">Полный бак, 500₽</label>
            </div>
            <div class="option">
                <div class="input-block">
                    <input type="checkbox" id="ch2" name="checkbox" value="ch2" v-model="checkedServices">
                    <img v-if="checkedServices.indexOf('ch2') + 1" src="../assets/img/checked.svg" alt="">
                </div>
                <label :class="{ 'active-label': checkedServices.indexOf('ch2') + 1 }" for="ch2">Детское кресло, 200₽</label>
            </div>
            <div class="option">
                <div class="input-block">
                    <input type="checkbox" id="ch3" name="checkbox" value="ch3" v-model="checkedServices">
                    <img v-if="checkedServices.indexOf('ch3') + 1" src="../assets/img/checked.svg" alt="">
                </div>
                <label :class="{ 'active-label': checkedServices.indexOf('ch3') + 1 }" for="ch3">Правый руль, 1600₽</label>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AdditionalBlock',

    data() {
        return {
            startValue: '12.06.2019 12:00',
            endValue: 'Введите дату и время',
            activeColor: 'any',
            activeTariff: 'tar1',
            checkedServices: []
        }
    },
}
</script>