<template>
  <div class="w-full relative" ref="select_custom">
    <label class="block text-sm my-2">
      <span class="text-gray-700 dark:text-gray-400">{{ this.label }}</span>
      <input
        class="block w-full mt-1 text-sm text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 select-none form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
        name="id_unit"
        id="id_unit"
        type="text"
        aria-placeholder="Chọn đơn vị tính"
        v-model="this.textSelected"
        @click="this.openResults"
        @keyup="this.search"
        ref="input_select"
        :placeholder="this.placeholder"
      />
    </label>
    <transition
      enter-from-class="transform translate-y-1/2 opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 translate-y-1/2"
    >
      <div
        v-if="this.isShowOption"
        class="duration-75 w-full max-h-52 dark:bg-gray-900 bg-white text-base rounded-b-md z-50 absolute cursor-pointer overflow-y-auto shadow-md"
      >
        <li v-if="this.isSearch" class="text-center select-none p-2 text-gray-600 dark:text-gray-200">
          <font-awesome-icon
            class="animate-spin"
            icon="fa-solid fa-circle-notch"
          />
          Đang tìm kiếm...
        </li>
        <li
          v-for="item in this.options"
          :key="item.value"
          class="hover:bg-indigo-600 dark:text-gray-200 hover:text-white active:bg-indigo-700 p-2 select-none flex justify-between"
          @click="handleSelectOption(item.value, item.text)"
          :class="{
            'bg-indigo-600 text-white': item.value == this.valueSelected,
            'text-gray-600': item.value != this.valueSelected,
          }"
        >
          {{ item.text }}
          <svg
            v-if="item.value == this.valueSelected"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mx-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </li>
        <li
          v-if="!this.isSearch && this.options.length <= 0"
          class="text-center select-none p-2 text-gray-600 dark:text-gray-200"
        >
          Không tìm thấy kết quả
        </li>
      </div>
    </transition>
  </div>
</template>
<script>
var timer;
export default {
  props: {
    options: Array,
    selected: String,
    placeholder: String,
    label: String,
    delay_time: Number,
  },
  mounted() {
    this.handleClickOutside();
  },
  watch: {
    options: function (n, o) {
      if (n.length <= 0) this.textSelected = "";
      this.isSearch = false;
    },
  },
  data() {
    return {
      isShowOption: false,
      textSelected: "",
      tempTxt: "",
      valueSelected: null,
      isSearch: false,
    };
  },
  methods: {
    handleSelectOption(value, text) {
      if (this.valueSelected == value) return;
      this.textSelected = text;
      this.valueSelected = value;
      this.tempTxt = text;
      this.closeResults();
      this.$emit("select", value);
    },
    openResults(e) {
      this.tempTxt = this.textSelected;
      this.textSelected = "";
      this.isShowOption = true;
      this.$emit("search", "");
    },
    closeResults() {
      this.isShowOption = false;
      this.textSelected = this.tempTxt == "" ? this.textSelected : this.tempTxt;
    },
    search(e) {
      clearTimeout(timer);
      const delay = this.delay_time ?? 250;
      const term = e.target.value;
      this.isSearch = true;
      timer = setTimeout(() => {
        this.$emit("search", term);
      }, delay);
    },
    handleClickOutside() {
      window.addEventListener("click", async (e) => {
        if (!this.isShowOption) return;
        const select = await this.$refs.input_select;
        let li = (await this.$refs.select_custom) || null;
        li = li != null ? li.querySelector("li") : null;
        if (e.target != select && e.target != li) this.closeResults();
      });
    },
  },
};
</script>
<style scoped></style>
