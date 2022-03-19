<template>
    <div class="page-header">
        <div class="row">
            <h3 class="green">Need for drive</h3>
            <location-choice />
        </div>
    </div>
</template>

<script>
import LocationChoice from '../components/LocationChoice.vue'

export default {
    name: 'PageHeader',
    
    components: {
        LocationChoice,
    }
}
</script>