<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />
          <h2 class="brand-text text-primary ml-1">安在标注系统</h2>
        </b-link>

        <b-card-title class="mb-1"> 欢迎登录安在标注系统！ 👋 </b-card-title>
        <b-card-text class="mb-2"> 请输入你的手机号和验证码 </b-card-text>

        <!-- form -->
        <validation-observer ref="loginForm" #default="{ invalid }">
          <b-form class="auth-login-form mt-2" @submit.prevent>
            <!-- phone -->
            <b-form-group label-for="phone" label="手机号">
              <validation-provider
                #default="{ errors }"
                name="Phone"
                rules="required"
              >
                <b-form-input
                  id="phone"
                  v-model="phone"
                  name="login-phone"
                  type="text"
                  maxlength="11"
                  :state="errors.length > 0 ? false : null"
                  placeholder="请输入手机号"
                  autofocus
                />
                <small v-if="errors[0]" class="text-danger">请输入手机号</small>
              </validation-provider>
            </b-form-group>

            <!-- 验证码 -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="code">验证码</label>
              </div>
              <validation-provider
                #default="{ errors }"
                name="Code"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="code"
                    v-model="code"
                    class="form-control-merge mr-1"
                    :state="errors.length > 0 ? false : null"
                    name="login-code"
                    placeholder="验证码"
                  />
                  <b-button :disabled="codeDisabled" @click="getCode">
                    {{ codeMsg }}
                  </b-button>
                </b-input-group>
                <validation-provider v-if="errors[0]" class="text-danger"
                  >请输入验证码</validation-provider
                >
              </validation-provider>
            </b-form-group>
            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
              @click="handleLogin"
            >
              登录
            </b-button>
          </b-form>
        </validation-observer>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BButton,
  BForm,
  BFormInput,
  BFormGroup,
  BCard,
  BLink,
  BCardTitle,
  BCardText,
  BInputGroup,
} from "bootstrap-vue";
import Cookies from "js-cookie";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import { mapActions } from "vuex";
import { required, email } from "@validations";
import { getSmsCode, getToken } from "@/api/user";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    BInputGroup,
    // BInputGroupAppend,
    // BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      phone: "",
      code: "",
      status: "",
      max: 11,
      codeMsg: "获取验证码",
      codeTime: 10,
      codeDisabled: false, // 获取验证码按钮
      timer: null,
      // validation rules
      required,
      email,
    };
  },
  computed: {},
  methods: {
    // ...mapActions(['GetCode']),
    async getCode() {
      const phoneReg = /^1[3456789]\d{9}$/;
      if (phoneReg.test(this.phone)) {
        await getSmsCode({
          phone: this.phone,
        }).then((res) => {
          if (res.status === 200) {
            this.$bvToast.toast("验证码已发送", {
              title: "成功信息",
              variant: "success",
            });
            this.codeDisabled = true;
            this.timer = setInterval(() => {
              if (this.codeTime > 0 && this.codeTime <= 60) {
                // eslint-disable-next-line no-plusplus
                this.codeTime--;
                if (this.codeTime !== 0) {
                  this.codeMsg = `${this.codeTime}S`;
                } else {
                  clearInterval(this.timer);
                  this.codeMsg = "获取验证码";
                  this.timer = null;
                  this.codeTime = 10;
                  this.codeDisabled = false;
                }
              }
            }, 1000);
          }
        });
      } else {
        this.$bvToast.toast("请输入正确的手机号码", {
          title: "错误信息",
          variant: "danger",
        });
      }
    },
    async handleLogin() {
      // 登录按钮
      const res = await getToken({
        phone: this.phone,
        code: this.code,
      });
      if (res.status === 200) {
        const { token, expireIn: expires } = res.data;
        Cookies.set("vuexy_token", token, { expires });
      }
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>

<style lang="scss" scoped>
.input-w {
  width: 50% !important;
}
</style>
