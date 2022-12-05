<template>
    <validation-provider :rules="rules" :name="name" #default="{ errors }">
        <b-form-group :label="label" :label-for="labelName" label-cols-md="auto">
            <b-form-textarea no-resize :state="errors.length > 0 ? false : null" v-model="currentValue" @input="input"
                style="width: 550px" :disabled="disabled" />
            <small class="text-danger">{{ errors[0] }} </small>
        </b-form-group>
    </validation-provider>
</template>
    
    
    
<script>
import { BFormGroup, BFormTextarea, BCardText } from "bootstrap-vue";
import { ValidationProvider } from "vee-validate";
export default {
    name: "Textarea",
    components: {
        ValidationProvider,
        BFormGroup,
        BFormTextarea,
        BCardText,
    },
    props: {
        value: {
            type: String,
            default: "",
        },
        rules: {
            type: String,
            default: "",
        },
        name: {
            type: String,
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
        placeText: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
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