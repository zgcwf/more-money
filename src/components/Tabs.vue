<template>
  <ul class="tabs">
    <li
      v-for="item in dataSource"
      :key="item.value"
      :class="liClass(item)"
      @click="select(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "Tabs",
  props: ["classPrefix", "dataSource", "value"],
  data() {
    return {
      interval: "",
    };
  },
  methods: {
    liClass(item) {
      return {
        [this.classPrefix + "-tabs-item"]: this.classPrefix,
        selected: item.value === this.value,
      };
    },
    select(item) {
      this.$bus.$emit("update:interval", item.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 8px;
  font-weight: 700;
  > li {
    width: 50%;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      // 加上&表示当前元素
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
      //  不用border-bottom，因为其来回切换时界面会有轻微抖动
      //  border-bottom: 4px solid #000;
    }
  }
}
</style>