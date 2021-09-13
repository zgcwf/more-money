<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav></Nav>
    <!-- 底部导航栏样式设计 -->
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style scoped>
/* 固定底部导航栏 */
.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex: 1;
  overflow: auto;
}
</style>