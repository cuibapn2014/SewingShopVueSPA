<template>
  <div class="container px-6 mx-auto grid">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      Nhân sự
    </h2>
    <div class="flex justify-end py-2">
      <form id="form-search" method="GET" class="flex" @submit.prevent="">
        <input
          class="block w-48 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray rounded-l-md form-input"
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
    </div>
    <UserTable
      :data_list="this.dataList"
      :is_load="getIsLoad"
      @edit_user="this.setEditId"
      @delete_user="this.reFetchData()"
    />
  </div>
</template>
<script>
import BaseLayout from "../../components/layouts/BaseLayout.vue";
import UserTable from "../../components/Table/UserTable.vue";
import { userService } from "../../services/user.service";
import emitter from "tiny-emitter/instance";
import { UrlHelper } from '../../helpers/url-helper';

export default {
  extends: BaseLayout,
  components: {
    BaseLayout,
    UserTable,
  },
  created() {
    let defaultSearchQuery = UrlHelper.setDefaultSearch()
    this.fetchDataUser(null, defaultSearchQuery);
  },
  mounted() {
    emitter.on("pagechanged", async (url) => {
      await this.fetchDataUser(url);
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
      delaySearch: null
    };
  },
  methods: {
    async fetchDataUser(url = null, query = null) {
      this.isLoadData = true;

      await userService
        .getAll(url, query)
        .then((res) => {
          if (res.data.code == 200) this.dataList = res.data;
        })
        .then(() => this.isLoadData = false);
    },
    closeModal(data) {
      this.isOpenModal = data;
    },
    openModal() {
      this.isOpenModal = true;
    },
    reFetchData() {
      this.fetchDataUser();
      this.closeModal();
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

        this.fetchDataUser(null, serialize);
      }, 250);
    },
    reload() {
      this.search = null;
      this.fetchDataUser();
    },
  },
};
</script>
<style scoped></style>
