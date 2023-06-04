<template>
    <form @submit.prevent="handleUpdate()" ref="form_status">
        <BaseModal title="Xử lý đơn hàng" :txt_accept="'Cập nhật'" :display="this.isShowModal"
            @close-base-modal="closeModal">
            <label for="select_status" class="flex flex-col">
                <select id="select_status" name="status" ref="select_status" class="block
                    w-full
                    mt-1
                    text-sm
                    dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
                    form-select
                    focus:border-purple-400 focus:outline-none focus:shadow-outline-purple
                    dark:focus:shadow-outline-gray my-2">
                    <option value="" selected disabled>Chọn hành động</option>
                    <option v-for="item in this.optStatus" :key="item.value" :value="item.value">{{ item.text }}</option>
                </select>
            </label>
        </BaseModal>
    </form>
</template>
<script>
import { toast } from 'vue3-toastify';
import { orderService } from '../../services/order.service';
import BaseModal from './BaseModal.vue';

export default {
    components: { BaseModal },
    props: {
        display: Boolean,
        status: Number,
        id: Number
    },
    updated() {
        this.isShowModal = this.display
        if(this.display)
            this.$refs.select_status.value = ""
    },
    computed: {
        optStatus(){
            return this.arrStatus
            if(this.status == 1)
                return this.arrStatus.filter(item => [2, 4].includes(item.value))
            if(this.status == 2)
                return this.arrStatus.filter(item => [3, 5].includes(item.value))
        },
    },
    data() {
        return {
            isShowModal: false,
            isSubmit: false,
            arrStatus: [
                {
                    value:2,
                    text: "Duyệt"
                },
                {
                    value:4,
                    text: "Không duyệt"
                },
                {
                    value:3,
                    text: "Hoàn thành"
                },
                {
                    value:5,
                    text: "Hủy đơn hàng"
                }
            ]
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
        async handleUpdate() {
            const form = this.$refs.form_status
            const formData = new FormData(form)
            this.isSubmit = true
            await orderService.updateStatus(formData, this.id).then(res => {
                toast.success(res.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: toast.THEME.COLORED,
                    pauseOnHover: false,
                });
                this.$emit('update_success')
            }).catch(err => {
                let message = "Đã xảy ra lỗi! Vui lòng kiểm tra lại"
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: toast.THEME.COLORED,
                    pauseOnHover: false,
                });
            }).finally(() => this.isSubmit = false)
        }
    }
}
</script>
<style scoped>

</style>>