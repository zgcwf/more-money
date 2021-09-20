<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
// 引入样式
@import "~@/assets/style/helper.scss";
@import "./assets/style/reset.scss";
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background: #ebeff2;
}
#app {
  max-width: 500px;
  margin: 0 auto;
  background: #c4c4c4;
}
</style>
