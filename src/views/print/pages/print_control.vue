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
                    v-model="cont.types"
                  />
                </div>
              </b-form-group>
              <Input rules="required" name="sensitiveName" />
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
} from "bootstrap-vue";
import { contOptions, typeOptions } from "../js/options";
import vSelect from "vue-select";

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
  },
  data() {
    return {
      contOptions: contOptions,
      typeOptions: typeOptions,
      modal_add: false,
      cont: {
        type: 0,
        types: 0,
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
.contForm {
  .col-form-label {
    width: 100px;
  }
}
@import "@core/scss/vue/libs/vue-select.scss";
</style>