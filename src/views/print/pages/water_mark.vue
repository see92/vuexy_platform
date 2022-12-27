<template>
  <div>
    <b-form>
      <b-row>
        <b-col cols="7">
          <b-form-group
            label="水印规则："
            label-for="rules"
            label-cols-md="auto"
          >
            <div style="width: 550px">
              <v-select />
            </div>
          </b-form-group>
        </b-col>
        <b-col cols="7">
          <b-form-group
            label="效果预览"
            label-for="preview"
            label-cols-md="auto"
          >
          </b-form-group>
          <div class="box"></div>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { BForm, BRow, BCol, BFormGroup } from "bootstrap-vue";
import vSelect from "vue-select";
export default {
  name: "waterMark",
  components: { BForm, BRow, BCol, BFormGroup, vSelect },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.box {
  width: 630px;
  height: 550px;
  border: 1px solid #000;
}
</style>