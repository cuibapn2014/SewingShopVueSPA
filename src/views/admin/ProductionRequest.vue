<template>
  <div class="container px-6 mx-auto grid">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      Đề nghị sản xuất
    </h2>
    <ProductionRequestTable :data_list="this.dataList" :is_load="getIsLoad"/>
  </div>
</template>
<script>
import BaseLayout from "../../components/layouts/BaseLayout.vue"
import ProductionRequestTable from "../../components/Table/ProductionRequestTable.vue";
import { productionRequestService } from "../../services/productionRequest.service"
import emitter from 'tiny-emitter/instance'

export default {
  extends: BaseLayout,
  components: {
    BaseLayout, ProductionRequestTable
  },
  created() {
    this.fetchData()
  },
  mounted(){
    emitter.on('pagechanged',async (data) => {
      await this.fetchData(data)
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
      isLoadData: false
    }
  },
  methods: {
    async fetchData(pageTo = null) {
      this.isLoadData = true
      const urlSearch = await new URLSearchParams(window.location.search)
      let page = await urlSearch.has('page') ? (pageTo ?? urlSearch.get('page')) : (pageTo ?? 1)
      await productionRequestService.getDataAll(page).then(res => {
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