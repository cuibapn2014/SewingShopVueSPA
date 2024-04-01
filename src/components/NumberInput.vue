<template>
    <label class="block text-sm">
          <span class="flex text-gray-700 dark:text-gray-400"
            >{{ this.label }}
            <p v-if="this.required" class="text-red-500 mx-1">*</p>
            <span v-if="this.errors[name.replace('[]', '')] || this.error_message" class="text-red-500 mx-1"></span>
          </span>
          <input
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            type="text"
            v-model="this.text"
            :name="this.name"
            :placeholder="this.placeholder"
            @input="this.validateNumber($event, name.replace('[]', ''))"
            @keyup="this.numberToString"
            autocomplete="off"
          />
        </label>
</template>
<script>
import { numberFunctions } from '../helpers/numberFunctions';

export default {
    props:{
        label: {
            type:String,
            required: true
        },
        required: {
            default: false,
            type: Boolean
        },
        value: Number,
        error_message: String,
        name: String,
        placeholder:String,
        accept_negative_number: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value: function(n, o){
            this.text = n
        }
    },  
    data(){
        return{
            text: this.value,
            errors: {}
        }
    },
    methods: {
        validateNumber(e, property) {
            let value = e.target.value;
            let isNumber = numberFunctions.regexNumber(value);
            this.errors[property] = null;
            if (!isNumber) this.errors[property] = "Giá trị nhập không hợp lệ";
            this.$emit('change_number')
        },
        numberToString(e) {
            let value = numberFunctions.convertNumberToString(e.target.value, this.accept_negative_number);
            e.target.value = value;
            this.$emit('change_number')
        },
        stringToNumber(e) {
            let value = numberFunctions.convertStringToNumber(e.target.value);
            e.target.value = value ? value : "";
        }
    }
}
</script>
