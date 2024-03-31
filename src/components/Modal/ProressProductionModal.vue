<template>
    <transition enter-from-class="ease-out opacity-100" enter-to-class="opacity-100" leave-from-class="ease-in opacity-100"
    leave-to-class="opacity-100">
    <div v-show="this.isOpenModal" class="
        fixed
        inset-0
        z-30
        flex
        items-end
        transition duration-300
        bg-opacity-50
        sm:items-center sm:justify-center
      " id="backdrop-overlay" @keydown.esc="this.closeModal()">
        <transition enter-from-class="ease-out opacity-100 translate-y-full" enter-to-class="opacity-100"
            leave-from-class="ease-in opacity-100" leave-to-class="opacity-100 translate-y-full">
            <!-- Modal -->
            <div v-show="this.isOpenModal" class="
          w-full
          px-6
          py-4
          overflow-hidden
          bg-[#ffffff]
          rounded-t-lg
          duration-300
          dark:bg-gray-800
          h-screen
          relative
          flex flex-col
        " role="dialog" id="modal">
                <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. -->
                <header class="flex justify-end">
                    <button class="
              inline-flex
              items-center
              justify-center
              w-6
              h-6
              text-gray-400
              transition-colors
              duration-150
              rounded
              dark:hover:text-gray-200
              hover: hover:text-gray-700
            " aria-label="close" @click="this.closeModal()">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" role="img" aria-hidden="true">
                            <path
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" fill-rule="evenodd"></path>
                        </svg>
                    </button>
                </header>
                <!-- Modal body -->
                <div class="mt-4 mb-6 pb-28 h-full overflow-y-auto overflow-x-visible">
                    <!-- Modal title -->
                    <p class="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Tiến độ sản xuất
                        <span v-if="this.data?.code" class="inline px-2 mx-1 rounded-sm  bg-indigo-500 text-white text-lg">{{ this.data?.code }}</span>
                    </p>
                    <!-- Modal description -->
                    <transition enter-from-class="opacity-0" enter-to-class="opacity-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <div
                        v-show="!this.data.code"
                        class="transition ease-in duration-300 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-80 bg-opacity-80 w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center"
                        >
                        <font-awesome-icon
                            class="animate-spin w-[4rem] h-[4rem] text-indigo-500"
                            icon="fa-solid fa-circle-notch"
                        />
                        </div>
                    </transition>
                    <div v-for="production in this.productions" :key="production.id"
                        class="grid grid-cols-5 gap-x-2 gap-y-4 my-3 px-0 w-full">
                        <div class="dark:text-gray-200 h-8 overflow-hidden text-ellipsis whitespace-nowrap py-1"
                            v-tooltip="production.product.name + ' - ' + production.product.stage_product.name">{{
                            production.product.name + ' - ' + production.product.stage_product.name }}</div>
                        <div class="col-span-4 bg-gray-300 rounded-md overflow-hidden">
                            <p v-if="this.calPerProgress(production) <= 0" class="h-8 py-1 text-center">0%</p>
                                <div v-if="this.calPerProgress(production) > 0" class="h-8 bg-indigo-500 text-center text-white py-1 duration-150 ease-in delay-150" :style="'width:' + this.calPerProgress(production) + '%'"
                               >{{ this.calPerProgress(production).toFixed(2).replace('.00', '') }}%</div>                      
                        </div>
                    </div>
                    <p v-if="this.productions?.length <= 0" class="text-center dark:text-gray-200 my-4 px-2">Không có dữ liệu</p>
                </div>
                <footer class="
            flex flex-col
            items-center
            justify-end
            px-6
            py-10
            -mx-6
            -mb-4
            space-y-4
            sm:space-y-0 sm:space-x-6 sm:flex-row
            bg-gray-50
            dark:bg-gray-800
            absolute bottom-0
            w-full
            z-50
          ">
                    <button class="
              w-full
              px-4
              py-3
              text-sm
              font-medium
              leading-5
              text-gray-700
              transition-colors
              duration-150
              border border-gray-300
              rounded-lg
              dark:text-gray-400
              sm:px-4 sm:py-2 sm:w-auto
              active:bg-transparent
              hover:border-gray-500
              focus:border-gray-500
              active:text-gray-500
              focus:outline-none focus:shadow-outline-gray
            " @click="this.closeModal()">
                        Đóng
                    </button>
            <!-- <button @click.prevent="this.save()" class="w-full text-white leading-5 py-3 sm:w-auto px-4 sm:py-2 rounded-lg border-0 bg-indigo-600 hover:bg-indigo-700 duration-150">
                <font-awesome-icon v-if="is_submit" class="animate-spin"
                                    icon="fa-solid fa-circle-notch" />
                Lưu
            </button> -->
                </footer>
            </div>
        </transition>
    </div>

</transition>
</template>
<script>
import { productionRequestService } from '../../services/productionRequest.service'
export default {
    props: {
        is_open: Boolean,
        id_production_request: Number
    },  
    watch: {
        is_open: async function (n, o) {
            this.isOpenModal = n
            if(n) await this.getDataById()
            else {
                this.productions = []
                this.data = {}
            }
        }
    },
    created(){
        window.addEventListener('keydown', e => {
            if(e.key && e.key.toLocaleLowerCase() === 'escape' && this.is_open)
                this.closeModal()
        })
    },
    data(){
        return {
            isOpenModal: this.is_open,
            productions: [],
            data: {}
        }
    },
    methods: {
        async getDataById(){
            let id = await this.id_production_request
            if(!id) return
            await productionRequestService.showDataProgress(id).then(async (res) => {
                this.data = await res.data.data
                this.productions = await this.data.productions
            }).catch(err => {
                // console.log(err)
            })
        },
        closeModal(){
            this.isOpenModal = !this.isOpenModal
            this.$emit('togglemodal', this.isOpenModal)
        },
        calPerProgress(obj){
            let total = obj.require_total
            let produceds = obj.produceds
            let totalProduced = 0
            produceds?.map(item => {
                totalProduced += item.amount
            })

            return (totalProduced / total) * 100
        }
    }
}
</script>