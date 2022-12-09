<template>
  <b-card title="Create Awesome 🙌">
    <b-card-text>This is your second page.</b-card-text>
    <b-card-text
      >Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin. Carrot
      cake dragée chupa chups jujubes. Macaroon liquorice cookie wafer tart
      marzipan bonbon. Gingerbread jelly-o dragée chocolate.</b-card-text
    >
    <b-card-text>{{ findName(leaveOptions, 2) }}</b-card-text>
  </b-card>
</template>

<script>
import { BCard, BCardText } from "bootstrap-vue";
import { leaveOptions } from "../views/print/js/options";
export default {
  components: {
    BCard,
    BCardText,
  },
  data() {
    return {
      leaveOptions: leaveOptions,
      // array: [
      //   { key: 0, title: "低" },
      //   { key: 1, title: "中" },
      //   { key: 2, title: "高" },
      // ],
    };
  },
  mounted() {
    this.findName();
  },
  methods: {
    findName(params, key) {
      const arr = [];
      params.forEach((element) => {
        console.log(element);
        if (element.key == key) {
          arr.push(element.title);
        }
      });
      return arr;
    },
  },
};
</script>

<style>
</style>
