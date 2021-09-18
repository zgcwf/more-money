<template>
  <div class="x">
    <Layout>
      <Types classPrefix="type"></Types>
      <Types classPrefix="type1"></Types>
    </Layout>
  </div>
</template>

<script>
import Types from "../components/Money/Types.vue";
export default {
  name: "Statistics",
  components: { Types },
};
</script>

<style lang="scss" scoped>
.x::v-deep .type-item {
  background-color: #c4c4c4;
  &.selected {
    background-color: #fff;
    &::after {
      display: none;
    }
  }
}
</style>