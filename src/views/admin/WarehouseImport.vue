<template>
  <div class="container px-6 mx-auto grid">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      Nhập kho
    </h2>
    <WarehouseImportTable :data_list="this.dataList" :is_load="getIsLoad" @reload="this.fetchDataWarehouseImport()"/>
  </div>
</template>
<script>
import BaseLayout from "../../components/layouts/BaseLayout.vue"
import WarehouseImportTable from "../../components/Table/WarehouseImportTable.vue";
import { warehouseImportService } from "../../services/warehouseImport.service"
import emitter from 'tiny-emitter/instance'

export default {
  extends: BaseLayout,
  components: {
    BaseLayout, WarehouseImportTable
  },
  created() {
    this.fetchDataWarehouseImport()
  },
  mounted() {
    emitter.on('pagechanged', async (data) => {
      await this.fetchDataWarehouseImport(data)
    })  
  },
  beforeUnmount() {
    emitter.off('pagechanged')
  },
  computed: {
    getIsLoad() {
      return this.isLoadData
    }
  },
  data() {
    return {
      dataList: null,
      isLoadData: false
    }
  },
  methods: {
    async fetchDataWarehouseImport(pageTo = null) {
      this.isLoadData = true
      const urlSearch = await new URLSearchParams(window.location.search)
      let page = await urlSearch.has('page') ? (pageTo ?? urlSearch.get('page')) : (pageTo ?? 1)
      const ingredient_type = 2
      await warehouseImportService.getDataAll(page, ingredient_type).then(res => {
        if (res.data.code == 200)
          this.dataList = res.data
      }).then(() => {
        this.isLoadData = false
      })
    }
  }
}
</script>
<style scoped>

</style>