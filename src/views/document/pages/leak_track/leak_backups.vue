<template>
  <div class="backups">
    <h4>泄密备份</h4>
    <div>
      <b-button variant="outline-primary" @click="show_modal">添加</b-button>
      <b-modal
        size="lg"
        no-close-on-backdrop
        centered
        hide-footer
        v-model="addItems"
      >
        <div class="back_modal">
          <validation-observer ref="backForm" #default="{ invalid }">
            <b-form autocomplete="off" @submit.prevent="handle_pre">
              <b-form-group
                label="外发途径："
                label-for="outgoRoute"
                label-cols-md="auto"
              >
                <div style="width: 550px">
                  <v-select
                    :options="routeOptions"
                    :searchable="false"
                    :clearable="false"
                    :reduce="(title) => title.key"
                    label="title"
                    v-model="backup.outgo"
                  />
                </div>
              </b-form-group>
              <validation-provider
                rules="required"
                name="specifyPath"
                #default="{ errors }"
                v-show="backup.outgo == 1"
              >
                <b-form-group
                  label="指定外发途径："
                  label-for="specifyPath"
                  label-cols-md="auto"
                  :state="errors.length > 0 ? false : null"
                >
                  <div style="width: 550px">
                    <v-select
                      :options="specifyRouteOptions"
                      :searchable="false"
                      :clearable="false"
                      :close-on-select="false"
                      :reduce="(title) => title.key"
                      label="title"
                      multiple
                      v-model="backup.specifyRoute"
                    />
                  </div>
                  <small class="text-danger">{{ errors[0] }} </small>
                </b-form-group>
              </validation-provider>
              <div v-show="backup.specifyRoute.includes(5)">
                <div>
                  以下自定义进程外发文件将被会禁止，每个进程名一行，如：QQ.exe
                </div>
                <b-form-group label="" label-for="text" label-cols-md="auto">
                  <b-form-textarea
                    style="width: 550px"
                    no-resize
                    v-model="backup.customize"
                  />
                </b-form-group>
              </div>
              <b-form-group
                label="规则："
                label-for="rules"
                label-cols-md="auto"
              >
                <div style="width: 550px">
                  <v-select
                    :options="rulesOptions"
                    :searchable="false"
                    :clearable="false"
                    :reduce="(title) => title.key"
                    label="title"
                    v-model="backup.rules"
                  />
                </div>
              </b-form-group>

              <!--  -->
              <div>
                <b-form-group
                  label=""
                  label-for="fileType"
                  label-cols-md="auto"
                >
                  <b-form-checkbox v-model="backup.fileType"
                    >文件类型</b-form-checkbox
                  >
                </b-form-group>
                {{ backup.fileType }}
                <b-form-group
                  label=""
                  label-for="fileSize"
                  label-cols-md="auto"
                >
                  <b-form-checkbox v-model="backup.fileSize"
                    >文件大小</b-form-checkbox
                  >
                </b-form-group>
              </div>

              <!-- 备注 -->
              <b-form-group
                label="备注："
                label-for="remark"
                label-cols-md="auto"
              >
                <b-form-input style="width: 550px" />
              </b-form-group>
              <b-form-group
                label="是否备份："
                label-for="isBackup"
                label-cols-md="auto"
              >
                <div style="width: 550px">
                  <v-select
                    :options="isBackupOptions"
                    :searchable="false"
                    :clearable="false"
                    :reduce="(title) => title.key"
                    label="title"
                    v-model="backup.isBackup"
                  />
                </div>
              </b-form-group>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="primary"
                  class="mr-1"
                  :disabled="invalid"
                  type="submit"
                  >保存</b-button
                >
                <b-button variant="outline-primary">取消</b-button>
              </div>
            </b-form>
          </validation-observer>
        </div>
      </b-modal>
    </div>
    <b-table :fields="backFields" :items="backItems"></b-table>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import {
  BTable,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormCheckbox,
} from "bootstrap-vue";
import vSelect from "vue-select";
import {
  routeOptions,
  rulesOptions,
  isBackupOptions,
  specifyRouteOptions,
} from "../js/options";
export default {
  name: "leak_backups",
  components: {
    BTable,
    BButton,
    ValidationObserver,
    ValidationProvider,
    BForm,
    BFormGroup,
    vSelect,
    BFormInput,
    BFormTextarea,
    BFormCheckbox,
  },
  data() {
    return {
      addItems: false, //添加弹窗
      routeOptions,
      rulesOptions,
      isBackupOptions,
      specifyRouteOptions,
      backFields: [
        { key: "path", label: "外发途径" },
        { key: "rules", label: "规则" },
        { key: "remark", label: "备注" },
        { key: "isBackup", label: "是否备份" },
        { key: "status", label: "状态" },
        { key: "actions", label: "操作", thStyle: "width:100px" },
      ],
      backItems: [
        { path: "fds", rules: 0, remark: "111", isBackup: 1, status: 1 },
        { path: "qwe", rules: 1, remark: "222", isBackup: 0, status: 0 },
      ],
      backup: {
        outgo: 0, //外发途径
        rules: 0, //规则
        isBackup: 0, //是否备份
        specifyRoute: [], //指定外发路径
        customize: "",
        fileType: false,
      },
    };
  },
  methods: {
    // 展示添加弹窗
    show_modal() {
      this.addItems = true;
    },
  },
};
</script>
<style lang="scss">
.back_modal {
  .col-form-label {
    width: 120px;
  }
}
</style>