<template>
  <div>
    <b-button @click.stop="handle_show" variant="outline-primary"
      >弹窗</b-button
    >
    <Modal :QualityModalFlag.sync="QualityModalFlag">
      <b-button slot="ok" variant="danger" class="mr-1" @click="handle_ok"
        >确定</b-button
      >
      <b-button slot="cancel" variant="outline-danger" @click="handle_cancel"
        >取消</b-button
      >
    </Modal>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";
export default {
  components: {
    Modal: () => import("./components/modal.vue"),
    BButton,
  },
  data() {
    return {
      QualityModalFlag: false,
    };
  },
  methods: {
    handle_ok() {
      handle_cancel();
    },
    handle_cancel() {
      this.QualityModalFlag = false;
    },
    handle_show() {
      this.QualityModalFlag = true;
    },
  },
};
</script>

<style>
</style>