<template>
  <ActionBaseModal
    :is_open="is_open_modal"
    :title="title"
    @save_data="this.createOrUpdateData()"
    :is_submit="this.isSubmit"
  >
    <form id="form_order" ref="form_order">
      <div class="grid lg:grid-cols-4 gap-4 items-start">
        <AutoComplete
          name="id_customer"
          placeholder="Chọn khách hàng"
          label="Khách hàng"
          :options="this.opt_customer"
          :selected="this.selectedCustomer ?? this.data_edit?.customer?.name"
          @search="this.searchCustomer"
          :error_message="this.errors?.id_customer"
          :required="true"
          :value="this.data_edit?.customer?.id"
          :allow_clear="false"
        />
        <label class="block text-sm">
          <span class="flex text-gray-700 dark:text-gray-400">Tổng tiền </span>
          <input
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray cursor-not-allowed form-input"
            type="text"
            readonly
            name="total"
            placeholder=""
            :value="this.total_price.toLocaleString('vi-VN')"
          />
        </label>
        <label class="block text-sm">
          <span class="flex text-gray-700 dark:text-gray-400">
            Thuế (%VAT)
          </span>
          <select
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            name="vat"
            v-model="this.data_edit.vat"
          >
            <option disabled value="">Chọn mức thuế</option>
            <option value="0" selected>0%</option>
            <option value="5">5%</option>
            <option value="8">8%</option>
            <option value="10">10%</option>
          </select>
        </label>
        <NumberInput
          name="paid"
          label="Đã thanh toán"
          placeholder="Nhập số tiền đã thanh toán"
          :required="true"
          :value="this.data_edit.paid"
          :error_message="errors.paid"
        />
        <label class="block text-sm">
          <span class="text-gray-700 dark:text-gray-400"
            >Yêu cầu khách hàng</span
          >
          <textarea
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            rows="3"
            placeholder="Nhập yếu cầu khách hàng"
            name="note"
            v-model="this.data_edit.note"
          ></textarea>
        </label>
        <label class="block text-sm">
          <span class="flex text-gray-700 dark:text-gray-400"
            >Ngày giao hàng</span
          >
          <input
            class="block w-full mt-1 text-sm disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            type="date"
            name="delivery_date"
            placeholder=""
            :value="this.$moment(this.data_edit?.NgayTraDon).format('YYYY-MM-DD')"
          />
        </label>
      </div>
      <h3 class="my-4 text-lg font-semibold text-gray-700 dark:text-gray-200 border-t-[1px] pt-4">
        Chi tiết đơn hàng
      </h3>
      <div
        v-for="product in detail_order"
        :key="product.id"
        class="grid md:grid-cols-7 gap-4 items-end mb-4"
      >
        <AutoComplete
          name="id_product[]"
          class="col-span-3"
          placeholder="Chọn sản phẩm"
          label="Sản phẩm"
          :options="this.opt_product[product.id] ?? []"
          :selected="this.selectedProduct ?? product.product?.Ten"
          @search="this.searchProduct($event, product.id)"
          :error_message="this.errors?.id_product"
          :required="true"
          :value="product.product?.id"
          :allow_clear="false"
        />
        <NumberInput
          name="quantity[]"
          label="Số lượng"
          placeholder="Nhập số lượng"
          :required="true"
          :value="product.amount"
          @change_number="this.totalPrice()"
        />
        <NumberInput
          name="price[]"
          label="Đơn giá"
          placeholder="Nhập đơn giá"
          :required="true"
          :value="product.price"
          @change_number="this.totalPrice()"
        />
        <label class="block text-sm">
          <span class="flex text-gray-700 dark:text-gray-400">
            Chất lượng hàng
            <p class="text-red-500 mx-1">*</p>
          </span>
          <select
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            name="quality[]"
            :v-model="product.id_ChatLuong"
          >
            <option disabled>Chọn chất lượng</option>
            <option value="2" selected>Thường</option>
            <option value="3">Cao</option>
          </select>
        </label>
        <button
          type="button"
          @click.prevent="this.removeDetailById(product.id)"
          class="px-3 py-2 w-10 h-10 rounded-md text-white bg-red-500 flex justify-center items-center hover:bg-red-600 duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <button
        type="button"
        @click.prevent="this.addDetail()"
        class="px-3 py-2 my-2 rounded-md text-white bg-indigo-500 flex justify-center items-center hover:bg-indigo-600 duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </form>
    <ConfirmDeleteModal
      :is_open="this.isOpenModalImage"
      @close_delete="this.handleEventDeleteImage"
      @confirm_delete="this.handleEventDeleteImage"
    />
  </ActionBaseModal>
</template>
<script>
import ActionBaseModal from "./ActionBaseModal.vue";
import { ingredientService } from "../../services/ingredient.service";
import { orderService } from "../../services/order.service";
import { toast } from "vue3-toastify";
import UploadFile from "../UploadFile.vue";
import "../../assets/css/tailwind.output.css";
import { reactive, toRaw } from "vue";
import AutoComplete from "../AutoComplete.vue";
import ConfirmDeleteModal from "./ConfirmDeleteModal.vue";
import { customerService } from "../../services/customer.service";
import { imageService } from "../../services/image.service";
import { numberFunctions } from "../../helpers/numberFunctions";
import { config } from "../../helpers/config";
import mediumZoom from "medium-zoom";
import NumberInput from "../NumberInput.vue";

export default {
  components: {
    ActionBaseModal,
    UploadFile,
    AutoComplete,
    ConfirmDeleteModal,
    NumberInput
  },
  props: {
    is_open_modal: Boolean,
    id_order: Number,
  },
  watch: {
    is_open_modal: function (n, o) {
      if (!o) {
        this.opt_customer = []
        this.opt_product = {}
        this.detail_order = [{ id: "tmp_1" }]
        this.total_price = 0
        this.selectedCustomer = this.selectedProduct = null;
        this.display = [null];
        this.data_edit = {};
      }
      if (!this.id_order) {
        this.title = "Thêm mới đơn hàng";
        this.clearData();
      }
      if (typeof this.id_order === "number") {
        this.title = "Chỉnh sửa đơn hàng";
        this.id = this.id_order;
        if (n) this.getDataById();
      }
    },
  },
  updated() {
    const zoom = mediumZoom(document.querySelectorAll(".img__mthumbnail"), {
      background: "rgba(0,0,0,0.5)",
    });
  },
  data() {
    return {
      title: "Thêm mới đơn hàng",
      id: null,
      data_edit: {},
      isSubmit: false,
      display: [null],
      errors: {},
      opt_customer: [],
      opt_product: {},
      detail_order: [{ id: "tmp_1" }],
      selectedCustomer: null,
      selectedProduct: null,
      url: config.apiUrl.split("/api")[0],
      isOpenModalImage: false,
      deleteImgId: null,
      total_price: 0,
    };
  },
  methods: {
    async getDataById() {
      if (this.id)
        await orderService.findById(this.id).then(async (res) => {
          if (await res.data) {
            const data = await res.data.data;
            this.data_edit = data;
            this.detail_order = data.detail
            this.data_edit.paid = this.data_edit.paid.toLocaleString('vi-VN')
            this.detail_order.map(item => {
              this.total_price += item.amount * item.price
              item.amount = item.amount.toLocaleString('vi-VN')
              item.price = item.price.toLocaleString('vi-VN')
            })
            this.total_price += this.total_price * this.data_edit.vat / 100
          }
        });
    },
    async createOrUpdateData() {
      let stop = false;
      Object.keys(this.errors).forEach((er) => {
        if (this.errors[er]) {
          toast.error(this.errors[er], {
            position: toast.POSITION.TOP_RIGHT,
            theme: toast.THEME.COLORED,
            pauseOnHover: false,
          });
          stop = true;
        }
      });
      if (stop) return;
      let msg = this.id ? "Chỉnh sửa" : "Thêm mới";
      this.isSubmit = true;
      let dataRes;
      const form = this.$refs.form_order;
      const formData = new FormData(form);
      if (!this.id) {
        dataRes = await orderService
          .create(formData)
          .then((res) => {
            if (res.data) {
              toast.success(`${msg} thành công!`, {
                position: toast.POSITION.TOP_RIGHT,
                theme: toast.THEME.COLORED,
                pauseOnHover: false,
              });
              this.$emit("success_create");
            }
          })
          .catch((err) => {
            const error = err.response.data.errors;
            Object.keys(error).forEach((er) => {
              toast.error(error[er][0], {
                position: toast.POSITION.TOP_RIGHT,
                theme: toast.THEME.COLORED,
                pauseOnHover: false,
              });
            });
          })
          .then(() => (this.isSubmit = false));
      } else {
        formData.append("id", this.id);
        dataRes = await orderService
          .update(formData)
          .then((res) => {
            if (res.data) {
              toast.success(`${msg} thành công!`, {
                position: toast.POSITION.TOP_RIGHT,
                theme: toast.THEME.COLORED,
                pauseOnHover: false,
              });
              this.$emit("success_create");
            }
          })
          .catch((err) => {
            const error = err.response.data.errors;
            Object.keys(error).forEach((er) => {
              toast.error(error[er][0], {
                position: toast.POSITION.TOP_RIGHT,
                theme: toast.THEME.COLORED,
                pauseOnHover: false,
              });
            });
          })
          .then(() => (this.isSubmit = false));
      }
    },
    openModalDelImg(id) {
      this.isOpenModalImage = true;
      this.deleteImgId = id;
    },
    clearData() {
      this.id = null;
    },
    async searchCustomer(data) {
      const term = {
        name: data,
      };
      await customerService.getDataBySelectBox(term).then((res) => {
        if (res.data.code == 200) {
          this.opt_customer = this.opt_customer.filter(
            (item) => item.value == this.selectedCustomer
          );
          this.opt_customer = res.data.data;
        }
      });
    },
    async searchProduct(data, key) {
      const term = {
        name: data,
      };
      await ingredientService.getDataProductBySelectBox(term).then((res) => {
        if (res.data.code == 200) {
          // this.opt_product[key] = this.opt_product[key].filter(
          //   (item) => item.value == this.selectedProduct
          // );
          this.opt_product[key] = res.data.data;
        }
      });
    },
    addDetail() {
      let arr = this.detail_order.filter((item) => item.id.toString().includes("tmp_"));
      let tmp_id = arr.length <= 0 ? 1 : Number(arr.pop().id.substr(4)) + 1;
      this.detail_order.push({ id: `tmp_${tmp_id}` });
    },
    removeDetailById(id) {
      if (!id) return;
      this.detail_order = this.detail_order.filter((item) => item.id != id);
    },
    totalPrice(){
      const percent_vat = Number(this.data_edit?.vat)
      const listPrice = document.querySelectorAll('[name="price[]"]')
      const listAmount = document.querySelectorAll('[name="quantity[]"]')
      let total = 0

      listAmount.forEach((item, key) => {
        let amount = Number(item.value.replaceAll('.',''))
        let priceItem = Number(listPrice[key].value.replaceAll('.',''))
        total += amount * priceItem
      })

      this.total_price = Math.ceil(total + total * percent_vat / 100)
    }
  },
};
</script>
<style lang="scss">
#form_order {
  label {
    margin: 0 !important;
  }
}
</style>
