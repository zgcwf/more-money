<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumberPad",
  data() {
    return {
      output: "0",
    };
  },
  methods: {
    inputContent(event) {
      const button = event.target;
      const input = button.textContent;
      // 获取点击事件的值
      if (this.output.length === 16) {
        return;
        // 设置字符串最大长度为16
      }
      if (this.output === "0") {
        if ("0123456789".indexOf(input) >= 0) {
          this.output = input;
          // 初始值为0，第一次点击将其替换为点击的数字
        } else {
          // 如果点击的是'.',则字符串相加变为0.
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf(".") >= 0 && input === ".") {
        // 判定如果输出结果中有'.'，并且再次点击'.'，则弹出
        return;
      }
      // 上述判断都通过，字符串相加
      this.output += input;
    },
    remove() {
      if (this.output.length === 1) {
        this.output = "0";
        // 如果长度变为1，则再次点击删除将输出值变为0
      } else {
        this.output = this.output.slice(0, -1);
        // 如果长度不为1，则删除最后一位
      }
    },
    clear() {
      this.output = "0";
    },
    ok() {
      const number = parseFloat(this.output);
      // 将字符串转换成数字
      this.$bus.$emit("update:output", number);
      this.$bus.$emit("submit", number);
      this.output = "0";
      // 点击ok后将数值变为0
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    // 引用样式
    @extend %clearFix;
    // @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 5px 16px;
    text-align: right;
    height: 64px;
    background-color: #fff;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: 64 * 2px;
        float: right;
      }
      &.zero {
        width: 25 * 2%;
      }
      // 用选择器实现颜色渐变
      $bg: #ebeff2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%); //在$bg的基础上加深%4的颜色
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>