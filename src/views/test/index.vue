<template>
  <div>
    <b-button @click="handle_show" variant="outline-primary">弹窗</b-button>
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
    handle_show() {},
  },
};
</script>

<style>
</style>