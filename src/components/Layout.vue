<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <!-- 如果有classPrefix，则执行`${classPrefix}-wrapper` -->
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav></Nav>
    <!-- 底部导航栏样式设计 -->
  </div>
</template>

<script lang="ts">
export default {
  props: ["classPrefix"],
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>