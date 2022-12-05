<template>
  <div>
    <b-card>
      <validation-observer ref="docForm" #default="{ invalid }">
        <b-form autocomplete="off" @submit.prevent="handle_pre">
          <b-tabs>
            <b-tab title="常规设置">
              <setting ref="set" />
            </b-tab>
            <b-tab title="文档操作审计">
              <audit ref="doc" />
            </b-tab>
            <b-tab title="文档操作管控">

            </b-tab>
            <div>
              <hr />
              <b-button :disabled="invalid" type="submit" variant="primary" class="mr-1">保存</b-button>
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
import setting from "./pages/setting.vue";
import audit from "./pages/doc_audit.vue";
export default {
  name: "document",
  components: {
    BCard,
    BForm,
    BTab,
    BTabs,
    setting,
    ValidationObserver,
    BButton,
    audit,
  },
  data() {
    return {};
  },
  methods: {
    handle_pre() {
      this.$refs.docForm.validate().then((success) => {
        if (success) this.handle_add();
      });
    },
    async handle_add() {
      let set = this.$refs.set.setting
      console.log(set);
    }
  }
};
</script>