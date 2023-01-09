<template>
    <form @submit.prevent="handleUpdate()">
        <BaseModal title="Cập nhật tài khoản" :txt_accept="'Lưu thay đổi'" :display="this.isShowModal"
            @close-base-modal="closeModal">
            <div class="flex justify-between my-3">
                <div class="text-base grow pl-2 flex flex-col">
                    <label class="my-1">
                        <span>Mật khẩu hiện tại</span>
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
                            " type="password" v-model="current_password" placeholder="Nhập mật khẩu hiện tại"/>
                    </label>
                    <label class="my-1">
                        <span>Mật khẩu mới</span>
                        <span class="mx-2 text-red-500 text-sm">{{ validated.password }}</span>
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
                            " type="password" v-model="password" placeholder="Nhập mật khẩu mới"/>
                    </label>
                    <label class="my-1">
                        <span>Xác nhận mật khẩu</span>
                        <span class="mx-2 text-red-500 text-sm">{{ validated.confirm_password }}</span>
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
                            " type="password" v-model="confirm_password" placeholder="Nhập lại mật khẩu mới"/>
                    </label>
                </div>
            </div>
        </BaseModal>
    </form>
</template>
<script>
import { toast } from 'vue3-toastify';
import BaseModal from './BaseModal.vue';
import { mapGetters } from 'vuex';
export default {
    components: { BaseModal },
    props: {
        display: Boolean
    },
    updated() {
        this.isShowModal = this.display
        if(this.isShowModal){
            this.current_password = "",
            this.password = "",
            this.confirm_password = ""
            this.clearValidate()
        }
    },
    data() {
        return {
            isShowModal: false,
            current_password: "",
            password: "",
            confirm_password: "",
            validated: {
                current_password: null,
                password: null,
                confirm_password: null
            },
            isSubmit: false
        }
    },
    methods: {
        openModal() {
            this.isShowModal = true    
            this.clearValidate()
        },
        closeModal() {
            this.$emit('close')
        },
        validateForm() {
            this.validated.current_password = this.current_password == "" ? "Không được để trống" : ""
            this.validated.password = this.password == "" ? "Không được để trống" : ""
            this.validated.confirm_password = this.confirm_password == "" ? "Không được để trống" : ""
            if (!this.current_password || !this.password || !this.confirm_password)
                return false
            return true
        },
        handleUpdate() {
            const data = {
                current_password: this.current_password,
                new_password: this.password,
                confirm_password: this.confirm_password
            }
            if (this.validateForm() && !this.isSubmit) {
                this.isSubmit = true
                this.$store.dispatch('account/change_password', data).then(res => {
                    if(res.data.user){
                        toast.success("Cập nhật thông tin thành công!",{
                            position: toast.POSITION.TOP_RIGHT,
                            theme: toast.THEME.COLORED,
                            pauseOnHover: false,
                        })
                        this.clearValidate()
                        this.closeModal()
                    }
                }).catch(err => {
                    let message = ""
                    if(err.response.data.message) message = err.response.data.message
                    else{
                        let errors = JSON.parse(err.response.data)
                        this.validated.password = errors.new_password ? errors.new_password[0] : null
                        this.validated.confirm_password = errors.confirm_password ? errors.confirm_password[0] : null
                    }
                    
                    if(message)
                    toast.error(message,{
                            position: toast.POSITION.TOP_RIGHT,
                            theme: toast.THEME.COLORED,
                            pauseOnHover: false,
                        })
                }).then(() => this.isSubmit = false)
            }
        },
        clearValidate(){
            this.validated.password = null
            this.validated.confirm_password = null
        }
    }
}
</script>
<style scoped>

</style>>