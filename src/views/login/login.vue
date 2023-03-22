<template>
  <div class="login">
    <LoginPanpel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanpel from './cpns/login-panpel.vue'
export default defineComponent({
  components: {
    LoginPanpel
  },
  compoents: {},
  setup() {
    return {}
  }
})
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url(@/static/svg/wave.svg);
  background-size: 100% 100%;
}
</style>
