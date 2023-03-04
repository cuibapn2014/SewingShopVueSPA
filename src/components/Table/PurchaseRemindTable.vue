<template>
    <div class="w-full overflow-x-auto">
        <div class="flex justify-end py-2">
            <form class="flex">
                <input class="
                                    block
                                    w-48
                                    text-sm
                                    dark:border-gray-600 dark:bg-gray-700
                                    focus:border-purple-400
                                    focus:outline-none
                                    focus:shadow-outline-purple
                                    dark:text-gray-300 dark:focus:shadow-outline-gray
                                    rounded-l-md
                                    form-input
                                    " type="text" name="keyword" placeholder="Nhập tìm kiếm.." />
                <button
                    class="flex items-center px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border-0 rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </form>
            <div class="inline-block relative group mx-2">
                <ul class="absolute hidden text-gray-700 pt-1 right-0 top-[50] group-hover:block z-50"
                    style="margin-top: 35px;">
                    <li class=""><a
                            class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-gray-700">Phiếu
                            thu</a></li>
                    <li class=""><a
                            class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-gray-700">Phiếu
                            chi</a></li>
                </ul>
                <button onclick=""
                    class="flex items-center h-full px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border-0 rounded-lg active:bg-purple-700 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                    Tạo mới
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <button onclick=""
                class="flex items-center px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border-0 rounded-lg active:bg-green-700 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple">
                Xuất Excel
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </button>
        </div>
        <BaseTable :field_list="this.fieldList" :data_paginate="dataPaginate" path_current="production">
            <div v-if="is_load"
                class="bg-gray-200 dark:bg-gray-800 dark:bg-opacity-80 bg-opacity-80 w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center ">
                <font-awesome-icon class="animate-spin w-[4rem] h-[4rem] text-indigo-500" icon="fa-solid fa-circle-notch" />
            </div>
            <tr v-for="(item, idx) in renderData.data?.data" :key="item.id"
                class="text-gray-700 dark:text-gray-400 hover:bg-indigo-300 hover:bg-opacity-5 duration-150">
                <td class="px-4 py-3 text-sm">
                    {{ index + idx }}
                </td>
                <td class="px-1 py-3 text-sm">
                    {{ item.production_request.code }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ item.ingredient.Ten }}
                </td>
                <td class="px-1 py-3 text-sm">
                    {{ item.ingredient.ingredient_type.name }}
                </td>
                <td class="px-4 py-3 text-sm text-center">
                    {{ item.ingredient.provider.name }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ item.amount + ' (' + item.ingredient.unit_cal.name + ')' }}
                </td>
                <td class="px-4 py-3 text-xs">
                    <span :class="{
                        'px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700': (item.status > 4),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-orange-100 text-orange-700 dark:bg-orange-600': (item.status == 1),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-indigo-100 text-indigo-700 dark:bg-indigo-600': (item.status == 2),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-green-100 text-green-700 dark:bg-green-600': (item.status == 3),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600': (item.status == 4),
                    }">
                        {{ getStatus(item.status) }}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ new Date(item.created_at).toLocaleDateString('vi') }}
                </td>
                <td class="px-4 py-3 text-sm flex items-center">
                    <button v-if="item.status < 2" v-tooltip="'Đã xử lý'" title="Đã xử lý"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Done">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                    <button v-if="item.status < 2" v-tooltip="'Không xử lý'" title="Không xử lý"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Cancel">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                    <button v-if="item.status == 2" v-tooltip="'Đã nhập kho'" title="Đã nhập kho"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Import">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                    </button>
                    <div v-else-if="item.status > 2" class="px-2 py-2">&nbsp;</div>
                </td>
            </tr>
            <tr>
                <td colspan="9" v-if="renderData.data?.data.length <= 0"
                    class="text-sm text-center py-4 text-gray-800 dark:text-gray-200">Không tìm thấy dữ liệu nào</td>
            </tr>
        </BaseTable>
    </div>
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
                'Đề nghị sản xuất',
                'Nguyên vật liệu',
                'Loại',
                'Nhà cung cấp',
                'Số lượng',
                'Trạng thái',
                'Ngày tạo'
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
                case 1: return "Chờ xử lý";
                case 2: return "Đã xử lý";
                case 3: return "Đã nhập kho";
                case 4: return "Đã hủy bỏ";
            }
            return "Không xác định";
        }
    }
}
</script>
<style scope></style>