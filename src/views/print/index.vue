<template>
  <div>
    <b-card>
      <validation-observer ref="printForm" #default="{ invalid }">
        <b-form autocomplete="off" @submit.prevent="handle_pre">
          <b-tabs>
            <b-tab title="打印管控">
              <print_control />
            </b-tab>
            <div>
              <hr />
              <b-button
                :disabled="invalid"
                type="submit"
                variant="primary"
                class="mr-1"
                >保存</b-button
              >
              <b-button variant="outline-primary">取消</b-button>
            </div>
          </b-tabs>
        </b-form>
      </validation-observer>
    </b-card>
  </div>
</template>
    
  <script>
import { BCard, BTab, BTabs, BForm, BButton } from "bootstrap-vue";
import { ValidationObserver } from "vee-validate";
import print_control from "./pages/print_control.vue";

export default {
  name: "print",
  components: {
    BCard,
    BForm,
    BTab,
    BTabs,
    ValidationObserver,
    BButton,
    print_control,
  },
  data() {
    return {};
  },
  methods: {
    handle_pre() {
      this.$refs.printForm.validate().then((success) => {
        if (success) this.handle_add();
      });
    },
    async handle_add() {},
  },
};
</script>