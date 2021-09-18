<template>
  <Layout>
    <Types class="x"></Types>
  </Layout>
</template>

<script>
import Types from "../components/Money/Types.vue";
export default {
  name: "Statistics",
  components: { Types },
};
</script>

<style lang="scss" scoped>
.x ::v-deep li {
  background-color: #c4c4c4;
  &.selected {
    background-color: #fff;
    &::after {
      display: none;
    }
  }
}
</style>