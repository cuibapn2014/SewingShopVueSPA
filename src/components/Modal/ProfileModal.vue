<template>
    <form @submit.prevent="handleUpdate()">
        <BaseModal title="Hồ sơ cá nhân" :txt_accept="'Lưu thay đổi'" :display="this.isShowModal" @close-base-modal="closeModal">
            <div class="flex justify-between my-3">
                <label for="image" class="cursor-pointer h-fit rounded-full relative overflow-hidden">
                    <img :src="basePath + 'img/user/' + user?.image"
                        class="h-24 w-24 border rounded-full object-cover object-center" alt="" />
                    <div v-if="isChange"
                        class="absolute w-full h-full bg-black bg-opacity-50 top-0 flex items-center justify-center">
                        <font-awesome-icon class="animate-spin w-7 h-7 text-indigo-500"
                            icon="fa-solid fa-circle-notch" />
                    </div>
                    <input id="image" type="file" class="hidden" @change="handleImageChange" accept="image/*" />
                </label>
                <div class="text-base grow pl-2 flex flex-col">
                    <label class="mb-1 text-gray-800 dark:text-gray-200">
                        <span>Tên của bạn</span>
                        <span class="text-sm text-red-500 w-full mx-2">{{ validated.name }}</span>
                        <input class="
                block
                w-full
                mt-1
                text-sm
                dark:border-gray-600 dark:bg-gray-700
                focus:border-purple-400
                focus:outline-none
                focus:shadow-outline-purple
                dark:text-gray-300 dark:focus:shadow-outline-gray
                form-input
              " type="text" v-model="user.name" placeholder="Nhập tên của bạn"/>
                    </label>
                    <label class="my-1 text-gray-800 dark:text-gray-200">
                        <span>Số điện thoại</span>
                        <span class="text-sm text-red-500 w-full mx-2">{{ validated.phone }}</span>
                        <input class="
                block
                w-full
                mt-1
                text-sm
                dark:border-gray-600 dark:bg-gray-700
                focus:border-purple-400
                focus:outline-none
                focus:shadow-outline-purple
                dark:text-gray-300 dark:focus:shadow-outline-gray
                form-input
              " type="text" v-model="user.phone" placeholder="Nhập số điện thoại"/>
                    </label>
                    <label class="my-1 text-gray-800 dark:text-gray-200">
                        <span>Email</span>
                        <input class="
                block
                w-full
                mt-1
                text-sm
                dark:border-gray-600 dark:bg-gray-700
                focus:border-purple-400
                focus:outline-none
                focus:shadow-outline-purple
                dark:text-gray-300 dark:focus:shadow-outline-gray
                disabled:bg-gray-200
                dark:disabled:bg-gray-700
                form-input
              " type="text" disabled v-model="user.email" />
                    </label>
                    <p class="mt-2 text-gray-800 dark:text-gray-200">Quyền: {{ user.role?.name || "" }} </p>
                    <p v-if="isChangeInfo"
                        class="flex items-center mt-2 bg-orange-200 text-orange-600 rounded-md text-sm p-2 dark:text-orange-200 dark:bg-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="w-5 h-5 mr-1">
                            <path fill-rule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clip-rule="evenodd" />
                        </svg>

                        Lưu ý: Chưa lưu thay đổi
                    </p>
                </div>
            </div>
            <div class="flex items-center justify-between bg-gray-200 rounded-lg p-2">
                <p class="text-sm text-[#000000] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd" />
                    </svg>
                    Nhấp vào ảnh để cập nhật ảnh của bạn
                </p>
            </div>
        </BaseModal>
    </form>
</template>
<script>
import { toast } from 'vue3-toastify';
import BaseModal from './BaseModal.vue';
import { mapGetters } from 'vuex';
export default {
    created() {
        this.current_user = {
            name: this.user?.name,
            phone: this.user?.phone
        }
        this.user = this.userInStore
    },
    computed: {
        ...mapGetters('account', {
            userInStore: 'getUser'
        }),
    },
    watch: {
        'user.name'(newObj, oldObj) {
            this.validateForm()
            if (newObj != this.current_user.name) {
                this.isChangeInfo = true
            } else
                this.isChangeInfo = false
        },
        'user.phone'(newObj, oldObj) {
            this.validateForm()
            if (newObj != this.current_user.phone) {
                this.isChangeInfo = true
            } else
                this.isChangeInfo = false
        }
    },
    components: { BaseModal },
    props: {
        display: Boolean
    },
    updated(){
        this.isShowModal = this.display
        this.user = this.userInStore
    },
    data() {
        return {
            isShowModal: false,
            isChange: false,
            basePath: this.$store.getters.getBaseUrl,
            isChangeInfo: false,
            current_user: {},
            validated: {
                name: "",
                phone: ""
            },
            user: null
        }
    },
    methods: {
        openModal() {
            this.isShowModal = true
        },
        async handleImageChange(e) {
            this.isChange = true
            let dataImage = new FormData();

            dataImage.append("image", e.target.files[0]);
            await this.$store.dispatch('account/update_avatar', dataImage).then(() => {
                toast.success("Cập nhật ảnh thành công !", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: toast.THEME.COLORED,
                })
                this.isShowModal = false
                this.isChange = false
            })
        },
        async handleUpdate() {
            if (!this.validateForm())
                return

            let data = {
                name: this.user.name,
                phone: this.user.phone
            }

            if (this.isChangeInfo){
                await this.$store.dispatch('account/update_user', data).then((res) => {
                    toast.success("Cập nhật thông tin thành công !", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: toast.THEME.COLORED,
                        pauseOnHover: false
                    })
                    this.current_user.name = this.user.name
                    this.current_user.phone = this.user.phone
                    this.isChangeInfo = false
                    this.closeModal()
                }).catch(err => {
                    const error = JSON.parse(err.response.data)
                    this.validated.name = error.name && error.name[0] || ""
                    this.validated.phone = error.phone[0] && error.phone[0] || ""
                    toast.error("Xảy ra lỗi, vui lòng kiểm tra lại", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: toast.THEME.COLORED,
                        pauseOnHover: false
                    })
                })
            }else{
                this.closeModal()
            }
        },
        validateForm() {
            this.validated.name = this.user?.name == "" ? "Không được để trống" : ""
            this.validated.phone = this.user?.phone == "" ? "Không được để trống" : ""
            if (this.user?.name == "" || this.user?.phone == "") {
                return false
            }
            return true
        },
        closeModal() {
            this.$emit('close')
        }
    }
}
</script>
<style scoped>

</style>>