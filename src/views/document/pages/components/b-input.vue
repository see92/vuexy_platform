<template>
  <div class="input">
    <b-form-group :label="label" :label-for="labelName" label-cols-md="auto">
      <b-form-input
        style="width: 550px"
        v-model="currentValue"
        @input="input"
      />
    </b-form-group>
  </div>
</template>

<script>
import { BFormGroup, BFormInput } from "bootstrap-vue";
export default {
  name: "Input",
  components: { BFormGroup, BFormInput },
  props: {
    value: {
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
  },
  data() {
    return {
      currentValue: "",
    };
  },
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
  },
};
</script>