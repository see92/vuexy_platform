<template>
  <div class="control">
    <div>
      <b-form-checkbox v-model="flag"> 点击 </b-form-checkbox>
    </div>
    <div class="d-flex">
      <b-button :disabled="!this.flag" variant="primary" @click="handle_modal"
        >添加</b-button
      >
      <b-modal
        size="lg"
        no-close-on-backdrop
        centered
        hide-footer
        v-model="addItems"
      >
        <div class="cont_modal">
          <validation-observer ref="contForm" #default="{ invalid }">
            <b-form autocomplete="off" @submit.prevent="handle_pre">
              <div class="mb-2">设置指定路径的文件的操作权限，如：C:\123\*</div>
              <Input
                rules="required"
                name="path"
                label="路径："
                labelName="path"
                type="text"
                :value.sync="cont.path"
              />
              <validation-provider
                rules="required"
                name="permissions"
                #default="{ errors }"
              >
                <b-form-group
                  label="操作权限："
                  label-for="permissions"
                  label-cols-md="auto"
                  :state="errors.length > 0 ? false : null"
                >
                  <div style="width: 550px">
                    <v-select
                      :options="permissions"
                      :searchable="false"
                      :clearable="false"
                      :close-on-select="false"
                      :reduce="(title) => title.key"
                      multiple
                      label="title"
                      v-model="cont.per"
                    />
                    {{ cont.per }}
                  </div>
                  <small class="text-danger">{{ errors[0] }} </small>
                </b-form-group>
              </validation-provider>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="primary"
                  class="mr-1"
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
    </div>
    <div>
      <b-table
        :fields="cont_fields"
        :items="cont_items"
        @row-clicked="viewInfo"
      >
        <template #cell(operation_permissions)="data">
          {{ addDiskType(permissions, data.item.per) }}
        </template>
        <template #cell(actions)="data">
          <div class="d-flex align-items-center">
            <feather-icon
              size="16"
              icon="EditIcon"
              class="mr-50"
              style="cursor: pointer"
              :id="`edit_${data.index}`"
              @click="handle_edit(data)"
            />
            <b-tooltip :target="`edit_${data.index}`" />
            <feather-icon
              size="16"
              icon="Trash2Icon"
              style="cursor: pointer"
              :id="`trash_${data.index}`"
              @click.stop="handle_del(data.index)"
            />
          </div>
          <b-modal
            size="sm"
            title="提示："
            v-model="modal_del"
            centered
            no-close-on-backdrop
            hide-footer
          >
            <div>此操作将会删除数据，是否继续？</div>
            <div class="d-flex justify-content-end">
              <b-button class="mr-1" variant="danger" @click="del_item"
                >确定</b-button
              >
              <b-button variant="outline-danger">删除</b-button>
            </div>
          </b-modal>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import {
  BButton,
  BTable,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BTooltip,
} from "bootstrap-vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { permissions } from "./js/options";
import Input from "./components/input.vue";
import vSelect from "vue-select";
export default {
  name: "control",
  components: {
    BButton,
    BTable,
    BModal,
    BForm,
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    Input,
    vSelect,
    BFormCheckbox,
    BTooltip,
  },
  data() {
    return {
      modal_del: false, //  删除弹窗
      delItemId: null, //删除ID
      vStatus: null,
      flag: true,
      addItems: false,
      index: null,
      permissions: permissions, //操作权限
      cont_fields: [
        { key: "path", label: "文件路径" },
        { key: "operation_permissions", label: "操作权限" },
        { key: "actions", label: "操作" },
      ],
      cont_items: [{ path: "csdfsfs", per: [0, 1] }],
      cont: {
        path: "",
        per: [],
      },
    };
  },
  methods: {
    viewInfo() {},
    // 添加弹窗
    handle_modal() {
      this.vStatus = "add";
      this.addItems = true;
      this.cont = {
        path: "",
        per: [],
      };
    },

    // 修改
    handle_edit(data) {
      this.handle_modal();
      this.cont = JSON.parse(JSON.stringify(data.item));
      this.index = data.index;
      this.vStatus = "edit";
    },
    // 新增
    handle_pre() {
      let contItem = { ...this.cont };
      if (this.vStatus == "add") {
        this.cont_items.push(contItem);
      } else if (this.vStatus == "edit") {
        this.cont_items.splice(this.index, 1, contItem);
      }
      this.handle_reset();
    },
    // 删除弹窗
    handle_del(index) {
      this.modal_del = true;
      this.delItemId = index;
      console.log(this.delItemId, "idddddd");
    },
    // 删除
    del_item() {
      this.cont_items.splice(this.delItemId, 1);
      this.handle_reset();
    },
    //  关闭弹窗
    handle_reset() {
      this.cont = {
        path: "",
        per: [0, 1, 2],
      };
      this.addItems = false;
    },
    fn(params) {
      return params.toString();
    },
    // 回显多选框
    addDiskType(params, val) {
      let key = val;
      let items = [];
      params.forEach((item) => {
        key.forEach((each) => {
          if (item.key == each) {
            items.push(item.title);
          }
        });
      });
      return items.toString();
    },
  },
};
</script>

<style lang="scss">
.cont_modal {
  .col-form-label {
    width: 100px;
  }
}
</style>