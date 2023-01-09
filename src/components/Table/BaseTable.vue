<template>
    <div class="w-full overflow-x-auto rounded-lg shadow-xs mb-4" v-dragscroll style="max-height: 600px;">
        <div class="w-full">
            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr
                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 sticky top-0">
                        <th class="px-4 py-3 font-bold">#</th>
                        <th class="px-4 py-3">Khách hàng</th>
                        <th class="px-4 py-3">Liên hệ</th>
                        <th class="px-4 py-3">Tổng tiền</th>
                        <th class="px-4 py-3">Trạng thái</th>
                        <th class="px-4 py-3">Tạo bởi</th>
                        <th class="px-4 py-3">Cập nhật</th>
                        <th class="px-4 py-3">Ngày giao hàng</th>
                        <th class="px-4 py-3">Hành động</th>
                    </tr>
                </thead>
                <tbody v-if="false" class="bg-[#ffffff] divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <tr class="text-gray-700 dark:text-gray-400">
                        <td class="px-4 py-3 flex">
                            
                        </td>
                        <td class="px-4 py-3 text-sm">
                            
                        </td>
                        <td class="px-4 py-3 text-sm">
                            
                        </td>
                        <td class="px-4 py-3 text-sm font-bold text-green-500">
                            
                        </td>
                        <td class="px-4 py-3 text-sm font-bold text-green-500">
                            <span
                            class="px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600">
                                Không duyệt
                            </span>
                            <span
                                class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
                                Chờ duyệt
                            </span>
                            <span
                                class="px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-orange-100 text-orange-700 dark:bg-orange-600">
                                Đã duyệt
                            </span>
                            <span
                                class="px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-green-100 text-green-700 dark:bg-green-600">
                                Hoàn thành
                            </span>
                            <span
                                class="px-2 py-1 font-semibold leading-tight rounded-full dark:text-white bg-red-100 text-red-700 dark:bg-red-600">
                                Đã hủy
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <img v-tooltip.top-start="''"
                                src=""
                                class="h-12 w-12 object-cover object-center rounded-full" />
                        </td>
                        <td class="px-4 py-3 text-sm">
                        </td>
                        <td class="px-4 py-3 text-sm">
                        </td>
                        <td class="px-4 py-3 text-sm flex items-center">
                            <button title="Chỉnh sửa" v-tooltip="'Chỉnh sửa'"
                                class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                aria-label="Edit">
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                                    </path>
                                </svg>
                            </button>
                            <button v-tooltip="'Xóa'" title="Xóa"
                                class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                aria-label="Delete">
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                            <button v-tooltip="'Xuất PDF'" title="Xuất PDF"
                                class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                            <button v-tooltip="'Xem chi tiết'" title="Xem chi tiết"
                                class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fill-rule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>

                            <div class="inline-block relative group">
                                <ul class="absolute hidden text-gray-700 pt-1 right-0 top-[25] group-hover:block z-50"
                                    style="margin-top: 25px;">
                                    <li class=""><a
                                            class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                            href="">Duyệt</a>
                                    </li>
                                    <li class=""><a
                                            class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                            href="">Không
                                            duyệt</a></li>
                                    <li class=""><a
                                        class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                        href="">Hoàn thành</a></li>
                                        <li class=""><a
                                            class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                            href="">Hủy</a></li>
                                </ul>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                        </td>
                    </tr>
                </tbody> 
                <td colspan="9" v-else class="text-sm text-center py-2 text-gray-800 dark:text-gray-200">Không tìm thấy dữ liệu nào</td>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>