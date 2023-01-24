<template>
    <div
        class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span class="flex items-center col-span-3">
            Hiển thị {{ dataPaginate?.from?.toLocaleString('vi') }}-{{ dataPaginate?.to?.toLocaleString('vi') }} trong
            {{
                dataPaginate?.total.toLocaleString('vi')
            }}
        </span>
        <span class="col-span-2"></span>
        <!-- Pagination -->
        <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
                <ul class="inline-flex items-center">
                    <li v-if="renderPaginate.prev">
                        <button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                            aria-label="Previous" @click="this.changePage(renderPaginate.prev)">
                            <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                <path
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd" fill-rule="evenodd"></path>
                            </svg>
                        </button>
                    </li>
                    <li v-for="(item, index) in renderPaginate.items" :key="index" @click="this.changePage(item)">
                        <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple" :class="
                            {
                                'rounded-md focus:outline-none focus:shadow-outline-purple': !(currentPage == item),
                                'text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple': (currentPage == item)
                            }
                        ">
                            {{ item }}
                        </button>
                    </li>
                    <!-- <li>
                        <button
                            class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                            3
                        </button>
                    </li> -->
                    <!-- <li>
                        <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            4
                        </button>
                    </li>
                    <li>
                        <span class="px-3 py-1">...</span>
                    </li>
                    <li>
                        <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            8
                        </button>
                    </li>
                    <li>
                        <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            9
                        </button>
                    </li> -->
                    <li v-if="renderPaginate.next">
                        <button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                            aria-label="Next" @click="this.changePage(renderPaginate.next)">
                            <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                <path
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" fill-rule="evenodd"></path>
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </span>
    </div>

</template>
<script>
import emitter from 'tiny-emitter/instance'

export default {
    props: {
        data_paginate: Object,
        path_current: String
    },
    computed: {
        renderPaginate() {
            let paginate = this.data_paginate
            let current = paginate?.current_page ?? 1
            let max = Math.ceil(paginate?.total / paginate?.per_page)
            let prev = current == 1 ? null : current - 1
            let next = current == max ? null : current + 1
            if (!current || !max) return null

            let items = [1]

            if (current === 1 && max === 1) return { items }
            if (current > 4) items.push('…')

            let r = 2, r1 = current - r, r2 = current + r

            for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i)

            if (r2 + 1 < max) items.push('…')
            if (r2 < max) items.push(max)

            return {prev, next, items}
        },
        dataPaginate(){
            return this.data_paginate
        }
    },
    data() {
        return {
            paginate: this.data_paginate,
            currentPage: 1
        }
    },
    methods: {
        changePage(toPage) {
            if (!Number(toPage)) return
            this.currentPage = toPage
            this.$router.push({
                path: this.path_current,
                query: {
                    page: toPage
                }
            })
            emitter.emit('pagechanged', this.currentPage)
        }
    }
}
</script>
<style scoped>

</style>