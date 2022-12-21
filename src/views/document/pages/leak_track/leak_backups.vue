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
              <!-- <validation-provider
                rules="required"
                name="specifyPath"
                #default="{ errors }"
                v-show="backup.outgo == 1"
              > -->
              <b-form-group
                label="指定外发途径："
                label-for="specifyPath"
                label-cols-md="auto"
                v-show="backup.outgo == 1"
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
                <!-- <small class="text-danger">{{ errors[0] }} </small> -->
              </b-form-group>
              <!-- </validation-provider> -->
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
              <div v-show="backup.rules == 1">
                <b-form-group
                  label=""
                  label-for="fileType"
                  label-cols-md="auto"
                >
                  <b-form-checkbox v-model="backup.fileType"
                    >文件类型</b-form-checkbox
                  >
                </b-form-group>
                <b-form-group
                  label=""
                  label-for="fileSize"
                  label-cols-md="auto"
                >
                  <b-form-checkbox v-model="backup.fileSize"
                    >文件大小</b-form-checkbox
                  >
                </b-form-group>
                <div
                  style="width: 670px"
                  class="d-flex justify-content-between"
                >
                  <div style="margin-right: 5px">
                    <el-input-number
                      style="margin: 0 0 15px 120px; width: 150px"
                      v-model="backup.minNum"
                      controls-position="right"
                      :min="0"
                      :max="16777216"
                      :disabled="!backup.fileSize"
                    />
                  </div>
                  <div class="vSelect mr-1">
                    <v-select
                      :options="unitOptions"
                      :searchable="false"
                      :clearable="false"
                      :reduce="(title) => title.key"
                      label="title"
                      v-model="backup.minUnit"
                      :disabled="!backup.fileSize"
                    />
                  </div>
                  <span style="color: black; height: 50px; line-height: 40px"
                    >-</span
                  >
                  <div class="ml-1" style="margin-right: 5px">
                    <el-input-number
                      style="width: 150px"
                      v-model="backup.maxNum"
                      controls-position="right"
                      :min="1"
                      :max="16777216"
                      :disabled="!backup.fileSize"
                    />
                  </div>
                  <div class="vSelect">
                    <v-select
                      :options="unitOptions"
                      :searchable="false"
                      :clearable="false"
                      :reduce="(title) => title.key"
                      label="title"
                      v-model="backup.maxUnit"
                      :disabled="!backup.fileSize"
                    />
                  </div>
                </div>
              </div>

              <!-- 备注 -->
              <b-form-group
                label="备注："
                label-for="remark"
                label-cols-md="auto"
              >
                <b-form-input style="width: 550px" v-model="backup.remark" />
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
              <b-form-group
                label="状态："
                label-for="status"
                label-cols-md="auto"
              >
                <div style="width: 550px">
                  <v-select
                    :options="statusOptions"
                    :searchable="false"
                    :clearable="false"
                    :reduce="(title) => title.key"
                    label="title"
                    v-model="backup.status"
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
                <b-button variant="outline-primary" @click="handle_reset"
                  >取消</b-button
                >
              </div>
            </b-form>
          </validation-observer>
        </div>
      </b-modal>
    </div>
    <b-table :fields="backFields" :items="backItems">
      <template #cell(outgo)="data">
        <span class="text-nowrap" v-if="data.item.outgo === 0">所有途径</span>
        <span class="text-nowrap" v-if="data.item.outgo === 1">
          {{ addDiskType(specifyRouteOptions, data.item.specifyRoute) }}
        </span>
      </template>
      <template #cell(rules)="data">
        <span class="text-nowrap"
          >{{ data.item.rules == 0 ? "全部文件" : "复合规则" }}
        </span>
      </template>
      <template #cell(isBackup)="data">
        <span class="text-nowrap">
          {{ data.item.isBackup === 0 ? "备份" : "不备份" }}
        </span>
      </template>

      <template #cell(status)="data">
        <span class="text-nowrap">
          {{ data.item.status === 0 ? "关闭" : "开启" }}
        </span>
      </template>

      <template #cell(action)="data">
        <div class="d-flex align-items-center">
          <feather-icon
            icon="EditIcon"
            size="16"
            style="cursor: pointer"
            :id="`edit_${data.index}`"
            @click.stop="handle_edit(data)"
            class="mr-50"
          />
          <b-tooltip :target="`edit_${data.index}`" title="编辑信息" />
          <feather-icon
            icon="Trash2Icon"
            size="16"
            style="cursor: pointer"
            :id="`Trash2_${data.index}`"
            @click.stop="handle_del(data.index)"
          />
          <b-tooltip :target="`Trash2_${data.index}`" title="删除信息" />
        </div>
      </template>
    </b-table>
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
  BTooltip,
} from "bootstrap-vue";
import vSelect from "vue-select";
import {
  routeOptions,
  rulesOptions,
  isBackupOptions,
  specifyRouteOptions,
  unitOptions,
  statusOptions,
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
    BTooltip,
  },
  data() {
    return {
      addItems: false, //添加弹窗
      routeOptions,
      rulesOptions,
      isBackupOptions,
      specifyRouteOptions,
      unitOptions,
      statusOptions,
      backFields: [
        { key: "outgo", label: "外发途径" },
        { key: "rules", label: "规则" },
        { key: "remark", label: "备注" },
        { key: "isBackup", label: "是否备份" },
        { key: "status", label: "状态" },
        { key: "action", label: "操作", thStyle: "width:100px" },
      ],
      backItems: [
        {
          outgo: 1,
          specifyRoute: [1, 2],
          rules: 0,
          remark: "111",
          isBackup: 1,
          status: 1,
        },
      ],
      backup: {
        outgo: 0, //外发途径
        rules: 0, //规则
        isBackup: 0, //是否备份
        specifyRoute: [], //指定外发路径
        customize: "",
        fileType: false,
        minNum: 0, //最小值
        maxNum: 100, //最大值
        minUnit: 1, //最小值单位
        maxUnit: 1, //最大值单位
        status: 0,
      },
      vStatus: null,
      index: null,
    };
  },
  methods: {
    // 展示添加弹窗
    show_modal() {
      this.addItems = true;
      this.vStatus = "add";
      this.backup = {
        outgo: 0,
        rules: 0,
        isBackup: 0,
        specifyRoute: [],
        customize: "",
        fileType: false,
        minNum: 0,
        maxNum: 100,
        minUnit: 1,
        maxUnit: 1,
        status: 0,
      };
    },
    // 取消弹窗
    handle_reset() {
      this.addItems = false;
    },
    // 修改泄密备份
    handle_edit(data) {
      this.show_modal();
      this.vStatus = "edit";
      this.backup = JSON.parse(JSON.stringify(data.item));
      this.index = data.index;
    },
    // 新增信息
    handle_pre() {
      let backItem = { ...this.backup };
      backItem.fileType = Number(backItem.fileType);
      console.log(backItem, "<<<<backItem");
      if (this.vStatus === "add") {
        this.backItems.push(backItem);
      } else if (this.vStatus === "edit") {
        this.backItems.splice(this.index, 1, backItem);
      }
      this.handle_reset();
    },

    // 回显多选框内容
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
.back_modal {
  .col-form-label {
    width: 120px;
  }
}
.vSelect {
  .vs__dropdown-toggle {
    width: 100px;
    height: 40px;
  }
}
</style>