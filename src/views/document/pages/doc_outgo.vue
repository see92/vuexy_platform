<template>
  <div class="outgo">
    <div class="d-flex">
      <b-button variant="outline-primary" @click="show_modal">添加</b-button>
      <!-- !!!弹窗 -->
      <b-modal
        size="lg"
        no-close-on-backdrop
        centered
        hide-footer
        v-model="showModal"
      >
        <div class="form">
          <!-- 应用 -->
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
          <!-- 添加规则 -->
          <div v-show="this.control.rules == 1">
            <!-- 文件类型 -->
            <b-form-group label="" label-for="" label-cols-md="auto">
              <b-form-checkbox v-model="control.fileType">
                文件类型
              </b-form-checkbox>
            </b-form-group>
            <b-form-group label="" label-for="" label-cols-md="auto">
              <div style="width: 550px">
                <v-select
                  :disabled="!control.fileType"
                  :reduce="(title) => title.key"
                  label="title"
                />
                <!-- !!!  此处点击后应该弹窗选择文件类型,后期补充 -->
              </div>
            </b-form-group>
            <!-- 文件大小 -->
            <b-form-group label="" label-for="" label-cols-md="auto">
              <b-form-checkbox v-model="control.fileSize">
                文件大小
              </b-form-checkbox>
            </b-form-group>
            <b-form-group label="" label-for="" label-cols-md="auto">
              <div style="width: 550px" class="d-flex justify-content-between">
                <div style="margin-right: 5px">
                  <el-input-number
                    style="width: 150px"
                    controls-position="right"
                    v-model="control.minNum"
                    :min="0"
                    :max="16777216"
                    :disabled="!control.fileSize"
                  />
                </div>
                <div class="mr-1 vSelect">
                  <v-select
                    :options="unitOptions"
                    :searchable="false"
                    :clearable="false"
                    :reduce="(title) => title.key"
                    label="title"
                    v-model="control.minUnit"
                    :disabled="!control.fileSize"
                  />
                </div>
                <span class="wire mr-1">-</span>
                <div style="margin-right: 5px">
                  <el-input-number
                    style="width: 150px"
                    controls-position="right"
                    v-model="control.maxNum"
                    :min="0"
                    :max="16777216"
                    :disabled="!control.fileSize"
                  />
                </div>
                <div class="vSelect">
                  <v-select
                    :options="unitOptions"
                    :searchable="false"
                    :clearable="false"
                    :reduce="(title) => title.key"
                    label="title"
                    v-model="control.maxUnit"
                    :disabled="!control.fileSize"
                  />
                </div>
              </div>
            </b-form-group>
            <b-form-group label="" label-for="" label-cols-md="auto">
              <b-form-checkbox v-model="control.fileSensitive"
                >文件敏感项</b-form-checkbox
              >
            </b-form-group>
            <b-form-group label="" label-for="" label-cols-md="auto">
              <div style="width: 550px">
                <v-select
                  :reduce="(title) => title.key"
                  label="title"
                  :disabled="!control.fileSensitive"
                />
              </div>
            </b-form-group>
            <!-- !!!此处点击下拉框后显示要选择的敏感项 后期补充 -->
          </div>
          <!-- 备注 -->
          <b-form-group label="备注：" label-for="remark" label-cols-md="auto">
            <b-form-input v-model="control.remark" style="width: 550px" />
          </b-form-group>
          <!-- 外发 -->
          <b-form-group
            label="是否外发："
            label-for="outgo"
            label-cols-md="auto"
          >
            <div style="width: 550px">
              <v-select
                :options="outgoOptions"
                :searchable="false"
                :clearable="false"
                :reduce="(title) => title.key"
                label="title"
                v-model="control.outgo"
              />
            </div>
          </b-form-group>
          <!-- 状态 -->
          <b-form-group label="状态：" label-for="status" label-cols-md="auto">
            <div style="width: 550px">
              <v-select
                :options="statusOptions"
                :searchable="false"
                :clearable="false"
                :reduce="(title) => title.key"
                label="title"
                v-model="control.status"
              />
            </div>
          </b-form-group>
        </div>
        <div class="d-flex justify-content-end">
          <b-button variant="primary" class="mr-1" @click="handle_save"
            >保存</b-button
          >
          <b-button variant="outline-primary" @click="handle_reset"
            >取消</b-button
          >
        </div>
      </b-modal>
    </div>
    <div>
      <b-table :fields="titleList" :items="msgItem">
        <template #cell(app)="data">
          {{ findFileType(specifyRouteOptions, data.item.app) }}
        </template>
        <template #cell(rules)="data">
          <span>
            {{ data.item.rules == 0 ? "全部文件" : "符合规则" }}
          </span>
        </template>
        <template #cell(outgo)="data">
          <span>{{ data.item.outgo == 0 ? "拒绝外发" : "允许外发" }}</span>
        </template>
        <template #cell(status)="data">
          <span>{{ data.item.status == 0 ? "停用" : "启用" }} </span>
        </template>
        <template #cell(actions)="data">
          <div class="d-flex align-items-center">
            <feather-icon
              icon="EditIcon"
              size="16"
              style="cursor: pointer"
              :id="`edit_${data.index}`"
              class="mr-50"
              @click="handle_edit(data)"
            />
            <b-tooltip :target="`edit_${data.index}`" title="编辑信息" />
            <feather-icon
              icon="Trash2Icon"
              size="16"
              style="cursor: pointer"
              :id="`Trash2_${data.index}`"
              @click="handle_del(data.index)"
            />
            <b-tooltip :target="`Trash2_${data.index}`" title="删除信息" />
          </div>
          <Modal :ModalFlag.sync="ModalFlag">
            <b-button variant="danger" class="mr-1" @click="del_item" slot="ok">
              确定
            </b-button>
            <b-button variant="outline-danger" @click="del_reset" slot="cancel"
              >取消</b-button
            >
          </Modal>
        </template>
      </b-table>
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
  BFormInput,
  BTable,
  BTooltip,
} from "bootstrap-vue";
import Input from "./components/b-input.vue";
import vSelect from "vue-select";
import {
  specifyRouteOptions,
  rulesOptions,
  unitOptions,
  outgoOptions,
  statusOptions,
} from "./js/options";
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
    BFormInput,
    BTable,
    BTooltip,
    Modal: () => import("@/views/components/del_modal.vue"),
  },
  data() {
    return {
      showModal: false, //弹窗
      specifyRouteOptions, //应用选项
      rulesOptions, //规则选项
      unitOptions, //文件大小选项
      outgoOptions, //是否允许外发选项
      statusOptions, //状态选项
      vStatus: null, //用于判断是新增还是修改
      index: null, //用于修改时确定当前index索引
      ModalFlag: false, //删除弹窗
      delItemId: null, //删除id
      control: {
        app: [],
        custom: "",
        rules: 0,
        fileType: false, //文件类型
        fileSize: false, //文件大小
        minNum: 0, //最小值
        minUnit: 1, //最小单位
        maxNum: 100, //最大值
        maxUnit: 1, //最大单位
        fileSensitive: false, //文件敏感项
        remark: "", //备注
        outgo: 0, //是否外发
        status: 0, //状态
      },
      titleList: [
        { key: "app", label: "应用" },
        { key: "rules", label: "规则" },
        { key: "remark", label: "备注" },
        { key: "outgo", label: "外发操作" },
        { key: "status", label: "状态" },
        {
          key: "actions",
          label: "操作",
          thStyle: "width:100px",
        },
      ],
      msgItem: [
        { app: [0, 1, 2], rules: 0, outgo: 1, remark: "123", status: 0 },
      ],
    };
  },
  methods: {
    show_modal() {
      this.showModal = true;
      this.vStatus = "add";
      (this.control = {
        app: [],
        custom: "",
        rules: 0,
        fileType: false, //文件类型
        fileSize: false, //文件大小
        minNum: 0, //最小值
        minUnit: 1, //最小单位
        maxNum: 100, //最大值
        maxUnit: 1, //最大单位
        fileSensitive: false, //文件敏感项
        remark: "", //备注
        outgo: 0, //是否外发
        status: 0, //状态
      }),
        console.log(this.vStatus, "<<<<vStatus");
    },
    // 获取回显数据
    handle_edit(data) {
      this.show_modal();
      this.vStatus = "edit";
      this.control = JSON.parse(JSON.stringify(data.item));
      this.control.fileType = Boolean(this.control.fileType);
      this.control.fileSize = Boolean(this.control.fileSize);
      this.control.fileSensitive = Boolean(this.control.fileSensitive);
      this.index = data.index;
    },
    handle_save() {
      let newItem = { ...this.control };
      newItem.fileType = Number(newItem.fileType);
      newItem.fileSensitive = Number(newItem.fileSensitive);
      newItem.fileSize = Number(newItem.fileSize);
      if (this.vStatus == "add") {
        this.msgItem.push(newItem);
        console.log(newItem);
      } else if (this.vStatus == "edit") {
        this.msgItem.splice(this.index, 1, newItem);
      }
      this.handle_reset();
    },
    handle_reset() {
      this.showModal = false;
    },
    handle_del(index) {
      console.log("111");
      // console.log(index, "index");
      this.ModalFlag = true;
      console.log(this.ModalFlag, "flag");
      // this.delItemId = index;
    },
    del_item() {
      this.msgItem.splice(this.delItemId, 1);
      this.handle_reset;
    },
    del_reset() {
      this.ModalFlag = false;
    },
    findFileType(params, val) {
      let key = val;
      let items = [];
      console.log(">>key", key);
      // foreach循环每一项
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
.form {
  .col-form-label {
    width: 120px;
  }
  .wire {
    height: 30px;
    line-height: 30px;
    color: #000;
  }
}
</style>