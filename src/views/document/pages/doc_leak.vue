<template>
  <div class="leak">
    <leak_set />
    <leak_backups />
    <leak_analyze />
  </div>
</template>

<script>
import {} from "bootstrap-vue";
import leak_set from "./leak_track/leak_set.vue";
import leak_backups from "./leak_track/leak_backups.vue";
import leak_analyze from "./leak_track/leak_analyze.vue";
export default {
  name: "leak",
  components: { leak_set, leak_backups, leak_analyze },
  data() {
    return {};
  },
};
</script>