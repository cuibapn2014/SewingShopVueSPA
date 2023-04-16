<template>
  <ActionBaseModal
    :is_open="is_open_modal"
    :title="title"
    @save_data="this.createOrUpdateData()"
    :is_submit="this.isSubmit"
  >
    <div
      class="grid md:grid-cols-4 sm:grid-cols-1 gap-4 py-3 mb-8 bg-[#ffffff] rounded-lg dark:bg-gray-800"
    >
      <label class="block text-sm my-2">
        <span class="text-gray-700 dark:text-gray-400">Mã</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          placeholder=""
          name="code"
        />
      </label>
      <label class="block text-sm my-2">
        <span class="text-gray-700 dark:text-gray-400">Tên</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          placeholder="Nhập tên thành phẩm"
          name="name"
        />
      </label>

      <label class="block text-sm my-2">
        <span class="text-gray-700 dark:text-gray-400">Loại</span>
        <select
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          name="id_ingredient_type"
          id="id_ingredient_type"
          aria-placeholder="Chọn đơn loại"
        >
          <option value="">-- Chọn loại --</option>
        </select>
      </label>
      <!-- @if($current == 5) -->
      <label class="block text-sm my-2">
                    <span class="text-gray-700 dark:text-gray-400">Công đoạn</span>
                    <select class=" block
                    w-full
                    mt-1
                    text-sm
                    dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
                    form-select
                    focus:border-purple-400
                    focus:outline-none
                    focus:shadow-outline-purple
                    dark:focus:shadow-outline-gray" name="stage" id="stage" aria-placeholder="Chọn công đoạn">
                    <option value="">-- Chọn công đoạn --</option>
                    <option value="1" selected>Cắt</option>
                    <option value="2">Bán thành phẩm</option>
                    <option value="3">Hoàn thiện</option>
                    <option value="4">Là ủi</option>
                </select>
                </label>
      <!-- @endif -->
      <label class="block text-sm my-2">
        <span class="text-gray-700 dark:text-gray-400">Đơn vị tính</span>
        <select
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          name="id_unit"
          id="id_unit"
          aria-placeholder="Chọn đơn vị tính"
        >
          <option value="">-- Chọn đơn vị tính --</option>
        </select>
      </label>
      <label class="block text-sm my-2">
        <span class="text-gray-700 dark:text-gray-400">Giá</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          placeholder="Nhập giá"
          name="price"
        />
      </label>
      <AutoComplete
        :placeholder="'Chọn nhà cung cấp'"
        :label="'Nhà cung cấp'"
        :options="this.opt_providers"
        :selected="this.selectedProvider"
        @search="this.searchProvider"
      />
      <label class="block my-2 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Ghi chú</span>
        <textarea
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          rows="3"
          placeholder="Nhập ghi chú"
          name="note"
        ></textarea>
      </label>
      <div class="upload__image block text-sm my-2 md:col-span-2">
        <label class="text-gray-700 dark:text-gray-400">Hình ảnh</label>
        <upload-file
          v-for="(item, index) in this.display"
          :img_file="this.setTempImg(item)"
          :key="index"
          :pk_number="index"
          @change_image="this.handleChangeImage"
          @less_input_file="this.lessInputFile(index)"
        ></upload-file>
        <button type="button" @click.prevent="this.moreInputFile()" class="btn__add--input p-2 bg-indigo-600 rounded-lg text-white my-2 hover:bg-indigo-700 active:bg-indigo-700"
                >Thêm ảnh</button>
      </div>
    </div>
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
import { providerService } from "../../services/provider.service";

export default {
  components: {
    ActionBaseModal,
    UploadFile,
    AutoComplete,
  },
  props: {
    is_open_modal: Boolean,
    id_ingredient: Number,
  },
  watch: {
    id_ingredient: function (n, o) {
      if (!n) {
        this.title = "Thêm mới nguyên phụ liệu";
        this.clearData();
      }
      if (typeof n === "number") {
        this.title = "Chỉnh sửa nguyên phụ liệu";
        this.id = n;
        this.getDataById();
      }
    },
    is_open_modal: function (n, o) {
      if (!o) {
        this.opt_providers = [];
        this.selectedProvider = null;
        this.display = [null]
      }
    },
  },
  data() {
    return {
      title: null,
      id: null,
      name: null,
      phone_number: null,
      address: null,
      note: null,
      status: 1,
      isSubmit: false,
      display: [null],
      opt_providers: [],
      selectedProvider: null,
    };
  },
  methods: {
    async getDataById() {
      if (this.id)
        ingredientService.findById(this.id).then((res) => {
          if (res.data) {
            const data = res.data.data;
            this.id = data.id;
            this.name = data.name;
            this.phone_number = data.phone_number;
            this.address = data.address;
            this.status = data.status;
            this.note = data.note;
          }
        });
    },
    async createOrUpdateData() {
      const data = {
        id: this.id,
        name: this.name,
        phone_number: this.phone_number,
        address: this.address,
        note: this.note,
        status: this.status,
      };
      let msg = this.id ? "Chỉnh sửa" : "Thêm mới";
      this.isSubmit = true;
      let dataRes;
      if (!this.id) {
        dataRes = await ingredientService
          .create(data)
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
        dataRes = await ingredientService
          .update(data)
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
    clearData() {
      this.id = null;
      this.name = null;
      this.phone_number = null;
      this.address = null;
      this.note = null;
      this.status = 1;
    },
    moreInputFile(){
      this.display.push(null)
    },
    lessInputFile(index) {
      delete this.display[index]
      let newArr = []
      this.display.map(item => {
        newArr.push(item)
      })
      this.display = newArr
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
  },
};
</script>
