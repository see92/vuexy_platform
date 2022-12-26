<template>
  <div>
    <b-modal :visible.sync="visible">
      <slot name="btn" />
    </b-modal>
  </div>
</template>

<script>
import { BModal } from "bootstrap-vue";
export default {
  name: "Modal",
  components: {
    BModal,
  },
  props: {
    QualityModalFlag: {
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    QualityModalFlag() {
      this.visible = this.QualityModalFlag;
    },
  },
};
</script>

<style>
</style>