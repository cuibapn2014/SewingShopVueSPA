<template>
  <transition
    enter-from-class="ease-out opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="ease-in opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="isOpenModal"
      class="w-full h-full fixed top-0 left-0 z-50 flex items-center backdrop-blur-lg transition duration-150 overflow-auto"
      @keydown.escape="closeModal"
      id="backdrop-overlay"
    >
      <transition
        enter-from-class="ease-out opacity-0 transform translate-y-1/2"
        enter-to-class="opacity-100"
        leave-from-class="ease-in opacity-100"
        leave-to-class="opacity-0 transform translate-y-1/2"
      >
        <div
          v-show="isOpenModal"
          class="profile__modal w-full lg:max-w-2xl h-fit max-h-full flex flex-col bg-[#ffffff] lg:mx-auto rounded-lg p-4 z-50 shadow dark:bg-gray-800 dark:text-gray-200 duration-150"
          role="dialog"
          id="modal"
          @keydown.escape="closeModal"
        >
          <div
            class="flex items-center justify-between border-bottom border-gray-200 py-2"
          >
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Định mức ({{ this.product?.name }})
            </h2>

            <button
              class="rounded-lg text-black dark:text-gray-200"
              @click="this.closeModal()"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="max-h-full">
            <h3 class="mt-4 text-lg dark:text-gray-200 text-gray-800 font-bold">
              Định mức tiêu hao sản phẩm
            </h3>
            <form ref="form_quota">
              <div
                v-for="item in this.renderList"
                :key="item.id"
                class="flex items-center"
              >
                <AutoComplete
                  name="id_ingredient[]"
                  placeholder="Chọn nguyên vật liệu"
                  label="Nguyên vật liệu"
                  :options="this.opt_ingredient[item.id] ?? []"
                  :selected="item.ingredient?.name"
                  @search="this.searchIngredient($event, item.id)"
                  :value="item.ingredient?.id"
                  :required="true"
                />
                <label class="block text-sm my-2 mx-2">
                  <span class="text-gray-700 dark:text-gray-400"
                    >Số lượng <span class="text-red-500">*</span></span
                  >
                  <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input text-gray-800 dark:text-gray-200"
                    type="number"
                    placeholder="Nhập số lượng"
                    min="1"
                    v-model="item.amount"
                    name="amount[]"
                  />
                </label>
                <button
                  @click.prevent="this.lessQuota(item.id)"
                  type="button"
                  class="py-2 px-3 mt-6 rounded-md bg-red-500 text-white text-sm mx-2"
                >
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
                      d="M20 12H4"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <p
              v-if="this.renderList.length <= 0"
              class="text-base text-center p-2"
            >
              Chưa có định mức nào
            </p>
            <button
              @click.prevent="this.moreQuota()"
              type="button"
              class="py-2 px-3 rounded-md bg-indigo-500 text-white text-sm"
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
          <div class="flex justify-between my-3">
            <div class="text-base grow pl-2 flex flex-col">
              <div class="flex items-center justify-end text-sm">
                <button
                  type="button"
                  class="px-4 py-2 border border-gray-200 text-[#000000] dark:text-gray-200 mx-2 rounded active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                  @click="this.closeModal()"
                >
                  Đóng
                </button>
                <button
                  @click.prevent="this.createQuota()"
                  type="button"
                  class="px-4 py-2 bg-purple-600 text-white rounded active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  :class="{'cursor-not-allowed' : this.listQuota.length <= 0}"
                >
                  Cập nhật
                  <font-awesome-icon v-if="this.isSubmit" class="animate-spin"
                                    icon="fa-solid fa-circle-notch" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { quotaService } from "../../services/quota.service";
import { ingredientService } from "../../services/ingredient.service";
import AutoComplete from "../AutoComplete.vue";
import { toast } from "vue3-toastify";
export default {
  props: {
    display: Boolean,
    id_ingredient: Number,
  },
  components: {
    AutoComplete,
  },
  mounted() {
    this.isOpenModal = this.display;
  },
  updated() {
    this.isOpenModal = this.display;
  },
  watch: {
    display: async function (n, o) {
      const is_display = n;
      if (is_display) {
        this.clearData();
        await this.getDataById();
      }
    },
  },
  computed: {
    renderList() {
      return this.listQuota;
    },
  },
  data() {
    return {
      isOpenModal: false,
      isSubmit: false,
      product: {},
      listQuota: [],
      opt_ingredient: {},
      errors: {},
    };
  },
  methods: {
    closeModal() {
      this.$emit("toggle");
    },
    async getDataById() {
      if (!this.id_ingredient) return;
      const result = await quotaService
        .getListById(this.id_ingredient)
        .then((res) => {
          let data = res.data;
          this.product = data.product;
          this.listQuota = data.data;
          // this.opt_ingredient = data.ingredients;
          this.listQuota.forEach(item => {
            this.opt_ingredient[item.id] = data.ingredients
          })
        });
    },
    async searchIngredient(data, key, selected) {
      const term = {
        name: data,
      };
      await ingredientService.getDataBySelectBox(term).then((res) => {
        if (res.data.code == 200) {
          this.opt_ingredient[key] = res.data.data;
        }
      });
    },
    clearData() {
      this.product = {};
      this.listQuota = [];
      this.opt_ingredient = {};
    },
    lessQuota(id) {
      this.listQuota = this.listQuota.filter((item) => item.id !== id);
    },
    moreQuota() {
      let arr = this.listQuota.filter(item => item.id.toString().includes('tmp_'))
      let tmp_id = arr.length <= 0 ? 1 : Number(arr.pop().id.substr(4)) + 1
      this.listQuota.push({ id: `tmp_${tmp_id}` });
    },
    async createQuota(){
      if(this.isSubmit) return 
      
      this.isSubmit = true
      const form = this.$refs.form_quota
      const formData = new FormData(form)
      formData.append('id_product', this.id_ingredient)
      
      await quotaService.create(formData).then(res => {
        if(res.data.msg) 
          toast.success(res.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
              theme: toast.THEME.COLORED,
              pauseOnHover: false,
          });
          this.closeModal()
      }).catch(err => {
        let errors = err.response.data.errors
        let message = Object.entries(errors)[0][1] || "Đã xảy ra lỗi!"
        toast.error(message, {
              position: toast.POSITION.TOP_RIGHT,
              theme: toast.THEME.COLORED,
              pauseOnHover: false,
          });
      }).finally(() => this.isSubmit = false)
    }
  },
};
</script>
<style scoped></style>
