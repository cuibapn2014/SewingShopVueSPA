<template>
  <div class="container px-6 mx-auto grid">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      Đề nghị sản xuất
    </h2>
    <div class="flex justify-end py-2">
             <form id="form-search" method="GET" @submit.prevent="" class="flex mx-2">
              <input
                class="block w-64 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray rounded-l-md form-input"
                type="text"
                name="keyword"
                placeholder="Nhập tìm kiếm.."
                v-model="this.search"
                autocomplete="off"
                @input="this.searchSubmit()"
              />
              <button
                class="flex items-center px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border-0 rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </form>
            <div class="inline-block relative group mx-2">
                <button @click.prevent="this.setEditId(null)"
                    class="flex items-center h-full px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border-0 rounded-lg active:bg-purple-700 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                    Thêm mới
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <button onclick=""
                class="flex items-center px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border-0 rounded-lg active:bg-green-700 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple">
                Xuất Excel
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </button>
        </div>
    <ProductionRequestTable :data_list="this.dataList" :is_load="getIsLoad"
      @edit_production_suggest="this.setEditId"
      @delete_production_suggest="this.reFetchData()"/>
    <ActionProductionSuggestModal
      :is_open_modal="this.isOpenModal"
      @togglemodal="this.closeModal"
      @success_create="this.reFetchData()"
      :id_production_request="this.editId"
    />
  </div>
</template>
<script>
import BaseLayout from "../../components/layouts/BaseLayout.vue"
import ProductionRequestTable from "../../components/Table/ProductionRequestTable.vue";
import { productionRequestService } from "../../services/productionRequest.service"
import emitter from 'tiny-emitter/instance'
import ActionProductionSuggestModal from '../../components/Modal/ActionProductionSuggestModal.vue';
import { UrlHelper } from '../../helpers/url-helper';

export default {
  extends: BaseLayout,
  components: {
    BaseLayout, ProductionRequestTable, ActionProductionSuggestModal
  },
  created() {
    let defaultSearchQuery = UrlHelper.setDefaultSearch()
    this.fetchData(null, defaultSearchQuery)
  },
  mounted(){
    emitter.on('pagechanged',async (url) => {
      await this.fetchData(url)
    })
  },
  beforeUnmount(){
    emitter.off('pagechanged')
  },
  computed:{
    getIsLoad(){
      return this.isLoadData
    }
  },
  data() {
    return {
      dataList: null,
      isLoadData: false,
      isOpenModal: false,
      editId: null,
      search: null,
      delaySearch: null
    }
  },
  methods: {
    async fetchData(url = null, query = null) {
      this.isLoadData = true
      
      await productionRequestService.getDataAll(url, query).then(res => {
        if (res.data.code == 200)
          this.dataList = res.data
      }).then(() => this.isLoadData = false)
    },
    async reFetchData() {
      await this.fetchData();
      await this.closeModal();
    },
    closeModal(data) {
      this.isOpenModal = false;
    },
    openModal() {
      this.isOpenModal = true;
    },
    setEditId(id) {
      this.editId = id;
      this.openModal();
    },
    searchSubmit() {
      clearTimeout(this.delaySearch)
      this.delaySearch = setTimeout(() => {
        let serialize = new URLSearchParams(new FormData(document.querySelector('#form-search'))).toString();
        let urlSearch = window.location.pathname + '?' + serialize;
        window.history.pushState({}, null, urlSearch)

        this.fetchData(null, serialize);
      }, 250);
    },
    reload() {
      this.search = null;
      this.fetchData();
    },
  }
}
</script>
<style scoped>

</style>