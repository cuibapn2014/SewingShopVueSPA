<template>
    <div class="w-full overflow-x-auto">   
        <BaseTable :field_list="this.fieldList" :data_paginate="dataPaginate" path_current="production-request">
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
                <td class="px-3 py-3 text-sm">
                    <img class="w-16 h-16 rounded-lg object-cover img__mthumbnail"
                        :src="item.image ? `${this.url}/img_product/${item.image}` : `${this.url}/img/placeholder.jpg`"
                        alt="" />
                </td>
                <td class="px-3 py-3 text-sm">
                    {{ item.code }}
                </td>
                <td class="px-3 py-3 text-sm">
                    {{ item.detail_order_id > 0 ? 'SX theo đơn' : 'SX lưu kho' }}
                </td>
                <td class="px-3 py-3 text-sm ">
                    {{ item.product.Ten }}
                </td>
                <td class="px-3 py-3 text-sm">
                    {{ item.size }}{{ item.color ? ' - ' + item.color : '' }}
                </td>
                <td class="px-3 py-3 text-sm">
                    {{ item.amount.toLocaleString('vi') }} cái
                </td>
                <td class="px-3 py-3 text-sm">
                    {{ item.completed.toLocaleString('vi') }} cái
                    <button v-if="item.status < 2" title="Phân bổ" v-tooltip="'Phân bổ'"
                        @click="this.openDistributeModal(item.id)"
                        class="flex items-center justify-between px-3 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fill-rule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </td>
                <td class="px-3 py-3 text-sm">
                    {{ item.note }}
                </td>
                <td class="px-3 py-3 text-sm">
                    <span :class="{
                        'px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700': (item.status == 1),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-orange-100 text-orange-700 dark:bg-orange-600': (item.status == 2),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-green-100 text-green-700 dark:bg-green-600': (item.status == 3),
                        'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600': (item.status == 4),
                    }">
                        {{ getStatus(item.status) }}
                    </span>
                </td>
                <td class="px-3 py-3 text-sm">
                    <img v-tooltip.top-start="item.user.name" :src="`${this.url}/img/user/${item.user.image}`"
                        class="h-12 w-12 object-cover object-center rounded-full" loading="lazy" />
                </td>
                <td class="px-3 py-3 text-sm">
                    {{ this.$moment(item.updated_at).format('DD/MM/YYYY') }}
                </td>
                <td class="px-3 py-3 text-sm flex items-center">
                    <button v-if="item.status == 1" title="Chỉnh sửa" v-tooltip="'Chỉnh sửa'"
                        @click="this.setEditId(item.id)"
                        class="flex items-center justify-between px-3 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit">
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                            </path>
                        </svg>
                    </button>
                    <button v-if="item.status == 1" v-tooltip="'Xóa'" title="Xóa"
                        @click.prevent="this.openModalDelete(item.id)"
                        class="flex items-center justify-between px-3 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete">
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <!-- <button v-if="item.status == 1" v-tooltip="'Tạo yêu cầu mua hàng'" title="Tạo yêu cầu mua hàng"
                        class="flex items-center justify-between px-3 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </button> -->
                    <button v-if="item.status == 1" v-tooltip="'Tạo yêu cầu mua hàng'" title="Tạo yêu cầu mua hàng"
                        @click="handleCreatePurchase(item.id)"
                        class="flex items-center justify-between px-3 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="create purchase">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                    </button>
                    <button v-if="item.status == 1" v-tooltip="'Tạo lệnh sản xuất'" title="Tạo lệnh sản xuất"
                        @click="this.handleCreateProduction(item.id)"
                        class="flex items-center justify-between px-3 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="create">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                    <!-- <button v-tooltip="'Cập nhật trạng thái'"
                        class="flex items-center justify-between px-3 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                        </svg>
                        </button> -->
                    <button v-if="item.status <= 4 && item.status > 1" title="Tiến độ sản xuất" v-tooltip="'Tiến độ sản xuất'"
                        @click="this.openProgressModal(item.id)"
                        class="flex items-center justify-between px-3 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="process">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                    </button>
                    <button v-if="item.status < 4 && item.status > 1" v-tooltip="'Ngưng sản xuất'"
                        @click="this.openConfirmModal(item.id)"
                        class="flex items-center justify-between px-3 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                </td>
            </tr>
            <tr>
                <td colspan="13" v-if="renderData.data?.data.length <= 0"
                    class="text-sm text-center py-4 text-gray-800 dark:text-gray-200">Không tìm thấy dữ liệu nào</td>
            </tr>
            <ConfirmDeleteModal
            :is_open="this.isOpenModal"
            @close_delete="this.handleEventDelete"
            @confirm_delete="this.handleEventDelete"
            />
            <ProgressProductionModal
                :id_production_request="this.idProgress"
                :is_open="this.isOpenProgressModal"
                @togglemodal="this.closeProgressModal"
            />
            <ConfirmModal
            title="Xác nhận"
            content="Bạn có muốn cập nhật trạng thái sang ngưng sản xuất ?"
            submit_txt="Xác nhận"
            :is_open="this.isOpenConfirmModal"
            @close="this.closeConfirmModal"
            @confirm="this.handleUpdateStatus"
            />
            <DistributeModal
            :is_open="this.isOpenDistributeModal"
            :id_production_request="this.idUpdate"
            @close="this.closeDistributeModal"
            @success="this.handleSuccessDistribute"
            />
        </BaseTable>
    </div>
</template>
<script>
import { toast } from 'vue3-toastify';
import { config } from '../../helpers/config';
import { productionService } from '../../services/production.service';
import { productionRequestService } from '../../services/productionRequest.service';
import { purchaseRemindService } from '../../services/purchaseRemind.service';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal.vue';
import ConfirmModal from '../Modal/ConfirmModal.vue';
import DistributeModal from '../Modal/DistributeModal.vue';
import ProgressProductionModal from '../Modal/ProressProductionModal.vue'
import BaseTable from './BaseTable.vue';

export default {
    props: {
        data_list: Array,
        is_load: Boolean
    },
    components: {
        BaseTable, ConfirmDeleteModal, ProgressProductionModal, ConfirmModal, DistributeModal
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
                'Hình ảnh',
                'Đề nghị',
                'Loại',
                'Sản phẩm',
                'Thuộc tính',
                'Yêu cầu',
                'Hoàn thành',
                'Ghi chú',
                'Trạng thái',
                'Người tạo',
                'Ngày tạo'
            ],
            index: this.data_list?.data.from || 1,
            url: config.apiUrl.split('/api')[0],
            isShowModal: false,
            status: null,
            idUpdate: null,
            isOpenModal: false,
            isOpenConfirmModal: false,
            isOpenProgressModal: false,
            isOpenDistributeModal: false,
            deleteId: null,
            isOpenDetailModal: false,
            idDetail: null,
            idProgress: null,
            id_confirm: null
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
        setEditId(id) {
            this.$emit("edit_production_suggest", id);
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
        openProgressModal(id) {
            this.isOpenProgressModal = true;
            this.idProgress = id;
        },
        closeProgressModal() {
            this.isOpenProgressModal = false;
        },
        openConfirmModal(id) {
            this.isOpenConfirmModal = true;
            this.id_confirm = id;
        },
        closeConfirmModal() {
            this.isOpenConfirmModal = false;
            this.id_confirm = null;
        },
        openDistributeModal(id) {
            this.isOpenDistributeModal = true;
            this.idUpdate = id;
        },
        closeDistributeModal(id) {
            this.isOpenDistributeModal = false;
            this.idUpdate = null;
        },
        handleSuccessDistribute(id) {
            this.isOpenDistributeModal = false;
            this.idUpdate = null;
            this.$emit("delete_production_suggest"); // trigger reFetchData() in parent
        },
        async handleEventDelete(data) {
            if (data) {
                await productionRequestService
                .deleteById(this.deleteId)
                .then((res) => {
                    if (res.data.msg) {
                    toast.success(`Xóa thành công!`, {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: toast.THEME.COLORED,
                        pauseOnHover: false,
                    });
                    this.$emit("delete_production_suggest");
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
        async handleCreatePurchase(data) {
            if (data) {
                await purchaseRemindService
                .create(data)
                .then((res) => {
                    if (res.data.msg) {
                        toast.success(res.data.msg, {
                            position: toast.POSITION.TOP_RIGHT,
                            theme: toast.THEME.COLORED,
                            pauseOnHover: false,
                        });
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
        },
        async handleCreateProduction(data) {
            if (data) {
                await productionService
                .create(data)
                .then((res) => {
                    if (res.data.msg) {
                        this.$emit("delete_production_suggest"); // trigger reFetchData() in parent
                        toast.success(res.data.msg, {
                            position: toast.POSITION.TOP_RIGHT,
                            theme: toast.THEME.COLORED,
                            pauseOnHover: false,
                        });
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
        },
        async handleUpdateStatus() {
            let data = this.id_confirm
            if (data) {
                await productionRequestService
                .updateStatus(data)
                .then((res) => {
                    if (res.data.msg) {
                        this.$emit("delete_production_suggest"); // trigger reFetchData() in parent
                        toast.success(res.data.msg, {
                            position: toast.POSITION.TOP_RIGHT,
                            theme: toast.THEME.COLORED,
                            pauseOnHover: false,
                        });
                    }
                })
                .catch((err) => {
                    toast.error(`Đã xảy ra lỗi! Vui lòng kiểm tra lại`, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: toast.THEME.COLORED,
                    pauseOnHover: false,
                    });
                });
                this.isOpenConfirmModal = false;
                this.id_confirm = null;
            }
        },
    }
}
</script>
<style scope></style>