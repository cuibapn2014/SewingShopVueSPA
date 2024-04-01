<template>
    <BaseTable :field_list="this.fieldList" :data_paginate="dataPaginate" :path_current="'order'">
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
                {{ item.code }}
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
            <td class="px-4 py-3 text-sm">
                <span
                    :class="{
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600' : (item.status == 5 || item.status == 4),
                        'px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700' : (item.status == 1),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-orange-100 text-orange-700 dark:bg-orange-600' : (item.status == 2),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-green-100 text-green-700 dark:bg-green-600' : (item.status == 3),
                    }">
                    {{ getStatus(item.status) }}
                </span>
            </td>
            <td class="px-4 py-3 text-sm">
                <img v-tooltip.top-start="item.user.name" :src="`${this.url}/img/user/${item.user.image}`" class="h-12 w-12 object-cover object-center rounded-full" loading="lazy" />
            </td>
            <td class="px-4 py-3 text-sm">
                {{ this.$moment(item.updated_at).format('DD/MM/YYYY') }}
            </td>
            <td class="px-4 py-3 text-sm">
                {{ this.$moment(item.finish_date).format('DD/MM/YYYY') }}
            </td>
            <td class="px-4 py-3 text-sm flex items-center">
                <button title="Chỉnh sửa" v-tooltip="'Chỉnh sửa'"
                    @click="this.setEditId(item.id)"
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Edit">
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                        </path>
                    </svg>
                </button>
                <button v-tooltip="'Xóa'" title="Xóa"
                    @click.prevent="this.openModalDelete(item.id)"
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete">
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
                <!-- <button v-tooltip="'Xuất PDF'" title="Xuất PDF"
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                            clip-rule="evenodd" />
                    </svg>
                </button> -->
                <button v-tooltip="'Xem chi tiết'" title="Xem chi tiết"
                    @click="this.openDetailModal(item.id)"
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clip-rule="evenodd" />
                    </svg>
                </button>

                <button 
                v-tooltip="'Xử lý đơn hàng'"
                @click.prevent="this.openModal(item.status, item.id)"
                class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                aria-label="process-order"
                >
 
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </td>
        </tr>
        <tr>
            <td colspan="10" v-if="renderData.data?.data.length <= 0"
                class="text-sm text-center py-4 text-gray-800 dark:text-gray-200">Không tìm thấy dữ liệu nào</td>
        </tr>
        <ConfirmDeleteModal
        :is_open="this.isOpenModal"
        @close_delete="this.handleEventDelete"
        @confirm_delete="this.handleEventDelete"
        />
    </BaseTable>
    <UpdateStatusModal :display="this.isShowModal" :status="this.status" :id="this.idUpdate" @close="closeModal" @update_success="updateStatusSuccess"/>
    <OrderDetailModal 
    :display="this.isOpenDetailModal" 
    :id_order="this.idDetail"
    @toggle_detail="() => this.isOpenDetailModal = false"/>
</template>
<script>
import { config } from '../../helpers/config';
import BaseTable from './BaseTable.vue';
import UpdateStatusModal from '../Modal/UpdateStatusModal.vue';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal.vue';
import { orderService } from '../../services/order.service';
import { toast } from "vue3-toastify";
import OrderDetailModal from '../Modal/OrderDetailModal.vue';

export default {
    props: {
        data_list: Array,
        is_load: Boolean
    },
    components: {
    BaseTable,
    UpdateStatusModal,
    ConfirmDeleteModal,
    OrderDetailModal
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
                'Mã đơn hàng', 'Khách hàng', 'Liên hệ', 'Tổng tiền', 'Trạng thái', 'Tạo bởi', 'Cập nhật', 'Ngày giao hàng'
            ],
            index: this.data_list?.data.from || 1,
            url: config.apiUrl.split('/api')[0],
            isShowModal: false,
            status: null,
            idUpdate: null,
            isOpenModal: false,
            deleteId: null,
            isOpenDetailModal: false,
            idDetail: null
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
        },
        setEditId(id) {
            this.$emit("edit_order", id);
        },
        openModal(status, id) {
            this.status = status
            this.idUpdate = id
            this.isShowModal = true;
        },
        closeModal() {
            this.isShowModal = false;
        },
        openModalDelete(id) {
            this.isOpenModal = true;
            this.deleteId = id;
        },
        openDetailModal(id) {
            this.isOpenDetailModal = true;
            this.idDetail = id;
        },
        updateStatusSuccess(){
            this.$emit('update_success_status')
            this.isShowModal = false
        },
        async handleEventDelete(data) {
            if (data) {
                await orderService
                .deleteById(this.deleteId)
                .then((res) => {
                    if (res.data.msg) {
                    toast.success(`Xóa thành công!`, {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: toast.THEME.COLORED,
                        pauseOnHover: false,
                    });
                    this.$emit("delete_order");
                    }
                })
                .catch((err) => {
                    toast.error(`Đã xảy ra lỗi! Vui lòng kiểm tra lại`, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: toast.THEME.COLORED,
                    pauseOnHover: false,
                    });
                });
            }
            this.isOpenModal = false;
            this.deleteId = null;
        },
    }
}
</script>
<style scope>

</style>