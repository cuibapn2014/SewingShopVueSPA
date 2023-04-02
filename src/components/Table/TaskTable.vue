<template>
  <div>
    <div>
      <div class="flex justify-end py-2">
        <button
          class="flex items-center px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border-0 rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Giao việc
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
    <BaseTable
      :field_list="this.fieldList"
      :data_paginate="dataPaginate"
      :path_current="'task'"
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
        <td class="px-4 py-3 text-sm flex items-center">
          <img
            v-tooltip.top-start="'{{ item.user.name }}'"
            :src="`${this.url}/img/user/${item.user.image}`"
            class="h-12 w-12 object-cover object-center rounded-full"
          />
        </td>
        <td class="px-4 py-3 text-sm">
          {{ item.tieu_de }}
        </td>
        <td class="px-4 py-3 text-sm">
          {{ new Date(item.ngay_hoan_thanh).toLocaleDateString("vi-VN") }}
        </td>
        <td class="px-4 py-3 text-sm">
          {{ new Date(item.created_at).toLocaleDateString("vi-VN") }}
        </td>
        <td class="px-4 py-3 text-sm flex">
          <button
            v-tooltip="'Xem chi tiết'"
            title="Xem chi tiết"
            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            aria-label="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            title="Chỉnh sửa"
            v-tooltip="'Chỉnh sửa'"
            class="flex items-center float-left justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
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
            title="Xóa"
            v-tooltip="'Xóa'"
            class="flex items-center float-left justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
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
        </td>
      </tr>
      <tr>
        <td
          colspan="9"
          v-if="renderData.data?.data.length <= 0"
          class="text-sm text-center py-4 text-gray-800 dark:text-gray-200"
        >
          Không tìm thấy dữ liệu nào
        </td>
      </tr>
    </BaseTable>
  </div>
</template>
<script>
import { config } from "../../helpers/config";
import BaseTable from "./BaseTable.vue";

export default {
  props: {
    data_list: Array,
    is_load: Boolean,
  },
  components: {
    BaseTable,
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
  data() {
    return {
      fieldList: ["Tạo bởi", "Tiêu đề", "Thời hạn", "Ngày tạo"],
      index: this.data_list?.data.from || 1,
      url: config.apiUrl.split("/api")[0],
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
          return "Đang hợp tác";
        case 2:
          return "Ngưng hợp tác";
      }
    },
  },
};
</script>
<style scope></style>
