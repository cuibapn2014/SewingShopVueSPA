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
      <label class="block text-sm my-1">
        <span class="text-gray-700 dark:text-gray-400"
          >Tên nhà cung cấp <span class="text-red-500">*</span></span
        >
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          placeholder="Nhập tên nhà cung cấp"
          name="name"
          v-model="this.name"
        />
      </label>
      <label class="block text-sm my-1">
        <span class="text-gray-700 dark:text-gray-400"
          >Số điện thoại <span class="text-red-500">*</span></span
        >
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          type="text"
          name="phone_number"
          placeholder="XXXXXXXXXX"
          v-model="this.phone_number"
        />
      </label>
      <label class="block text-sm my-1">
        <span class="text-gray-700 dark:text-gray-400">Địa chỉ</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          name="address"
          placeholder="Nhập địa chỉ"
          v-model="this.address"
        />
      </label>
      <label class="block text-sm my-1">
        <span class="text-gray-700 dark:text-gray-400">Trạng thái</span>
        <select
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          name="status"
          id="status"
          v-model="this.status"
        >
          <option value="1">Đang hợp tác</option>
          <option value="2">Ngưng hợp tác</option>
        </select>
      </label>
      <label class="block my-1 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Ghi chú</span>
        <textarea
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          rows="3"
          placeholder="Nhập ghi chú"
          name="note"
          v-model="this.note"
        ></textarea>
      </label>
    </div>
  </ActionBaseModal>
</template>
<script>
import ActionBaseModal from "./ActionBaseModal.vue";
import { providerService } from "../../services/provider.service";
import { toast } from "vue3-toastify";

export default {
  components: {
    ActionBaseModal,
  },
  props: {
    is_open_modal: Boolean,
    id_provider: Number,
  },
  watch: {
    id_provider: function (n, o) {
      if (!n) {
        this.title = "Thêm mới nhà cung cấp";
        this.clearData();
      }
      if (typeof n === "number") {
        this.title = "Chỉnh sửa nhà cung cấp";
        this.id = n;
        this.getDataById();
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
    };
  },
  methods: {
    async getDataById() {
      if (this.id)
        providerService.findById(this.id).then((res) => {
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
        dataRes = await providerService
          .create(data)
          .then((res) => {
            if (res.data) {
              toast.success(`${msg} thành công!`, {
                position: toast.POSITION.TOP_RIGHT,
                theme: toast.THEME.COLORED,
                pauseOnHover: false,
              });
              this.clearData()
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
        dataRes = await providerService
          .update(data)
          .then((res) => {
            if (res.data) {
              toast.success(`${msg} thành công!`, {
                position: toast.POSITION.TOP_RIGHT,
                theme: toast.THEME.COLORED,
                pauseOnHover: false,
              });
              this.clearData()
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
  },
};
</script>
