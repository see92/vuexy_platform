<template>
  <validation-provider :rules="rules" :name="name" #default="{ errors }">
    <b-form-group :label="label" :label-for="labelName" label-cols-md="auto">
      <b-form-input
        style="width: 550px"
        :type="type"
        :state="errors.length > 0 ? false : null"
        :placeholder="placeText"
        v-model="currentValue"
        @input="input"
      />
      <small class="text-danger">{{ errors[0] }} </small>
    </b-form-group>
  </validation-provider>
</template>
  
  <script>
import { BFormGroup, BFormInput } from "bootstrap-vue";
import { ValidationProvider } from "vee-validate";

export default {
  name: "Input",
  components: {
    ValidationProvider,
    BFormGroup,
    BFormInput,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    rules: {
      type: [String, Object],
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    labelName: {
      type: String,
      default: "",
    },
    placeText: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    currentValue: "",
  }),
  mounted() {
    this.currentValue = this.$props.value;
  },
  methods: {
    input() {
      this.$emit("update:value", this.currentValue);
    },
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue;
    },
    // currentValue(val) {
    //   this.$emit("input", val);
    // },
  },
};
</script>