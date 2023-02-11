<template>
    <BaseTable :field_list="this.fieldList" :data_paginate="dataPaginate" :path_current="'user'">
        <div v-if="is_load"
            class="bg-gray-200 dark:bg-gray-800 dark:bg-opacity-80 bg-opacity-80 w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center ">
            <font-awesome-icon class="animate-spin w-[4rem] h-[4rem] text-indigo-500" icon="fa-solid fa-circle-notch" />
        </div>
        <tr v-for="(item, idx) in renderData.data?.data" :key="item.id"
            class="text-gray-700 dark:text-gray-400 hover:bg-indigo-300 hover:bg-opacity-5 duration-150">
            <td class="px-4 py-3 text-sm">
                {{ index + idx }}
            </td>
            <td class="px-4 py-3 text-sm">
                <img v-tooltip.top-start="item.name" :src="`${this.url}/img/user/${item.image}`"
                    class="h-12 w-12 object-cover object-center rounded-full" />
            </td>
            <td class="px-4 py-3 text-sm ">
                {{ item.name }}
            </td>
            <td class="px-4 py-3 text-sm">
                {{ item.phone ?? 'Chưa có' }}
            </td>
            <td class="px-4 py-3 text-sm">
                {{ item.email ?? 'Chưa có' }}
            </td>
            <td class="px-4 py-3 text-sm">
                {{ item.role.department?.name ?? '' }}
            </td>
            <td class="px-4 py-3 text-sm">
                {{ item.role.name }}
            </td>
            <td class="px-4 py-3 text-sm">
                <span :class="{
                    'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-orange-100 text-orange-700 dark:bg-orange-600': (item.status == 2),
                    'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-green-100 text-green-700 dark:bg-green-600': (item.status == 1),
                    'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600': (item.status == 3),
                }">
                    {{ getStatus(item.status) }}
                </span>
            </td>
            <td class="px-4 py-3 text-sm">
                {{ new Date(item.created_at).toLocaleDateString() }}
            </td>
            <td class="px-4 py-3 text-sm">
                <button title="Chỉnh sửa"
                    class="flex items-center float-left justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Edit">
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                        </path>
                    </svg>
                </button>
                <button title="Xóa"
                    class="flex items-center float-left justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete">
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </td>
        </tr>
        <tr>
            <td colspan="9" v-if="renderData.data?.data.length <= 0"
                class="text-sm text-center py-4 text-gray-800 dark:text-gray-200">Không tìm thấy dữ liệu nào</td>
        </tr>
    </BaseTable>
</template>
<script>
import { config } from '../../helpers/config';
import BaseTable from './BaseTable.vue';

export default {
    props: {
        data_list: Array,
        is_load: Boolean
    },
    components: {
        BaseTable
    },
    computed: {
        renderData() {
            let data = this.data_list ?? []
            return data
        },
        dataPaginate() {
            return this.filterObject()
        }
    },
    watch: {
        data_list(a, b) {
            this.index = a.data.from
        }
    },
    data() {
        return {
            fieldList: [
                'Avatar',
                'Tên',
                'Liên hệ',
                'Email',
                'Phòng ban',
                'Chức vụ',
                'Trạng thái',
                'Ngày tham gia'
            ],
            index: this.data_list?.data.from || 1,
            url: config.apiUrl.split('/api')[0]
        }
    },
    methods: {
        filterObject() {
            let obj = this.data_list?.data ?? null
            if (!obj) return
            return Object.fromEntries(Object.entries(obj).filter(([key, val]) => key != 'data'))
        },
        getStatus(status) {
            switch (status) {
                case 1: return "Đang sử dụng";
                case 2: return "Tạm khóa";
                case 3: return "Ngưng sử dụng";
            }
        }
    }
}
</script>
<style scope>

</style>