<template>
  <div class="print_control">
    <div>选择文件打印时的管控类型,默认禁止所有文件的打印行为</div>
    <b-form-group>
      <div style="width: 550px">
        <v-select
          :searchable="false"
          :clearable="false"
          :reduce="(title) => title.key"
          :options="contOptions"
          label="title"
          v-model="cont.type"
        />
      </div>
      {{ cont.type }}
      <div v-show="this.cont.type == 1">
        <div class="d-flex">
          <b-button variant="primary" @click="modal_show"
            ><feather-icon icon="PlusIcon" size="16"
          /></b-button>
        </div>
        <b-table :fields="controlFields" :items="controlItem"></b-table>
      </div>
      <!-- 新增敏感词 -->
      <b-modal
        v-model="modal_add"
        size="lg"
        no-close-on-backdrop
        centered
        hide-footer
      >
        <div class="contForm">
          <validation-observer ref="contForm" #default="{ invalid }">
            <b-form autocomplete="off" @submit.prevent="handle_pre">
              <b-form-group
                label="敏感类型："
                label-for="type"
                label-cols-md="auto"
              >
                <div style="width: 550px">
                  <v-select
                    :searchable="false"
                    :clearable="false"
                    :reduce="(title) => title.key"
                    label="title"
                    :options="typeOptions"
                    v-model="sensitive.type"
                  />
                </div>
              </b-form-group>
              <Input
                rules="required"
                name="sensitiveName"
                label="敏感名称："
                label-for="name"
                type="text"
                placeText="请输入名称"
                :value.sync="sensitive.name"
              />
              <b-form-group
                label="特征类型："
                label-for="type"
                label-cols-md="auto"
              >
                <div class="d-flex" style="margin-top: 5px">
                  <b-form-radio
                    plain
                    value="0"
                    v-model="sensitive.state"
                    class="mr-1"
                    >关键词</b-form-radio
                  >
                  <b-form-radio plain value="1" v-model="sensitive.state"
                    >正则表达式</b-form-radio
                  >
                </div>
              </b-form-group>
              <Input
                rules="required"
                name="feature"
                label="特征："
                labelName="feature"
                type="text"
                :value.sync="sensitive.feature"
              />
              <b-form-group
                label="敏感等级："
                label-for="leave"
                label-cols-md="auto"
              >
                <div style="width: 550px">
                  <v-select
                    :searchable="false"
                    :clearable="false"
                    :reduce="(title) => title.key"
                    label="title"
                    :options="leaveOptions"
                    v-model="sensitive.leave"
                  />
                </div>
              </b-form-group>
              <b-form-group label="" label-for="update" label-cols-md="auto">
                <b-form-checkbox v-model="sensitive.update">
                  同步到敏感词库
                </b-form-checkbox>
                {{ sensitive.update }}
              </b-form-group>
            </b-form>
          </validation-observer>
        </div>
      </b-modal>
    </b-form-group>
  </div>
</template>
<script>
import { ValidationObserver } from "vee-validate";
import {
  BFormGroup,
  BTable,
  BButton,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormRadio,
  BFormCheckbox,
} from "bootstrap-vue";
import { contOptions, typeOptions, leaveOptions } from "../js/options";
import vSelect from "vue-select";
import Input from "../components/input.vue";
import { required } from "@validations";

export default {
  name: "print_control",
  components: {
    ValidationObserver,
    BFormGroup,
    vSelect,
    BTable,
    BButton,
    BModal,
    BForm,
    BRow,
    BCol,
    Input,
    BFormRadio,
    BFormCheckbox,
  },
  data() {
    return {
      required,
      contOptions: contOptions,
      typeOptions: typeOptions,
      leaveOptions: leaveOptions,
      modal_add: false,
      cont: {
        type: 0,
        name: "",
      },
      sensitive: {
        type: 0,
        name: "",
        state: 0,
        feature: "",
        leave: 0,
        update: false,
      },
      controlFields: [
        { key: "name", label: "敏感名称" },
        { key: "feature", label: "敏感特征" },
        { key: "leave", label: "敏感等级" },
        { key: "actions", label: "操作" },
      ],
      controlItem: [],
    };
  },
  methods: {
    modal_show() {
      this.modal_add = true;
    },
  },
};
</script>



<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
.contForm {
  .col-form-label {
    width: 100px;
  }
}
</style>