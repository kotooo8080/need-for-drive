<template>
    <div class="product-card">
        <div class="card-text">
            <h3>{{ model }}</h3>
            <h4>{{ price }}</h4>
        </div>
        <img :src="require(`../assets/img/cars/${photo}`)" alt="">
    </div>
</template>

<script>

export default {
    name: 'ProductCard',

    props: {
        model: String,
        price: String,
        photo: String,
    },
}
</script>