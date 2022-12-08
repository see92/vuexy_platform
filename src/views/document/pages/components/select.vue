<template>
    <validation-provider :rules="rules" :name="name" #default="{ errors }">
        <b-form-group :label="label" :label-for="labelName" label-cols-md="auto"
            :state="errors.length > 0 ? false : null">
            <div style="width: 550px">
                <v-select :searchable="false" :clearable="false" :options="options" v-model="currentValue"
                    @input="input" />
            </div>
        </b-form-group>
    </validation-provider>

</template>
    
<script>
import { BFormGroup } from "bootstrap-vue";
import vSelect from "vue-select";
export default {
    name: "Select",
    components: { BFormGroup, vSelect },
    props: {
        value: {
            type: [String, Object, Number],
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        labelName: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: "",
        },
    },
    data: () => ({
        currentValue: "",
    }),
    mounted() {
        this.currentValue = this.$props.value;
    },
    methods: {
        input() {
            this.$emit("update:value", this.currentValue);
        },
    },
    watch: {
        value(newValue) {
            this.currentValue = newValue;
        },
    },
};
</script>
    
<style lang="scss">
@import "@/assets/scss/importentStyle.scss";
</style>