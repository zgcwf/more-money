<template>
  <div>
    <ul class="types">
      <li :class="type === '-' ? 'selected' : ''" @click="selectType('-')">
        <!-- :class绑定一个js表达式 -->
        支出
      </li>
      <li :class="type === '+' && 'selected'" v-on:click="selectType('+')">
        收入
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Types",
  data() {
    return {
      type: "-",
    };
  },
  methods: {
    selectType(type) {
      if (type !== "-" && type !== "+") {
        throw new Error("type is unknown");
      }
      this.type = type;
      this.$bus.$emit("update:type", this.type);
    },
  },
};
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 62px;
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