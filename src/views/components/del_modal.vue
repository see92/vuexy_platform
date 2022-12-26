<template>
  <b-modal
    size="sm"
    title="提示："
    centered
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    :visible.sync="visible"
    @close="ModalReset"
  >
    <div>此操作将会删除数据，是否继续？</div>
    <div class="d-flex justify-content-end">
      <slot name="ok" />
      <slot name="cancel" />
    </div>
  </b-modal>
</template>

<script>
import { BModal } from "bootstrap-vue";
export default {
  name: "Modal",
  components: {
    BModal,
  },
  props: {
    ModalFlag: {
      default: false,
    },
  },
  data: () => ({
    visible: false,
  }),
  methods: {
    ModalReset() {
      this.$emit("update:ModalFlag", false);
    },
  },
  watch: {
    ModalFlag() {
      this.visible = this.ModalFlag;
    },
  },
};
</script>

<style>
</style>