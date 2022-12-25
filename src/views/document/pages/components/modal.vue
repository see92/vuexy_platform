<template>
  <div>
    <b-modal
      size="lg"
      no-close-on-backdrop
      centered
      hide-footer
      v-model="showModal"
    >
      <div class="d-flex justify-content-end">
        <b-button variant="primary" class="mr-1">保存</b-button>
        <b-button variant="outline-primary">取消</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "modal",
  data() {
    return {
      showModal: false,
    };
  },
};
</script>