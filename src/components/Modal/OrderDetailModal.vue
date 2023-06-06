<template>
  <transition
    enter-from-class="ease-out opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="ease-in opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="this.display"
      class="w-full h-full fixed top-0 left-0 z-50 flex items-center backdrop-blur-lg transition duration-150 overflow-auto"
      @keydown.escape="closeModal"
      @click="closeModal"
      id="backdrop-overlay"
    >
      <transition
        enter-from-class="ease-out opacity-0 transform translate-y-1/2"
        enter-to-class="opacity-100"
        leave-from-class="ease-in opacity-100"
        leave-to-class="opacity-0 transform translate-y-1/2"
      >
      <div
      class="
        bg-[#ffffff]
        dark:bg-gray-800
        z-10
        dark:text-gray-200
        lg:w-2/4
        md:w-full
        sm:w-full
        mx-auto
        h-auto
        p-4
        shadow-md
        rounded-lg
        max-h-full
        overflow-auto
      "
      @click.stop=""
    >
      <div class="flex items-center justify-between border-bottom">
        <h2 class="text-xl py-1 text-gray-800 dark:text-gray-200">Chi tiết đơn hàng</h2>
        <span class="flex items-center text-gray-800 dark:text-gray-200">
          Tạo lúc {{ this.$moment(this.order?.created_at).format('DD/MM/YYYY HH:mm') }}</span>
        <span class="flex items-center text-gray-800 dark:text-gray-200">
          bởi <strong class="ml-1">{{ this.order?.user?.role.name }} - {{ this.order?.user?.name}}</strong>
          <img
            v-tooltip="this.order?.user?.role.name"
            :src="basePath + 'img/user/' + this.order?.user?.image"
            class="h-7 w-7 rounded-full object-cover mx-1"
        /></span>
      </div>
      <div class="w-full border-bottom py-2 flex flex-col text-gray-800 dark:text-gray-200">
        <span class="w-100 flex"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>Tên khách hàng: {{ this.order?.customer?.name }}</span
        >
        <span class="w-100 flex"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>Số điện thoại: {{ this.order?.customer?.phone_number }}</span
        >
        <span class="w-100 flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>Địa chỉ: {{ this.order?.customer?.address }}</span>
        <span class="w-100 flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>Yêu cầu khách hàng: {{ this.order?.note }}</span>
      </div>
      <hr>
      <div class="w-full border-bottom py-2 flex flex-col text-gray-800 dark:text-gray-200">
        <h3 class="font-bold text-base">Thông tin đơn hàng</h3>
        <div class="grid grid-cols-6 gap-x-1 gap-y-2 my-3 items-center text-gray-800 dark:text-gray-200">
          <span class="text-center">#</span>
          <span class="col-span-2">Tên sản phẩm - Số lượng</span>
          <span class="text-center">Chất lượng</span>
          <span class="text-center">Đơn giá</span>
          <span class="text-center">Tổng tiền</span>
        </div>
        <div
          class="grid grid-cols-6 gap-x-1 gap-y-2 py-4 items-center py-1 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-50 hover:text-gray-700 hover:font-bold cursor-pointer ease-in duration-150"
          :class="{'bg-gray-200 dark:bg-gray-900 hover:dark:bg-gray-50 hover:dark:text-gray-700': !this.isOddRow(index)}"
          v-for="({id, product, quality, amount, price}, index) in this.order?.detail"
          :key="id"
        >
          <span class="text-center">{{
            ++index
          }}</span>
          <span class="col-span-2"
            >{{ product.Ten }} x {{ amount }}
            {{ product.unit_cal.name }}</span
          >
          <span class="text-center">{{
            quality && quality.Ten
          }}</span>
          <span class="text-center">{{
            product && price.toLocaleString()
          }}</span>
          <span class="text-center">{{
            Number(amount * price).toLocaleString()
          }}</span>
        </div>
        <h3 class="font-bold text-base dark:text-gray-200 my-2">
          Thông tin thanh toán
        </h3>
        <ul>
          <li class="flex justify-between">
            Thành tiền:
            <span class="font-bold text-base text-green-500">{{
              this.formatPrice(this.order?.total / (1 + this.order?.vat / 100))
            }}</span>
          </li>
          <li class="flex justify-between">
            VAT(%):
            <span class="font-bold text-base text-green-500">{{ this.order?.vat }}% - 
            {{
              this.formatPrice(this.order?.total - (this.order?.total / (1 + this.order?.vat / 100)))
            }}</span>
          </li>
          <li class="flex justify-between">
            Tổng thanh toán:
            <span class="font-bold text-base text-green-500">{{
              this.formatPrice(this.order?.total)
            }}</span>
          </li>
          <li class="flex justify-between">
            Đã thanh toán:
            <span class="font-bold text-base text-green-500">{{
              this.formatPrice(this.order?.paid)
            }}</span>
          </li>
          <li class="flex justify-between">
            Cần thanh toán:
            <span class="font-bold text-base text-red-500">{{
              this.formatPrice(this.order?.total - this.order?.paid)
            }}</span>
          </li>
        </ul>
      </div>
      <div class="flex items-center justify-between text-gray-800 dark:text-gray-200">
        <span class="text-base flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Ngày giao hàng:
          <span
            class="mx-2"
            :class="{ 'text-red-500 font-bold': expireTime <= 2 }"
          >
            {{ this.$moment(this.order?.NgayTraDon).format('DD/MM/YYYY') }}
             - 
            {{ expireTime > 0 ? `Còn ${expireTime} ngày` : "Đã hết hạn" }}
          </span></span
        >
        <button
          class="
            px-3
            py-2
            bg-indigo-500
            hover:bg-indigo-600
            duration-150
            ease-in
            text-white
            rounded-lg
            mt-2
          "
          @click="closeModal"
        >
          Đóng
        </button>
      </div>
    </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import mediumZoom from "medium-zoom";
import { orderService } from "../../services/order.service";
import { toRaw } from "vue";

export default {
  props: {
    id_order: Number,
    display: Boolean
  },
  watch:{
    display: function (n, o){
      if(n) this.getDataById()
    }
  },
  mounted() {
    mediumZoom(document.querySelectorAll(".product__thumbnail"), {
      background: "rgba(0,0,0,0)",
    });
  },
  data() {
    return {
      order: {},
      basePath: this.$store.getters.getBaseUrl,
    };
  },
  computed: {
    expireTime() {
      const now = Date.now();
      const expire = this.order?.NgayTraDon && new Date(this.order?.NgayTraDon);
      const result = expire - now;
      return Math.ceil(result / (1000 * 60 * 60 * 24));
    },
  },
  methods: {
    closeModal() {
      this.$emit("toggle_detail");
    },
    async getDataById(){
      if(!this.id_order) return
      await orderService.findById(this.id_order).then(async (res) => {
          if (await res.data) {
            const data = await res.data.data;
            this.order = toRaw(data);
          }
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        .concat(" đ");
    },
    isOddRow(row){
      let result = row % 2
      return result != 0 ? true : false
    }
  },
};
</script>
<style scoped></style>
