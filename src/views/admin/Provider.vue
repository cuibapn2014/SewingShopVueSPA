<template>
  <div class="container px-6 mx-auto grid">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      Nhà cung cấp
    </h2>
    <div class="flex justify-end py-2">
      <form class="flex mx-2" @submit.prevent="this.searchSubmit()">
        <input
          class="block w-64 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray rounded-l-md form-input"
          type="text"
          name="keyword"
          v-model="this.search"
          placeholder="Nhập tìm kiếm.."
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
      <button
        class="flex items-center px-2 py-2 mx-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border-0 rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        @click="this.setEditId(null)"
      >
        Thêm mới
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
          />
        </svg>
      </button>
      <button
        class="flex items-center px-2 py-2 mx-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border-0 rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        @click="this.reload()"
      >
        Tải lại
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
    <ProviderTable
      :data_list="this.dataList"
      :is_load="getIsLoad"
      @edit_provider="this.setEditId"
      @delete_provider="this.reFetchData()"
    />
    <ActionProviderModal
      :is_open_modal="this.isOpenModal"
      @togglemodal="this.closeModal"
      @success_create="this.reFetchData()"
      :id_provider="this.editId"
    />
  </div>
</template>
<script>
import BaseLayout from "../../components/layouts/BaseLayout.vue";
import ProviderTable from "../../components/Table/ProviderTable.vue";
import { providerService } from "../../services/provider.service";
import emitter from "tiny-emitter/instance";
import ActionProviderModal from "../../components/Modal/ActionProviderModal.vue";

export default {
  extends: BaseLayout,
  components: {
    BaseLayout,
    ProviderTable,
    ActionProviderModal,
  },
  created() {
    this.fetchDataProvider();
  },
  mounted() {
    emitter.on("pagechanged", async (data) => {
      await this.fetchDataProvider(data);
    });
  },
  beforeUnmount() {
    emitter.off("pagechanged");
  },
  computed: {
    getIsLoad() {
      return this.isLoadData;
    },
  },
  data() {
    return {
      dataList: null,
      isLoadData: false,
      isOpenModal: false,
      editId: null,
      search: null,
    };
  },
  methods: {
    async fetchDataProvider(pageTo = null) {
      this.isLoadData = true;
      const urlSearch = await new URLSearchParams(window.location.search);
      const data = {
        keyword: this.search,
      };
      let page = (await urlSearch.has("page"))
        ? pageTo ?? urlSearch.get("page")
        : pageTo ?? 1;
      await providerService
        .getDataAll(page, data)
        .then((res) => {
          if (res.data.code == 200) this.dataList = res.data;
        })
        .then(() => {
          this.isLoadData = false;
        });
    },
    closeModal(data) {
      this.isOpenModal = data;
    },
    openModal() {
      this.isOpenModal = true;
    },
    reFetchData() {
      this.fetchDataProvider();
      this.closeModal();
    },
    setEditId(id) {
      this.editId = id;
      this.openModal();
    },
    searchSubmit() {
      if (this.search && this.search != "") {
        this.fetchDataProvider();
      }
    },
    reload() {
      this.search = null;
      this.fetchDataProvider();
    },
  },
};
</script>
<style scoped></style>
