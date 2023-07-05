<template>
  <ActionBaseModal
    :is_open="is_open_modal"
    :title="title"
    @save_data="this.createOrUpdateData()"
    :is_submit="this.isSubmit"
  >
    <form id="form_production_suggest" ref="form_production_suggest">
      <div class="grid lg:grid-cols-4 gap-4 items-start">
        <AutoComplete
          name="detail_order_id"
          placeholder="Chọn đơn hàng"
          label="Đơn hàng"
          class="col-span-2"
          :options="this.opt_detail_order"
          :selected="this.selectedDetailOrder ?? this.detail_txt"
          @search="this.searchDetailOrder"
          :error_message="this.errors?.detail_order_id"
          :required="true"
          :value="this.data_edit?.detail_order?.id"
          :allow_clear="true"
        />
            <label class="block text-sm my-2">
                <span class="text-gray-700 dark:text-gray-400">Mã đề nghị</span>
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Nhập mã đề nghị"
                    :value="this.data_edit?.code ?? ''"
                    disabled
                    readonly />
                <span class="text-red-500 pt-2"></span>
            </label>
            <label class="block text-sm my-2">
                <span class="text-gray-700 dark:text-gray-400">Mức độ ưu tiên<span class="text-red-500">*</span></span>
                <select class="
                block
                w-full
                mt-1
                text-sm
                dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
                form-select
                focus:border-purple-400
                focus:outline-none
                focus:shadow-outline-purple
                dark:focus:shadow-outline-gray
                mb-1
              " name="priority" id="priority" aria-placeholder="Chọn mức độ ưu tiên" v-model="this.data_edit.priority">
                    <option value="0">Thấp</option>
                    <option value="1">Bình thường</option>
                    <option value="2">Cao</option>
                </select>
            </label>
        </div>
        <div class="upload__image block text-sm mb-3">
            <label class="text-gray-700 dark:text-gray-400">Hình ảnh</label>
            <div v-if="this.data_edit?.image && !this.data_edit?.image?.includes('placeholder')" class="flex flex-wrap my-2">
              <div class="h-24 w-24 p-1 relative rounded-md overflow-hidden">
                <img :src="`${this.url}/img_product/${this.data_edit?.image}`" class="img__mthumbnail w-full h-full object-cover" alt="">
              </div>
            </div>
              <upload-file
              v-for="(item, index) in this.display"
              :img_file="this.setTempImg(item)"
              :key="index"
              :pk_number="index"
              @change_image="this.handleChangeImage"
              @less_input_file="this.lessInputFile(index)"
            ></upload-file>
            <!-- <button
              type="button"
              @click.prevent="this.moreInputFile()"
              class="btn__add--input p-2 bg-indigo-600 rounded-lg text-white my-2 hover:bg-indigo-700 active:bg-indigo-700"
            >
              Thêm ảnh
          </button> -->
        </div>
        <AutoComplete
          name="id_product"
          class="col-span-3"
          placeholder="Chọn sản phẩm"
          label="Sản phẩm"
          :options="this.opt_product ?? []"
          :selected="this.selectedProduct ?? this.data_edit?.product?.Ten"
          @search="this.searchProduct($event)"
          :error_message="this.errors?.id_product"
          :required="true"
          :value="this.data_edit?.product?.id"
          :allow_clear="false"
        />
        <div class="flex">
            <label class="block text-sm my-2">
                <span class="text-gray-700 dark:text-gray-400">Kích thước</span>
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Nhập kích thước" name="size" v-model="this.data_edit.size" />
            </label>
            <label class="block text-sm my-2 mx-2">
                <span class="text-gray-700 dark:text-gray-400">Màu sắc</span>
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Nhập màu sắc" name="color" v-model="this.data_edit.color" />
            </label>
            <label class="block text-sm my-2">
                <span class="text-gray-700 dark:text-gray-400">Số lượng <span class="text-red-500">*</span></span>
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" placeholder="Nhập số lượng" min="1" v-model="this.data_edit.amount" name="amount" />
                <span class="text-red-500 pt-2"></span>
            </label>
        </div>
        <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">Ghi chú</span>
            <textarea
                class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                rows="3" placeholder="Nhập ghi chú" name="note" v-model="this.data_edit.note"></textarea>
        </label>
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
import { productionRequestService } from "../../services/productionRequest.service";
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
import NumberInput from "../NumberInput.vue";
import { orderService } from '../../services/order.service';

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
    id_production_request: Number,
  },
  watch: {
    is_open_modal: function (n, o) {
      if (!o) {
        this.opt_customer = []
        this.opt_product = this.opt_detail_order = []
        this.selectedCustomer = this.selectedProduct = this.selectedDetailOrder = null;
        this.display = [null];
        this.data_edit = {};
      }
      if (!this.id_production_request) {
        this.title = "Thêm mới đề nghị sản xuất";
        this.clearData();
      }
      if (typeof this.id_production_request === "number") {
        this.title = "Chỉnh sửa đề nghị sản xuất";
        this.id = this.id_production_request;
        if (n) this.getDataById();
      }
    },
  },
  computed: {
    detail_txt(){
      let data = this.data_edit
      const code = data?.detail_order?.order?.code
      const product = data?.detail_order?.product?.Ten
      const customer = data?.detail_order?.order?.customer?.name
      return `${code} - ${product} - KH: ${customer}`
    }
  },
  data() {
    return {
      title: "Thêm mới đề nghị sản xuất",
      id: null,
      data_edit: {},
      isSubmit: false,
      display: [null],
      errors: {},
      opt_customer: [],
      opt_product: [],
      opt_detail_order: [],
      selectedCustomer: null,
      selectedProduct: null,
      selectedDetailOrder: null,
      url: config.apiUrl.split("/api")[0],
      isOpenModalImage: false,
      deleteImgId: null,
    };
  },
  methods: {
    async getDataById() {
      if (this.id)
        await productionRequestService.findById(this.id).then(async (res) => {
          if (await res.data) {
            const data = await res.data.data;
            this.data_edit = data;
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
      const form = this.$refs.form_production_suggest;
      const formData = new FormData(form);
      if (!this.id) {
        dataRes = await productionRequestService
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
        dataRes = await productionRequestService
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
    async searchProduct(data) {
      const term = {
        name: data,
      };
      await ingredientService.getDataProductBySelectBox(term).then((res) => {
        if (res.data.code == 200) {
          this.opt_product = res.data.data;
        }
      });
    },
    async searchDetailOrder(data) {
      const term = {
        name: data,
      };
      await orderService.getDataOrderBySelectBox(term).then((res) => {
        if (res.data.code == 200) {
          this.opt_detail_order = res.data.data;
        }
      });
    },
    moreInputFile() {
      this.display.push(null);
    },
    lessInputFile(index) {
      delete this.display[index];
      let newArr = [];
      this.display.map((item) => {
        newArr.push(item);
      });
      this.display = newArr;
    },
    handleChangeImage(data) {
      this.display[data.key] = data;
      let lastIndex = this.display.length - 1;
      if (data.key == lastIndex) this.display.push(null);
    },
    setTempImg(_file) {
      if (!_file) return null;

      const file = toRaw(reactive(_file));
      if (file && file.img) {
        return file.img;
      } else return null;
    },
  },
};
</script>
<style lang="scss">
</style>
