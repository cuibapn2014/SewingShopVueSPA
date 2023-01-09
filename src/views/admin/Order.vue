<template>
  <BaseLayout>
    <div class="container px-6 mx-auto grid">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Đơn hàng
      </h2>

      <BaseTable/>
    </div>
  </BaseLayout>
</template>
<script>
import BaseLayout from "../../components/layouts/BaseLayout.vue"
import BaseTable from "../../components/Table/BaseTable.vue";
export default {
  components: {
    BaseLayout, BaseTable
  },
  data() {
    return {}
  }
}
</script>
<style scoped>

</style>