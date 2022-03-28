<template>
    <div class="tabs-block">
        <div class="tabs">
            <ul>
                <span 
                    v-for="(tab, indx) in tabs" 
                    :key=tab.id
                    class="tab" 
                    :class="{ activeTab: ( selectedTab == tab.name || selectedTab == indx ), topLine: indx < 2 }"
                    @click="selectTab(indx)"
                >{{ tab.name }}
                    <img 
                        v-if="indx < tabs.length - 1" 
                        src="../assets/img/tab_arrow.svg" 
                        alt=""
                    >
                </span>
            </ul> 
        </div>
    </div>
</template>

<script>

export default {
    name: 'TabsBlock',

    props: {
        pageIndx: Number
    },

    data() {
        return {
            tabs: [
                { id: 'tab-location', name: 'Местоположение' },
                { id: 'tab-model', name: 'Модель' },
                { id: 'tab-add', name: 'Дополнительно' },
                { id: 'tab-total', name: 'Итого' }
            ],
            selectedTab: 0,
        }
    },

    watch: {
        pageIndx: function() {
            this.selectedTab = this.pageIndx;
        }
    },

    created() {
        this.selectedTab = this.pageIndx;
    },
    
    methods: {
        selectTab(indx) {
            this.selectedTab = this.pageIndx;
            this.$emit('selectedTabIndx', { index: indx });
        }
    }, 
}
</script>