<template>
    <div class="tabs-block">
        <div class="tabs">
            <ul>
                <span class="tab" 
                    v-for="(tab, index) in tabs" 
                    :key="tab"
                    @click="selectedTab = tab"
                    :class="{ activeTab: selectedTab === tab, topLine: index < 2 }"
                >{{ tab }}
                    <img v-if="index < tabs.length - 1" src="../assets/img/tab_arrow.svg" alt="">
                </span>
            </ul> 
        </div>
    </div>
</template>

<script>

export default {
    name: 'TabsBlock',

    data() {
        return {
            tabs: [
                'Местоположение',
                'Модель',
                'Дополнительно',
                'Итого',
            ],
            selectedTab: 'Местоположение'
        }
    },
}
</script>