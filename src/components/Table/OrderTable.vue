<template>
    <BaseTable :field_list="this.fieldList" :data_paginate="dataPaginate" :path_current="'order'">
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
                {{ item.customer.name }}
            </td>
            <td class="px-4 py-3 text-sm">
                {{ item.customer.phone_number }}
            </td>
            <td class="px-4 py-3 text-sm font-bold text-green-500">
                {{ item.total.toLocaleString('vi') }}
            </td>
            <td class="px-4 py-3 text-sm font-bold text-green-500">
                <span
                    :class="{
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600' : (item.status == 5),
                        'px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700' : (item.status == 1),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-orange-100 text-orange-700 dark:bg-orange-600' : (item.status == 2),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-green-100 text-green-700 dark:bg-green-600' : (item.status == 3),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600' : (item.status == 4),
                    }">
                    {{ getStatus(item.status) }}
                </span>
            </td>
            <td class="px-4 py-3 text-sm">
                <img v-tooltip.top-start="item.user.name" :src="`${this.url}/img/user/${item.user.image}`" class="h-12 w-12 object-cover object-center rounded-full" loading="lazy" />
            </td>
            <td class="px-4 py-3 text-sm">
            </td>
            <td class="px-4 py-3 text-sm">
            </td>
            <td class="px-4 py-3 text-sm flex items-center">
                <button title="Chỉnh sửa" v-tooltip="'Chỉnh sửa'"
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
                <button v-tooltip="'Xuất PDF'" title="Xuất PDF"
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <button v-tooltip="'Xem chi tiết'" title="Xem chi tiết"
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clip-rule="evenodd" />
                    </svg>
                </button>

                <div class="inline-block relative group">
                    <ul class="absolute hidden text-gray-700 pt-1 right-0 top-[25] group-hover:block z-50"
                        style="margin-top: 25px;">
                        <li class=""><a
                                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                href="">Duyệt</a>
                        </li>
                        <li class=""><a
                                class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                href="">Không
                                duyệt</a></li>
                        <li class=""><a
                                class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                href="">Hoàn thành</a></li>
                        <li class=""><a
                                class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                href="">Hủy</a></li>
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
        dataPaginate(){
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
                'Khách hàng', 'Liên hệ', 'Tổng tiền', 'Trạng thái', 'Tạo bởi', 'Cập nhật', 'Ngày giao hàng'
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
        getStatus(status){
            switch(status){
                case 1: return "Chờ duyệt";
                case 2: return "Đã duyệt";
                case 3: return "Hoành thành";
                case 4: return "Không duyệt";
                case 5: return "Đã hủy";
            }
        }
    }
}
</script>
<style scope>

</style>