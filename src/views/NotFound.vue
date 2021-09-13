<template>
  <div>
    <!-- <div>当前页面不存在，请检查网址是否正确</div> -->
    <div class="error">
      <span class="aaa">404</span> <br /><br /><br /><br /><br /><br />
      <hr />
      <span class="bbb">
        <router-link to="/">返回首页</router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NotFound",
};
</script>
<style lang="scss" scoped>
.error {
  text-align: center;
  margin-top: 25px;
  height: 600px;
  .aaa {
    font-size: 200px;
    color: rgb(77, 74, 74);
    font-family: "方正舒体";
  }
  .bbb {
    font-size: 80px;
    color: white;
    font-family: "方正舒体";
  }
}
</style>