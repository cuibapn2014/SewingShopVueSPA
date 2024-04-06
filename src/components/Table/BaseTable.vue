<template>
    <div class="w-full overflow-x-auto rounded-lg shadow-xs mb-4 relative" v-dragscroll>
        <div class="w-full">
            <table class="w-full whitespace-no-wrap min-h-[100px]">
                <thead>
                    <tr
                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 sticky top-0 z-10">
                        <th class="px-4 py-3 font-bold">#</th>
                        <th v-for="(row, index) in field_list" :key="index" class="px-4 py-3">{{ row }}</th>
                        <th class="px-4 py-3">Hành động</th>
                    </tr>
                </thead>
                <tbody class="bg-[#ffffff] divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <slot></slot>
                </tbody> 
            </table>
        </div>
        <Pagination v-if="data_paginate?.next_page_url || data_paginate?.prev_page_url" :data_paginate="dataList" :path_current="this.path_current"/>
    </div>
</template>
<script>
import Pagination from '../Pagination.vue';
export default {
    props:{
        field_list: Array,
        data_list: Array,
        data_paginate: Object,
        path_current: String
    },
    computed:{
        rowList(){
            return this.dataList
        },
        dataList(){
            return this.data_paginate
        }
    },
    components:{
        Pagination
    },
    data(){
        return {

        }
    }
}
</script>
<style scoped>

</style>