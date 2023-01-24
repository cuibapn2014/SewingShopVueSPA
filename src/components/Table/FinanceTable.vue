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
        <BaseTable :field_list="this.fieldList" :data_paginate="dataPaginate" :path_current="'finance'">
            <div v-if="is_load"
                class="bg-gray-200 dark:bg-gray-800 dark:bg-opacity-80 bg-opacity-80 w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center ">
                <font-awesome-icon class="animate-spin w-[4rem] h-[4rem] text-indigo-500"
                    icon="fa-solid fa-circle-notch" />
            </div>
            <tr v-for="(item, idx) in renderData.data?.data" :key="item.id"
                class="text-gray-700 dark:text-gray-400 hover:bg-indigo-300 hover:bg-opacity-5 duration-150">
                <td class="px-4 py-3 text-sm">
                    {{ index + idx }}
                </td>
                <td class="px-2 py-3 text-sm">
                    {{ item.code }}
                </td>
                <td class="px-2 py-3 text-sm">
                    {{ item.type == 1 ? 'Phiếu thu' : 'Phiếu chi' }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ item.title }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ item.detail }}
                </td>
                <td class="px-4 py-3 text-sm"
                    :class="{ 'text-green-500': item.type == 1, 'text-red-500': item.type != 1 }">
                    {{ item.type == 1 ? '+' : '-' }}{{ item.total.toLocaleString('vi-VN') }}
                </td>
                <td class="px-4 py-3 text-sm">
                    <span :class="{
                        // 'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600': (item.status == 5),
                        // 'px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700': (item.status == 1),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-orange-100 text-orange-700 dark:bg-orange-600': (item.status == 1),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-green-100 text-green-700 dark:bg-green-600': (item.status == 2),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600': (item.status == 3)
                    }">
                        {{ getStatus(item.status) }}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ new Date(item.create_date).toLocaleDateString('vi-VN') }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ item.reviewer_date ? new Date(item.reviewer_date).toLocaleDateString('vi-VN') : '' }}
                </td>
                <td class="px-4 py-3 text-sm">
                    <img v-tooltip.top-start="'{{ item.user.name }} - {{ item.user.role.name }}'"
                        :src="`${this.url}/img/user/${item.user.image}`"
                        class="h-12 w-12 object-cover object-center rounded-full" />
                </td>
                <td class="px-4 py-3 text-sm flex items-center">
                    <button v-if="item.status == 1" v-tooltip="'Chỉnh sửa'" title="Chỉnh sửa"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit">
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                            </path>
                        </svg>
                    </button>
                    <button v-tooltip="'Xóa'" title="Xóa"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete">
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <div v-if="item.status == 1" class="inline-block relative group">
                        <ul class="absolute hidden text-gray-700 pt-1 right-0 top-[25] group-hover:block z-50"
                            style="margin-top: 25px;">
                            <li class=""><a
                                    class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-gray-700">Duyệt</a>
                            </li>
                            <li class=""><a
                                    class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-gray-700">Không
                                    duyệt</a></li>
                        </ul>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
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
                'Mã phiếu', 'Loại phiếu', 'Tên chi phí', 'Nội dung', 'SỐ tiền', 'Trạng thái', 'Ngày tạo', 'Ngày duyệt', 'Người duyệt'
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
                case 1: return "Chờ duyệt";
                case 2: return "Đã duyệt";
                case 3: return "Không duyệt";
            }
        }
    }
}
</script>
<style scope>

</style>