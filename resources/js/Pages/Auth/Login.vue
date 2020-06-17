<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-alert v-if="$page.errors.username" type="error" showIcon style="margin-bottom: 24px;" :message="$page.errors.username[0]" />

      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="帳號"
          v-decorator="['username', {}]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密碼"
          v-decorator="['password', {}]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">記住我</a-checkbox>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >確定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import UserLayout from '@/Layouts/UserLayout'
import { timeFix } from '@/Utils/Util'

export default {
  layout: UserLayout,
  data () {
    return {
      form: this.$form.createForm(this),
      state: {
        loginBtn: false
      }
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()

      this.state.loginBtn = true

      this.form.validateFields((err, values) => {
        if (!err) {
          this.$inertia.post('/admin/login', values).then(() => {
            this.state.loginBtn = false
          })
        } else {
          setTimeout(() => {
            this.state.loginBtn = false
          }, 600)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
