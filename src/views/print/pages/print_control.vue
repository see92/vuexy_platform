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
          <b-button variant="primary" @click="modal_show">
            <feather-icon icon="PlusIcon" size="16" />
          </b-button>
        </div>
        <b-table :fields="controlFields" :items="controlItem">
          <template #cell(feature)="data">
            {{ data.item.state == 0 ? "关键词" : "正则表达式" }}:{{
              data.item.feature
            }}
          </template>
          <template #cell(leave)="data">
            <!-- {{ findName(leaveOptions, data.item.leave) }} -->
          </template>
          <template #cell(actions)="data">
            <div class="d-flex align-content-center">
              <feather-icon
                icon="EditIcon"
                size="16"
                class="mr-50"
                :id="`edit_${data.index}`"
                style="cursor: pointer"
                @click="handle_edit(data)"
              />
              <b-tooltip :target="`edit_${data.index}`" title="修改" />
              <feather-icon
                icon="Trash2Icon"
                size="16"
                :id="`edit_${data.index}`"
                style="cursor: pointer"
              />
              <b-tooltip :target="`trash2_${data.index}`" title="修改" />
            </div>
          </template>
        </b-table>
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
                    >关键词
                  </b-form-radio>
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
              <div class="d-flex justify-content-end">
                <b-button
                  class="mr-1"
                  variant="primary"
                  :disabled="invalid"
                  type="submit"
                  >保存</b-button
                >
                <b-button variant="outline-primary" @click="handle_reset"
                  >取消</b-button
                >
              </div>
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
  BTooltip,
} from "bootstrap-vue";
import { contOptions, typeOptions, leaveOptions } from "../js/options";
import vSelect from "vue-select";
import Input from "../components/input";
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
    BTooltip,
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
      vStatus: null,
      index: null,
      sensitive: {
        type: 0,
        name: "",
        state: 0,
        feature: "",
        leave: 0,
        update: false,
      },
      controlFields: [
        {
          key: "name",
          label: "敏感名称",
        },
        {
          key: "feature",
          label: "敏感特征",
        },
        {
          key: "leave",
          label: "敏感等级",
        },
        {
          key: "actions",
          label: "操作",
          thStyle: "width:100px",
        },
      ],
      controlItem: [
        { type: 0, name: "test001", state: 0, feature: "aaaaaa", leave: 0 },
        { type: 1, name: "test002", state: 1, feature: "bbbbbb", leave: 1 },
      ],
    };
  },
  methods: {
    modal_show() {
      this.modal_add = true;
      this.vStatus = "add";
      this.sensitive = {
        type: 0,
        name: "",
        state: 0,
        feature: "",
        leave: 0,
        update: false,
      };
    },
    // 修改
    handle_edit(data) {
      this.modal_add = true;
      this.vStatus = "edit";
      this.index = data.index;
      this.sensitive = JSON.parse(JSON.stringify(data.item));
      console.log("data>>>", data);
    },
    // 新增
    handle_pre() {
      let printItem = JSON.parse(
        JSON.stringify({
          ...this.sensitive,
        })
      );
      printItem.state = Number(printItem.state);
      printItem.update = Number(printItem.update);
      if (this.vStatus == "add") {
        this.controlItem.push(printItem);
      } else if (this.vStatus == "edit") {
        this.controlItem.splice(this.index, 1, printItem);
        console.log(this.controlItem);
      }
      this.handle_reset();
    },
    // 取消
    handle_reset() {
      this.modal_add = false;
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
