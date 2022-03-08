<template>
    <div class="tabs-block">
        <div class="tabs">
            <ul>
                <span class="tab" 
                    v-for="(tab, index) in tabs" 
                    :key="tab"
                    @click="selectTab(index)"
                    :class="{ activeTab: ( selectedTab == tab || selectedTab == index ), topLine: index < 2 }"
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
            selectedTab: 'Местоположение',
        }
    },

    props: {
        pageIndx: Number
    },
    
    methods: {
        selectTab(indx) {
            this.selectedTab = this.tabs[indx];
            this.$emit('selectedTabIndx', { index: indx });
        }
    }, 

    watch: {
        pageIndx: function() {
            this.selectedTab = this.pageIndx;
        }
    }
}
</script>