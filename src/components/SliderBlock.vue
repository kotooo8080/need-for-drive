<template>
    <div class="slider img0" :class="{ sliderIfMenuOpen: clicked }" ref="slider">
        <div class="edge" @click="buttonClick(false)">
            <img class="arrow-left" src="../assets/img/slider/left_arrow.svg" alt="">
        </div>
        <div class="slider-text">
            <h3> {{ expression[iteration] }} </h3>
            <h4> {{ description[iteration] }} </h4>
            <button ref="more_details">Подробнее</button>
            <div class="circles" ref="circles">
                <div class="active-circle"></div>
                <div class=""></div>
                <div class=""></div>
                <div class=""></div>
            </div>
        </div>
        <div class="edge" @click="buttonClick(true)">
            <img class="arrow-right" src="../assets/img/slider/right_arrow.svg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'SliderBlock',

    props: {
        clicked: Boolean,
    },

    data() {
        return {
            images: [
                '../img/slider/slide1.jpg',
                '../img/slider/slide2.png',
                '../img/slider/slide3.png',
                '../img/slider/slide4.png'
            ],

            buttonColors: [
                'linear-gradient(90deg, #13493F 0%, #0C7B1B 100%)',
                'linear-gradient(90deg, #132949 0%, #0C7B67 100%)',
                'linear-gradient(90deg, #493013 0%, #7B0C3B 100%)',
                'linear-gradient(90deg, #281349 0%, #720C7B 100%)'
            ],

            expression: [
                'Бесплатная парковка',
                'Страховка',
                'Бензин',
                'Обслуживание'
            ],

            description: [
                'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
                'Полная страховка страховка автомобиля',
                'Полный бак на любой заправке города за наш счёт',
                'Автомобиль проходит еженедельное ТО'
            ],

            iteration: 0,
            times: 0,
            sliderInterval: null,
        }
    },

    methods: {
        changeClasses(indx) {
            this.$refs.slider.className = `slider img${indx} ${this.clicked ? 'sliderIfMenuOpen' : ''}`;
            this.$refs.more_details.style.background = this.buttonColors[indx];
            this.$refs.circles.children[indx].classList.add("active-circle");
        },

        flipSlideRight() {
            if(this.times > 1 && this.iteration === 4) {
                this.$refs.circles.children[this.images.length - 1].classList.remove("active-circle");
            }
            else {
                this.$refs.circles.children[this.iteration].classList.remove("active-circle");
            }
            
            if(this.iteration < 3) {
                this.iteration++;
            }
            else {
                this.iteration = 0;
            }

            this.changeClasses(this.iteration);
        },

        flipSlideLeft() {
            if(this.times > 1 && this.iteration === 0) {
                this.$refs.circles.children[0].classList.remove("active-circle");
            }
            else {
                this.$refs.circles.children[this.iteration].classList.remove("active-circle");
            }

            if(this.iteration > 0) {
                this.iteration--;
            }
            else {
                this.iteration = 3;
            }

            this.changeClasses(this.iteration);
        },

        buttonClick(leftOrRight) {
            if (leftOrRight) {
                this.flipSlideRight();
            } else {
                this.flipSlideLeft();
            }
        },

        flippingSlider() {
            this.iteration = 0;

            const flipper = (function() {
                this.times++;
                this.flipSlideRight();
            }).bind(this)

            this.sliderInterval = setInterval(flipper, 5000);
        }
    },

    mounted() {
        this.flippingSlider();
    }
}
</script>