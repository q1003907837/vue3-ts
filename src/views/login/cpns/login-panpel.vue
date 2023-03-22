<template>
  <div class="login-panpel">
    <h2>管理系统:正式系统AAA</h2>
    <div>
      <el-tabs type="border-card" class="demo-tabs">
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon :size="20"><UserFilled /></el-icon>
              <span>账号登陆</span>
            </span>
          </template>
          账号登陆
        </el-tab-pane>
        <el-tab-pane label="Config">手机登录</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped>
h2 {
  margin: 0;
}
</style>
