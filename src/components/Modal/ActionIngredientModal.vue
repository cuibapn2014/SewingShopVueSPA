<template>
  <ActionBaseModal
    :is_open="is_open_modal"
    :title="title"
    @save_data="this.createOrUpdateData()"
    :is_submit="this.isSubmit"
  >
    <form id="form_ingredient" ref="form_ingredient">
      <div
        class="grid md:grid-cols-4 sm:grid-cols-1 gap-4 py-3 mb-8 bg-[#ffffff] rounded-lg dark:bg-gray-800"
      >
        <label class="block text-sm my-2">
          <span class="text-gray-700 dark:text-gray-400">Mã</span>
          <input
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            placeholder=""
            name="code"
            :value="this.data_edit?.code"
            disabled
          />
        </label>
        <label class="block text-sm my-2">
          <span class="text-gray-700 dark:text-gray-400">Tên nguyên phụ liệu<span class="text-red-500">*</span></span>
          <span class="text-red-700 dark:text-red-500 font-semibold mx-1">{{
            this.errors?.name
          }}</span>
          <input
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            placeholder="Nhập tên nguyên phụ liệu"
            name="name"
            v-model="this.data_edit.Ten"
          />
        </label>

        <AutoComplete
          name="id_ingredient_type"
          placeholder="Chọn loại"
          label="Loại"
          :options="this.opt_types"
          :selected="'Vật tư'"
          @search="this.searchIngredientType"
          :error_message="this.errors?.id_ingredient_type"
          :required="true"
          :value="1"
          :disabled="true"
        />
        <AutoComplete
          name="id_unit_cal"
          placeholder="Chọn đơn vị tính"
          label="Đơn vị tính"
          :options="this.opt_unit_cals"
          :selected="this.selectedUnitCal ?? this.data_edit?.unit_cal?.name"
          @search="this.searchUnitCal"
          :error_message="this.errors?.id_unit_cal"
          :required="true"
          :value="this.data_edit?.unit_cal?.id"
        />
        <label class="block text-sm my-2">
          <span class="text-gray-700 dark:text-gray-400">Giá</span>
          <span class="text-red-700 dark:text-red-500 font-semibold mx-1">{{
            this.errors?.price
          }}</span>
          <input
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            placeholder="Nhập giá"
            name="price"
            v-model="this.data_edit.Gia"
            @input="this.validateNumber($event, 'price')"
            @blur="this.numberToString"
            @focus="this.stringToNumber"
          />
        </label>
        <AutoComplete
          name="provider_id"
          placeholder="Chọn nhà cung cấp"
          label="Nhà cung cấp"
          :options="this.opt_providers"
          :selected="this.selectedProvider ?? this.data_edit?.provider?.name"
          @search="this.searchProvider"
          :error_message="this.errors?.iprovider_id"
          :value="this.data_edit?.provider?.id"
        />
        <label class="block my-2 text-sm">
          <span class="text-gray-700 dark:text-gray-400">Ghi chú</span>
          <textarea
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            rows="3"
            placeholder="Nhập ghi chú"
            name="note"
            v-model="this.data_edit.GhiChu"
          ></textarea>
        </label>
        <div class="upload__image block text-sm my-2 md:col-span-2">
          <label class="text-gray-700 dark:text-gray-400">Hình ảnh</label>
          <div class="flex flex-wrap my-2">
            <div v-for="item in this.data_edit?.images" :key="item.id" class="h-36 w-36 p-1 relative rounded-md overflow-hidden">
              <img :src="`${this.url}/img/${item.urlImage}`" class="img__mthumbnail w-full h-full object-cover" alt="">
              <svg @click="this.openModalDelImg(item.id)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-1 right-1 text-red-400 hover:text-red-600 duration-150 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
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
          <button
            type="button"
            @click.prevent="this.moreInputFile()"
            class="btn__add--input p-2 bg-indigo-600 rounded-lg text-white my-2 hover:bg-indigo-700 active:bg-indigo-700"
          >
            Thêm ảnh
          </button>
        </div>
      </div>
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
import { toast } from "vue3-toastify";
import UploadFile from "../UploadFile.vue";
import "../../assets/css/tailwind.output.css";
import { reactive, toRaw } from "vue";
import AutoComplete from "../AutoComplete.vue";
import ConfirmDeleteModal from "./ConfirmDeleteModal.vue"
import { providerService } from "../../services/provider.service";
import { ingredientTypeService } from "../../services/ingredientType.service";
import { imageService } from "../../services/image.service";
import { unitCalService } from "../../services/unitCal.service";
import { numberFunctions } from "../../helpers/numberFunctions";
import { config } from '../../helpers/config';
import mediumZoom from 'medium-zoom'
import { isObject } from "@vue/shared";

export default {
  components: {
    ActionBaseModal,
    UploadFile,
    AutoComplete,
    ConfirmDeleteModal
  },
  props: {
    is_open_modal: Boolean,
    id_ingredient: Number,
  },
  watch: {
    // id_ingredient: function (n, o) {
    //   if (!n) {
    //     this.title = "Thêm mới nguyên phụ liệu";
    //     this.clearData();
    //   }
    //   if (typeof n === "number") {
    //     this.title = "Chỉnh sửa nguyên phụ liệu";
    //     this.id = n;
    //     this.getDataById();
    //   }
    // },
    is_open_modal: function (n, o) {
      if (!o) {
        this.opt_providers = this.opt_types = this.opt_unit_cals = [];
        this.selectedProvider = this.selectedType = this.selectedUnitCal = null;
        this.display = [null];
        this.data_edit = {}
      }
      if (!this.id_ingredient) {
        this.title = "Thêm mới nguyên phụ liệu";
        this.clearData();
      }
      if (typeof this.id_ingredient === "number") {
        this.title = "Chỉnh sửa nguyên phụ liệu";
        this.id = this.id_ingredient;
        if(n)
        this.getDataById();
      }
    },
  },
  updated(){
        const zoom = mediumZoom(document.querySelectorAll('.img__mthumbnail'), {
            background: "rgba(0,0,0,0.5)"
        })
  },
  data() {
    return {
      title: "Thêm mới nguyên phụ liệu",
      id: null,
      data_edit: {},
      isSubmit: false,
      display: [null],
      errors: {},
      opt_providers: [],
      selectedProvider: null,
      opt_types: [],
      selectedType: null,
      opt_unit_cals: [],
      selectedUnitCal: null,
      url: config.apiUrl.split("/api")[0],
      isOpenModalImage: false,
      deleteImgId: null
    };
  },
  methods: {
    async getDataById() {
      if (this.id)
        ingredientService.findById(this.id).then((res) => {
          if (res.data) {
            const data = res.data.data;
            this.data_edit = data
            this.data_edit.Gia = this.data_edit.Gia.toLocaleString('vi')
          }
        });
    },
    async createOrUpdateData() {
      let stop = false
      Object.keys(this.errors).forEach((er) => {
        if (this.errors[er]) {
          toast.error(this.errors[er], {
            position: toast.POSITION.TOP_RIGHT,
            theme: toast.THEME.COLORED,
            pauseOnHover: false,
          });
          stop = true
        }
      });
      if(stop) return
      let msg = this.id ? "Chỉnh sửa" : "Thêm mới";
      this.isSubmit = true;
      let dataRes;
      const form = this.$refs.form_ingredient;
      const formData = new FormData(form);
      if (!this.id) {
        dataRes = await ingredientService
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
        formData.append('id', this.id)
        dataRes = await ingredientService
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
    async handleEventDeleteImage(data) {
      if (data) {
        await imageService
          .deleteById(this.deleteImgId)
          .then((res) => {
            if (res.data.msg) {
              toast.success(`Xóa hình ảnh thành công!`, {
                position: toast.POSITION.TOP_RIGHT,
                theme: toast.THEME.COLORED,
                pauseOnHover: false,
              });
              this.data_edit.images = this.data_edit?.images?.filter(item => item.id != this.deleteImgId)
              // this.$emit("success_create");
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
      this.isOpenModalImage = false;
      this.deleteImgId = null;
    },
    clearData() {
      this.id = null;
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
    async searchProvider(data) {
      const term = {
        name: data,
      };
      await providerService.getDataSelect(term).then((res) => {
        if (res.data.code == 200) {
          this.opt_providers = this.opt_providers.filter(
            (item) => item.value == this.selectedProvider
          );
          this.opt_providers = res.data.data;
        }
      });
    },
    async searchIngredientType(data) {
      const term = {
        name: data,
      };
      await ingredientTypeService.getDataSelect(term).then((res) => {
        if (res.data.code == 200) {
          this.opt_types = this.opt_types.filter(
            (item) => item.value == this.selectedType
          );
        }
      });
    },
    async searchUnitCal(data) {
      const term = {
        name: data,
      };
      await unitCalService.getDataSelect(term).then((res) => {
        if (res.data.code == 200) {
          this.opt_unit_cals = this.opt_unit_cals.filter(
            (item) => item.value == this.selectedUnitCal
          );
          this.opt_unit_cals = res.data.data;
        }
      });
    },
    validateNumber(e, property) {
      let value = e.target.value;
      let isNumber = numberFunctions.regexNumber(value);
      this.errors[property] = null;
      if (!isNumber) this.errors[property] = "Giá trị nhập không hợp lệ";
    },
    numberToString(e) {
      let value = numberFunctions.convertNumberToString(e.target.value)
      e.target.value = value
    },
    stringToNumber(e) {
      let value = numberFunctions.convertStringToNumber(e.target.value)
      e.target.value = value ? value : ''
    },
  },
};
</script>
