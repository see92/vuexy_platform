<template>
  <div class="analyze">
    <h4>敏感内容分析</h4>
    <div class="anal_bForm">
      <b-form-group>
        <b-form-checkbox v-model="anal.content">敏感内容</b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <div style="width: 550px">
          <v-select
            :disabled="!this.anal.content"
            :searchable="false"
            :clearable="false"
            :reduce="(title) => title.key"
            :options="contentOptions"
            v-model="anal.analyze"
            label="title"
          />
        </div>
      </b-form-group>
      {{ anal.analyze }}
      <div class="table">
        <b-table :fields="analyzeFields" :items="analyzeItem">
          <template #cell(leave)="data">
            {{
              data.item.leave == 0
                ? "普通"
                : data.item.leave == 1
                ? "轻微"
                : data.item.leave == 2
                ? "严重"
                : data.item.leave == 3
                ? "机密"
                : "绝密"
            }}
          </template>
        </b-table>
      </div>
      <b-form-group>
        <b-form-checkbox v-model="anal.file">
          若文件中含有敏感内容立即备份
        </b-form-checkbox>
      </b-form-group>
    </div>
  </div>
</template>
<script>
import { BFormGroup, BFormCheckbox, BTable } from "bootstrap-vue";
import vSelect from "vue-select";
import { contentOptions } from "../js/options";
export default {
  name: "leak_analyze",
  components: { BFormGroup, BFormCheckbox, vSelect, BTable },
  data() {
    return {
      contentOptions: contentOptions,
      anal: {
        content: true,
        analyze: 0,
        file: true,
      },
      analyzeFields: [
        { key: "name", label: "名称" },
        { key: "leave", label: "敏感级别" },
        { key: "condition", label: "数据条件" },
      ],
      analyzeItem: [
        { name: "张三", leave: 1, condition: "关键词：犬;关键词：猫;" },
      ],
    };
  },
};
</script>