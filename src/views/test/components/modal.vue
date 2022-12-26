<template>
  <div>
    <b-modal
      size="sm"
      title="提示："
      centered
      :visible.sync="visible"
      @close="QualityDialogClose"
      hide-footer
      no-close-on-backdrop
    >
      <div>此操作将会删除数据，是否继续？</div>
      <div class="d-flex justify-content-end">
        <slot name="ok" />
        <slot name="cancel" />
      </div>
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
  methods: {
    QualityDialogClose() {
      this.$emit("update:QualityModalFlag", false);
    },
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