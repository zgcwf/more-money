<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"></Icon>
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"></Icon>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"></Icon>
      统计
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
/* 底部导航栏样式设计*/
@import "~@/assets/style/helper.scss";
nav {
  display: flex;
  justify-content: space-around;
  @extend %outerShadow;
  flex-direction: row;
  font-size: 12px;
  > .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    color: $color-highlight;
  }
}
</style>