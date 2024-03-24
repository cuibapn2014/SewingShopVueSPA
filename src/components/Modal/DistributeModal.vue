<template>
  <transition
    enter-from-class="ease-out opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="ease-in opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="this.isModalOpen"
      class="fixed inset-0 z-[60] flex items-end transition duration-150 bg-black bg-opacity-50 sm:items-center sm:justify-center"
      id="backdrop-overlay"
      @click="this.closeModal()"
    >
      <transition
        enter-from-class="ease-out opacity-0 transform translate-y-1/2"
        enter-to-class="opacity-100"
        leave-from-class="ease-in opacity-100"
        leave-to-class="opacity-0 transform translate-y-1/2"
      >
        <!-- Modal -->
        <div
          v-show="this.isModalOpen"
          class="w-full px-6 py-4 overflow-hidden bg-[#ffffff] rounded-t-lg duration-150 dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
          role="dialog"
          id="modal"
          @click.stop=""
        >
          <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. -->
          <header class="flex justify-end">
            <button
              class="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
              aria-label="close"
              @click="this.closeModal()"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </header>
          <!-- Modal body -->
          <div class="mt-4 mb-6">
            <!-- Modal title -->
            <p
              class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
            >
              Phân bổ sản phẩm
              <span v-if="this.data.code" class="inline px-2 mx-1 rounded-sm  bg-indigo-500 text-white text-lg">{{ this.data.code }}</span>
            </p>
            <!-- Modal description -->
            <p class="text-sm text-gray-700 dark:text-gray-900 bg-yellow-400 p-2 rounded-md">
              Sản phẩm: 
              <strong class="text-base font-bold">
                {{ this.data && this.data.product?.Ten }}
              </strong><br/>
              Số lượng cần: {{ this.data.amount?.toLocaleString('vi') }} {{ this.data.product?.unit_cal?.name }}<br/>
              Tồn kho: {{ this.data &&
                        this.data.product?.amount.toLocaleString('vi') + ' ' +
                        this.data.product?.unit_cal?.name }}
            </p>
            <label class="block text-sm my-2">
                <span class="text-gray-700 dark:text-gray-400">Số lượng phân bổ (Chọn tối đa {{ this.data &&
                    (this.data.product?.amount +
                    this.data.completed).toLocaleString('vi') + ' ' +
                    this.data.product?.unit_cal?.name }})</span>
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" min="0" id="completed"
                    v-model="this.amount"
                    :max="this.data.product?.amount + this.data.completed"
                    autofocus>
            </label>
            <div v-if="this.remind.length > 0" class="flex flex-wrap">
              <span v-for="num in this.remind" :key="num" 
                @click="this.applyRemind(num)"
                :class="{'bg-indigo-500 text-white cursor-default' : this.amount === num}"
                class="block cursor-pointer select-none py-1 mb-2 px-2 border dark:text-gray-200 hover:dark:text-white hover:bg-indigo-500 hover:text-white mr-2 rounded-full text-sm transition ease-in duration-150">
                {{ num }} {{ this.data.product?.unit_cal?.name }}
              </span>
            </div>
          </div>
          <div class="flex p-2 text-gray-700 items-center bg-gray-200 rounded-md mb-2 flex-nowrap overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" v-tooltip="'Lưu ý'">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="mx-1 text-sm">Bạn sẽ không thể cập nhật phân bổ khi ở trạng thái là Đang sản xuất</span>
          </div>
          <footer
            class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
          >          
            <button
              @click="this.closeModal()"
              class="w-full px-5 py-3 text-sm font-medium leading-5 border text-gray-700 transition-colors duration-150border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
            >
              Hủy bỏ
            </button>
            <button
              class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              @click="this.handleSubmit()"
            >
              Phân bổ
            </button>
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { toast } from 'vue3-toastify';
import { productionRequestService } from '../../services/productionRequest.service';

export default {
  name: "DistributeModal",
  props: {
    is_open: Boolean,
    id_production_request: Number
  },
  watch: {
    is_open: async function (n, o) {
      this.isModalOpen = n;
      if(n) await this.getDataById()
    },
  },
  created(){
    window.addEventListener('keydown', e => {
            if(e.key && e.key.toLocaleLowerCase() === 'escape' && this.is_open)
                this.closeModal()
        })
  },
  data() {
    return {
      isModalOpen: false,
      data: {},
      amount: 0,
      remind: [] 
    };
  },
  methods: {
    async getDataById() {
      let id = await this.id_production_request
      if (id)
        await productionRequestService.findById(id).then(async (res) => {
          if (await res.data) {
            const data = await res.data.data;
            this.data = data;
            this.amount = this.data.completed
            this.addRemind()
          }
        });
    },
    closeModal() {
      this.$emit("close", false);
    },
    async handleSubmit() {
      if(!this.id_production_request || this.amount === '') return
      const data = {}
      data.idRequest = this.id_production_request
      data.idIngredient = this.data.product?.id
      data.completed = this.amount
      await productionRequestService.updateCompleted(data)
      .then(res => {
        if(res.data.msg){
          toast.success(res.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
              theme: toast.THEME.COLORED,
              pauseOnHover: false,
          });
        }
      })
      .catch(err => {
        toast.error('Oops! Đã xảy ra lỗi', {
              position: toast.POSITION.TOP_RIGHT,
              theme: toast.THEME.COLORED,
              pauseOnHover: false,
          });
      })
      this.$emit("success", false);
    },
    addRemind(){
      const total = this.data.product?.amount + this.data.completed
      const length = 10
      for(let i = 1;i <= length;i++) {
        if(Math.ceil(total/i) > 0)
        this.remind.push(Math.ceil(total/i))
      }
      this.remind = [...new Set(this.remind)].sort((a, b) => a - b)
    },
    applyRemind(amount){
      if(amount === this.amount) return
      this.amount = Number.isNaN(Number(amount)) ? 0 : Number(amount)
    }
  },
};
</script>
