<template>
    <div class="w-full overflow-x-auto">
        <div class="flex justify-end py-2">
            <form class="flex mr-1">
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
            <!-- <div class="inline-block relative group mx-2">
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
            </div> -->
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
            <transition enter-from-class="opacity-0" enter-to-class="opacity-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div
                v-show="is_load"
                class="transition ease-in duration-300 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-80 bg-opacity-80 w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center"
                >
                <font-awesome-icon
                    class="animate-spin w-[4rem] h-[4rem] text-indigo-500"
                    icon="fa-solid fa-circle-notch"
                />
                </div>
            </transition>
            <tr v-for="(item, idx) in renderData.data?.data" :key="item.id"
                class="text-gray-700 dark:text-gray-400 hover:bg-indigo-300 hover:bg-opacity-5 duration-150">
                <td class="px-4 py-3 text-sm">
                    {{ index + idx }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ item.production_request.code }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ item.code }}
                </td>
                <td class="px-4 py-3 text-sm ">
                    {{ item.product.name }}
                </td>
                <td class="px-4 py-3 text-sm ">
                    {{ item.product.ingredient_type.name }}
                </td>
                <td class="px-4 py-3 text-sm ">
                    {{ item.product.stage_product.name }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ item.require_total.toLocaleString('vi') + ' ' + item.product.unit_cal.name }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ item.produceds.length > 0 ? getTotal(item.produceds, 'amount') : 0 }} {{ item.product.unit_cal.name }}
                </td>
                <td class="px-4 py-3 text-sm flex items-center">
                    <span>{{ getStatusPriority(item.priority) }}</span>
                    <svg v-if="item.priority == 0" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                            clip-rule="evenodd" />
                    </svg>
                    <svg v-else-if="item.priority == 1" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                </td>
                <td class="px-4 py-3 text-sm">
                    <span :class="{
                        'px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700': (isCompletedStatus(item) == 1),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-orange-100 text-orange-700 dark:bg-orange-600': (isCompletedStatus(item) == 2),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-green-100 text-green-700 dark:bg-green-600': (isCompletedStatus(item) == 3),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600': (isCompletedStatus(item) == 4),
                    }">
                        {{ getStatus(isCompletedStatus(item)) }}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ this.$moment(item.updated_at).format("DD/MM/YYYY") }}
                </td>
                <td class="px-4 py-3 text-sm flex items-center">
                    <button v-if="isCompletedStatus(item) == 2" title="Cập nhật" v-tooltip="'Cập nhật'"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit">
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                            </path>
                        </svg>
                    </button>
                    <div v-else class="px-2 py-2">&nbsp;</div>
                </td>
            </tr>
            <tr>
                <td colspan="12" v-if="renderData.data?.data.length <= 0"
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
                'Mã sản xuất',
                'Mã lệnh',
                'Sản phẩm',
                'Loại',
                'Công đoạn',
                'Yêu cầu',
                'Hoàn thành',
                'Ưu tiên',
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
                case 2: return "Đang sản xuất";
                case 3: return "Hoàn thành";
                case 4: return "Ngưng sản xuất";
            }
        },
        getStatusPriority(priority) {
            switch (priority) {
                case 0: return "Thấp";
                case 1: return "Bình thường";
                case 2: return "Cao";
            }
        },
        getTotal(arr, property, isNumber = false) {
            const total = arr.reduce((a, b) => { return a + b[property] }, 0)
            if (isNumber)
                return total
            return total.toLocaleString('vi')
        },
        isCompletedStatus(obj) {
            const produceds = obj.produceds.reduce((a, b) => { return a + b.amount }, 0)
            const status = produceds == obj.require_total && obj.production_request.status == 2
                ? 3 : obj.production_request.status;
            return status
        }
    }
}
</script>
<style scope></style>