<template>
  <BaseTable
    :field_list="this.fieldList"
    :data_paginate="dataPaginate"
    path_current="warehouse-import"
  >
    <transition
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
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
    <tr
      v-for="(item, idx) in renderData.data?.data"
      :key="item.id"
      class="text-gray-700 dark:text-gray-400 hover:bg-indigo-300 hover:bg-opacity-5 duration-150"
    >
      <td class="px-4 py-3 text-sm">
        {{ index + idx }}
      </td>
      <td class="px-4 py-3 text-sm">
        {{ item.code }}
      </td>
      <td class="px-3 py-3 text-sm">
        {{ item.type == 1 ? "Lưu kho" : "Sản xuất" }}
      </td>
      <td class="px-3 py-3 text-sm">
        {{ item.ingredient.name }}
      </td>
      <td class="px-3 py-3 text-sm">
        {{ item.amount.toLocaleString("vi") }}
        {{ item.ingredient.unit_cal.name }}
      </td>
      <td class="px-3 py-3 text-sm">
        {{ item.ingredient.price.toLocaleString("vi") }}
      </td>
      <td class="px-3 py-3 text-sm">
        {{ Number(item.ingredient.price * item.amount).toLocaleString("vi") }}
      </td>
      <td
        class="px-3 py-3 text-sm max-w-xs overflow-hidden text-ellipsis"
        v-tooltip="item.note"
      >
        {{ item.note }}
      </td>
      <td class="px-3 py-3 text-sm">
        {{ new Date(item.import_date).toLocaleDateString() }}
      </td>
      <td class="px-3 py-3 text-sm">
        <span
          :class="{
            'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600':
              item.status != 1 && item.status != 2,
            'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-orange-100 text-orange-700 dark:bg-orange-600':
              item.status == 1,
            'px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-green-100 text-green-700 dark:bg-green-600':
              item.status == 2,
          }"
        >
          {{ getStatus(item.status) }}
        </span>
      </td>
      <td class="px-3 py-3 text-sm">
        <img
          v-tooltip.top-start="
            item.creator.name + ' - ' + item.creator.role.name
          "
          :src="`${this.url}/img/user/${item.creator.image}`"
          class="h-12 w-12 object-cover object-center rounded-full"
        />
      </td>
      <td class="px-3 py-3 text-sm">
        <img
          v-if="item.reviewer"
          v-tooltip.top-start="
            item.reviewer.name + ' - ' + item.reviewer.role.name
          "
          class="h-12 w-12 object-cover object-center rounded-full"
          :src="`${this.url}/img/user/${item.reviewer.image}`"
        />
      </td>
      <td class="px-3 py-3 text-sm flex items-center">
        <button
          v-if="item.status == 1"
          title="Chỉnh sửa"
          v-tooltip="'Chỉnh sửa'"
          class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          aria-label="Edit"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            ></path>
          </svg>
        </button>
        <button
          v-if="item.status == 1"
          v-tooltip="'Xóa'"
          title="Xóa"
          class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          aria-label="Delete"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div v-if="item.status == 1" class="inline-block relative group">
          <ul
            class="absolute text-gray-700 pt-1 right-0 top-[0] z-50"
            :class="{
              block: this.moreToggle == item.id,
              hidden: this.moreToggle != item.id,
            }"
            style="margin-top: 25px"
          >
            <li class="" @click="this.handleOpenConfirmModal(item.id, 2)">
              <span
                class="rounded-t bg-gray-200 hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap cursor-pointer text-green-500"
                >Duyệt nhập kho</span
              >
            </li>
            <li class="" @click="this.handleOpenConfirmModal(item.id, 3)">
              <span
                class="rounded-b bg-gray-200 hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap cursor-pointer text-red-500"
              >
                Không duyệt
              </span>
            </li>
          </ul>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 cursor-pointer"
            fill="none"
            @click="this.toggleMenu(item)"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            ref="toggle_menu"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </td>
    </tr>
    <tr>
      <td
        colspan="13"
        v-if="renderData.data?.data.length <= 0"
        class="text-sm text-center py-4 text-gray-800 dark:text-gray-200"
      >
        Không tìm thấy dữ liệu nào
      </td>
    </tr>
  </BaseTable>
  <ConfirmModal
    title="Xác nhận"
    content="Bạn có chắc chắn muốn cập nhật trạng thái ?"
    submit_txt="Xác nhận"
    :is_open="this.isOpenConfirmModal"
    @close="this.closeConfirmModal"
    @confirm="this.updateStatus"
  />
</template>
<script>
import { toast } from "vue3-toastify";
import { config } from "../../helpers/config";
import { warehouseImportService } from "../../services/warehouseImport.service";
import ConfirmModal from "../Modal/ConfirmModal.vue";
import BaseTable from "./BaseTable.vue";

export default {
  props: {
    data_list: Array,
    is_load: Boolean,
  },
  components: {
    BaseTable,
    ConfirmModal,
  },
  computed: {
    renderData() {
      let data = this.data_list ?? [];
      return data;
    },
    dataPaginate() {
      return this.filterObject();
    },
  },
  watch: {
    data_list(a, b) {
      this.index = a.data.from;
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  data() {
    return {
      fieldList: [
        "Mã nhập kho",
        "Loại",
        "Sản phẩm",
        "Số lượng",
        "Đơn giá",
        "Tổng tiền",
        "Ghi chú",
        "Ngày nhập",
        "Trạng thái",
        "Người yêu cầu",
        "Người xét duyệt",
      ],
      index: this.data_list?.data.from || 1,
      url: config.apiUrl.split("/api")[0],
      moreToggle: 0,
      isOpenConfirmModal: false,
      id_confirm: null,
      status: null
    };
  },
  methods: {
    filterObject() {
      let obj = this.data_list?.data ?? null;
      if (!obj) return;
      return Object.fromEntries(
        Object.entries(obj).filter(([key, val]) => key != "data")
      );
    },
    getStatus(status) {
      switch (status) {
        case 1:
          return "Chờ duyệt";
        case 2:
          return "Đã duyệt";
        default:
          return "Không duyệt";
      }
    },
    toggleMenu(item) {
      this.moreToggle = this.moreToggle != item.id ? item.id : 0;
    },
    handleClickOutside(event) {
      if (!this.$refs.toggle_menu.includes(event.target)) this.moreToggle = 0;
    },
    async updateStatus() {
      await warehouseImportService
        .updateStatus(this.id_confirm, this.status)
        .then((res) => {
          if (res.data.msg) {
            toast.success(res.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
              theme: toast.THEME.COLORED,
              pauseOnHover: false,
            });
          }
          this.$emit('reload', []);
          this.closeConfirmModal();
        })
        .catch((err) => {
          toast.error(`Đã xảy ra lỗi! Vui lòng kiểm tra lại`, {
            position: toast.POSITION.TOP_RIGHT,
            theme: toast.THEME.COLORED,
            pauseOnHover: false,
          });

          this.closeConfirmModal();
        });
    },
    closeConfirmModal() {
      this.isOpenConfirmModal = false;
      this.id_confirm = null;
      this.status = null;
    },
    handleOpenConfirmModal(id, status) {
        this.isOpenConfirmModal = true;
        this.id_confirm = id;
        this.status = status;
    }
  },
};
</script>
<style scope>
</style>