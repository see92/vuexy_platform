<template>
  <div class="set">
    <h4>常规设置</h4>
    <div class="bForm">
      <b-form-group>
        <b-form-checkbox v-model="leak_set.check">
          发现泄密时截屏
        </b-form-checkbox>
      </b-form-group>
      {{ leak_set.check }}
      <b-form-group
        label="截屏次数："
        label-for="frequency"
        label-cols-md="auto"
      >
        <el-input-number
          :min="1"
          v-model="leak_set.frequency"
          controls-position="right"
          :disabled="!this.leak_set.check"
        />
      </b-form-group>
      {{ leak_set.frequency }}
      <b-form-group
        label="截屏间隔（s）:"
        label-for="interval"
        label-cols-md="auto"
      >
        <el-input-number
          :min="1"
          v-model="leak_set.interval"
          controls-position="right"
          :disabled="!this.leak_set.check"
        />
      </b-form-group>
      <b-form-group>
        <b-form-checkbox v-model="leak_set.warn">
          发现泄密时告警
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <div style="width: 550px">
          <v-select
            :disabled="!leak_set.warn"
            :searchable="false"
            :clearable="false"
            :options="warnOptions"
            :reduce="(title) => title.key"
            label="title"
            v-model="leak_set.choice"
          />
        </div>
      </b-form-group>
      <div v-if="this.leak_set.warn && this.leak_set.choice == 0">
        <b-form-group
          label="告警指定时间（秒）："
          label-for="warn-time"
          label-cols-md="auto"
        >
          <el-input-number
            :min="1"
            controls-position="right"
            v-model="leak_set.warn_time"
          />
        </b-form-group>
        <b-form-group
          label="告警指定文件（个）："
          label-for="warn-num"
          label-cols-md="auto"
        >
          <el-input-number
            :min="1"
            controls-position="right"
            v-model="leak_set.warn_num"
          />
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import { BFormGroup, BFormCheckbox } from "bootstrap-vue";
import vSelect from "vue-select";
import { warnOptions } from "../js/options";
export default {
  name: "leak_set",
  components: { BFormGroup, BFormCheckbox, vSelect },
  data() {
    return {
      warnOptions: warnOptions,
      leak_set: {
        check: true,
        frequency: 1,
        interval: 1,
        warn: true,
        choice: 0,
        warn_time: 30,
        warn_num: 10,
      },
    };
  },
};
</script>

<style lang="scss">
.bForm {
  .col-form-label {
    width: 160px;
  }
}
</style>