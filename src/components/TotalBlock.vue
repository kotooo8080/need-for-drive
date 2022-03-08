<template>
    <div class="total-block">
        <div class="total-info">
            <h3>Hyndai, i30 N</h3>
            <h4 class="car-number">К 761 НА 73</h4>
            <h4><span>Топливо </span>100%</h4>
            <h4><span>Доступно с </span>12.06.2019 12:00</h4>
        </div>
        <img :src="require(`../assets/img/cars/${totalCarPhoto}`)" alt="">
    </div>
</template> 

<script>

export default {
    name: 'TotalBlock',

    data() {
        return {
            totalCarPhoto: 'img1.jpg'
        }
    },
}
</script>