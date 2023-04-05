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
                <div class="mt-4 mb-6">
                    <!-- Modal title -->
                    <p class="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {{ title }}
                    </p>
                    <!-- Modal description -->
                    <slot></slot>
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
          ">
                    <button class="
              w-full
              px-5
              py-5
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
            <button @click.prevent="this.save()" class="mt-4 text-white px-4 py-2 rounded-lg border-0 bg-indigo-600 hover:bg-indigo-700 duration-150">
                <font-awesome-icon v-if="is_submit" class="animate-spin"
                                    icon="fa-solid fa-circle-notch" />
                Lưu
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
        is_open: Boolean,
        title: String,
        create_data: Function,
        is_submit: Boolean
    },  
    watch: {
        is_open: function (n, o) {
            this.isOpenModal = n
        }
    },
    created(){
        window.addEventListener('keydown', e => {
            if(e.key.toLocaleLowerCase() === 'escape' && this.is_open)
                this.closeModal()
        })
    },
    data(){
        return {
            isOpenModal: this.is_open
        }
    },
    methods: {
        closeModal(){
            this.isOpenModal = !this.isOpenModal
            this.$emit('togglemodal', this.isOpenModal)
        },
        save(){
            if(!this.is_submit)
                this.$emit('save_data')
        }
    }
}
</script>