<template>
  <div class="outgo">
    <div class="d-flex">
      <b-button variant="outline-primary" @click="handle_add">添加</b-button>
      <b-modal
        size="lg"
        no-close-on-backdrop
        centered
        hide-footer
        v-model="showModal"
      >
        <div class="form">
          <b-form-group
            label="应用："
            label-for="application"
            label-cols-md="auto"
          >
            <div style="width: 550px">
              <v-select
                :options="specifyRouteOptions"
                :searchable="false"
                :clearable="false"
                :reduce="(title) => title.key"
                :close-on-select="false"
                label="title"
                multiple
                v-model="control.app"
              />
            </div>
          </b-form-group>
          <div>以下自定义进程外发文件将被会禁止，每个进程名一行，如：QQ</div>
          <b-form-group label="" label-for="" label-cols-md="auto">
            <b-form-textarea
              style="width: 550px"
              no-resize
              v-model="control.custom"
            />
          </b-form-group>
          <b-form-group label="规则：" label-for="rules" label-cols-md="auto">
            <div style="width: 550px">
              <v-select
                :options="rulesOptions"
                :searchable="false"
                :clearable="false"
                :reduce="(title) => title.key"
                label="title"
                v-model="control.rules"
              />
            </div>
          </b-form-group>
          <div v-show="this.control.rules == 1">
            <b-form-group label="" label-for="" label-cols-md="auto">
              <b-form-checkbox v-model="control.fileType">
                文件类型
              </b-form-checkbox>
            </b-form-group>
            {{ control.fileType }}
            <b-form-group label="" label-for="" label-cols-md="auto">
              <div style="width: 550px">
                <v-select :reduce="(title) => title.key" label="title" />
              </div>
            </b-form-group>
          </div>
        </div>

        <!-- <b-form-group label="规则：" label-for="rules" label-cols-md="auto">
          <div style="width: 550px">
            <v-select :options="rulesOptions" />
          </div>
        </b-form-group> -->
        <div class="d-flex justify-content-end">
          <b-button variant="primary" class="mr-1">保存</b-button>
          <b-button variant="outline-primary">取消</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {
  BButton,
  BModal,
  BFormGroup,
  BFormTextarea,
  BFormCheckbox,
} from "bootstrap-vue";
import Input from "./components/b-input.vue";
import vSelect from "vue-select";
import { specifyRouteOptions, rulesOptions } from "./js/options";
export default {
  name: "doc_outgo",
  components: {
    BButton,
    BModal,
    Input,
    vSelect,
    BFormGroup,
    BFormTextarea,
    BFormCheckbox,
  },
  data() {
    return {
      showModal: false, //弹窗
      specifyRouteOptions, //应用选项
      rulesOptions, //规则选项
      control: {
        app: [],
        custom: "",
        rules: 0,
        fileType: 0,
      },
    };
  },
  methods: {
    handle_add() {
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss">
.form {
  .col-form-label {
    width: 120px;
  }
}
</style>