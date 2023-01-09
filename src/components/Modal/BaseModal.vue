<template>
    <transition enter-from-class="ease-out opacity-0" enter-to-class="opacity-100"
        leave-from-class="ease-in opacity-100" leave-to-class="opacity-0">
        <div v-show="isOpenModal" class="
        fixed
        inset-0
        flex
        items-end
        transition duration-150
        bg-black bg-opacity-50
        sm:items-center sm:justify-center
      " id="backdrop-overlay" @click="closeModal" @keydown.escape="closeModal">
            <transition enter-from-class="ease-out opacity-0 transform translate-y-1/2" enter-to-class="opacity-100"
                leave-from-class="ease-in opacity-100" leave-to-class="opacity-0 transform translate-y-1/2">
                <!-- Modal -->
                <div v-show="isOpenModal" class="
          w-full
          px-6
          py-4
          overflow-hidden
          bg-[#ffffff]
          rounded-t-lg
          duration-150
          dark:bg-gray-800
          sm:rounded-lg sm:m-4 sm:max-w-xl
        " role="dialog" id="modal" @click.stop="" @keydown.escape="closeModal">
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
            " aria-label="close" @click="closeModal">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" role="img" aria-hidden="true">
                                <path
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" fill-rule="evenodd"></path>
                            </svg>
                        </button>
                    </header>
                    <!-- Modal body -->
                    <div class="mb-6">
                        <!-- Modal title -->
                        <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                            {{ title }}
                        </p>
                        <!-- Modal description -->
                        <!-- <p class="text-sm text-gray-700 dark:text-gray-400">
                            Bạn có chắc chắn muốn xóa đơn hàng này ?
                        </p> -->
                        <slot></slot>
                    </div>
                    <footer class="
            flex flex-col
            items-center
            justify-end
            px-6
            py-3
            -mx-6
            -mb-4
            space-y-4
            sm:space-y-0 sm:space-x-6 sm:flex-row
            bg-gray-50
            dark:bg-gray-800
          ">
                        <button class="
              w-full
              px-5
              py-3
              text-sm
              font-medium
              leading-5
              text-white
              transition-colors
              duration-150
              bg-purple-600
              border border-transparent
              rounded-lg
              sm:w-auto sm:px-4 sm:py-2
              active:bg-purple-600
              hover:bg-purple-700
              focus:outline-none focus:shadow-outline-purple
            ">
                            {{ txt_accept || "Chắc chắn" }}
                        </button>
                        <button @click.prevent="closeModal" class="
              w-full
              px-5
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
            " type="button">
                            Hủy bỏ
                        </button>
                    </footer>
                </div>
            </transition>
        </div>

    </transition>
</template>
<script>
export default {
    props: {
        title: String,
        display: Boolean,
        txt_accept: String
    },
    updated() {
        this.isOpenModal = this.display
    },
    data() {
        return {
            isOpenModal: this.display,
            user: null
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-base-modal')
        }
    }
}
</script>
<style scoped>

</style>