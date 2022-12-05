<template>
  <div class="setting">
    <b-row>
      <b-col cols="7">
        <Input
          rules="required"
          label="策略名称："
          labelName="policy_name"
          name="policy_name"
          placeText="请输入策略名称"
          type="text"
          :value.sync="setting.policy_name"
        />
      </b-col>

      <b-col cols="7">
        <b-form-group
          label="生效终端："
          label-for="effective_item"
          label-cols-md="auto"
        >
          <div style="width: 550px">
            <v-select
              :searchable="false"
              :clearable="false"
              :options="eff_item"
              v-model="setting.eff_item"
            />
          </div>
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group
          label="生效时间："
          label-for="eff_time"
          label-cols-md="auto"
        >
          <div style="width: 550px">
            <v-select
              :searchable="false"
              :clearable="false"
              :options="eff_time"
              v-model="setting.eff_time"
            />
          </div>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, BFormGroup } from "bootstrap-vue";
import Input from "./components/input.vue";
import { required } from "@validations";
import vSelect from "vue-select";
import { eff_item, eff_time } from "./js/options";
export default {
  name: "setting",
  components: {
    BRow,
    BCol,
    Input,
    BFormGroup,
    vSelect,
  },
  data() {
    return {
      required,
      eff_item: eff_item,
      eff_time: eff_time,
      setting: {
        policy_name: "",
        eff_item: { key: 0, label: "全部终端生效" },
        eff_time: { key: 0, label: "全部时间" },
      },
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>