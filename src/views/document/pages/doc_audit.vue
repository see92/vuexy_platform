<template>
  <div class="audit">
    <div>
      {{ flag }}
      <b-form-checkbox v-model="flag"> 点击 </b-form-checkbox>
    </div>
    <b-row>
      <b-col cols="7">
        {{ doc.audit }}
        <div>
          <b-form-radio
            :disabled="!this.flag"
            plain
            v-model="doc.audit"
            :value="0"
            >审计所有类型文件</b-form-radio
          >
        </div>
      </b-col>
      <b-col cols="7">
        <div>
          <b-form-radio
            :disabled="!this.flag"
            v-model="doc.audit"
            plain
            :value="1"
          >
            文件操作审计只审计以下类型文件(如：*.doc,每种类型一行)
          </b-form-radio>
        </div>
      </b-col>
      <b-col cols="7">
        <b-form-group label="" label-for="text" label-cols-md="auto">
          <b-form-textarea
            :disabled="!this.flag == false && doc.audit == 1 ? false : true"
            style="width: 550px; height: 300px"
            no-resize
            v-model="doc.text"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  BFormCheckbox,
  BRow,
  BCol,
  BFormRadio,
  BFormGroup,
  BFormTextarea,
} from "bootstrap-vue";
export default {
  name: "audit",
  components: {
    BFormCheckbox,
    BRow,
    BCol,
    BFormRadio,
    BFormGroup,
    BFormTextarea,
  },
  data() {
    return {
      flag: true,
      doc: {
        audit: "0",
        text: "",
      },
      ms: "",
    };
  },
};
</script>