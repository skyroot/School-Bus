<template lang="pug">
popup(
  :isShow="isShow"
  :blurHandle="blurHandle"
)
  log-in-form(v-if="formName==='LogIn'")
  update-info-form(v-else-if="formName==='UpdateInfo'")
  register-form(v-else-if="formName==='Register'")
  forget-pw-form(v-else-if="formName==='ForgetPw'")
</template>

<script>
import { mapState } from 'vuex'
import Popup from '@/Popup'

import LogInForm from './Form/LogInForm'
import UpdateInfoForm from './Form/UpdateInfoForm'
import RegisterForm from './Form/RegisterForm'
import ForgetPwForm from './Form/ForgetPwForm'

export default {
  name: "popup-form",
  computed: mapState({
    isShow: state => state.popForm.isShow,
    formName: state => state.popForm.formName
  }),
  methods: {
    blurHandle() {
      this.$store.commit('HIDE_POPUPFORM')
    }
  },
  components: {
    Popup, LogInForm, UpdateInfoForm, RegisterForm, ForgetPwForm
  }
}
</script>
