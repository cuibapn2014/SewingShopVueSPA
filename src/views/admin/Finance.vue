<template>
  <div class="container px-6 mx-auto grid">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      Tài chính
    </h2>
    <FinanceTable :data_list="this.dataList" :is_load="getIsLoad"/>
  </div>
</template>
<script>
import BaseLayout from "../../components/layouts/BaseLayout.vue"
import FinanceTable from "../../components/Table/FinanceTable.vue";
import { financeService } from "../../services/finance.service"
import emitter from 'tiny-emitter/instance'

export default {
  extends: BaseLayout,
  components: {
    BaseLayout, FinanceTable
  },
  created() {
    this.fetchData()
  },
  mounted(){
    emitter.on('pagechanged',async (data) => {
      await this.fetchData(data)
    })
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
      await financeService.getDataAll(page).then(res => {
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