<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <!-- :class动态添加类名，如果selectedTags有tag标签，则动态给其selected类 -->
      <li
        v-for="tag in dataSource"
        :key="tag"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tags",
  props: ["dataSource"],
  data() {
    return {
      selectedTags: [],
      // 通过toggle动态添加或删除标签
    };
  },
  methods: {
    toggle(tag) {
      const index = this.selectedTags.indexOf(tag);
      // 查看selectedTags中是否有点击的标签，并获得其索引
      if (index >= 0) {
        // 如果有，则删除
        this.selectedTags.splice(index, 1);
      } else {
        // 如果没有，则添加
        this.selectedTags.push(tag);
      }
      this.$bus.$emit("update:selectedTags", this.selectedTags);
    },
    create() {
      const name = window.prompt("请输入标签名");
      // console.log(name);,当点击取消是name值为null
      const index = this.dataSource.indexOf(name);
      // 查看dataSource中是否已存在该标签，并获得其索引
      if (index >= 0) {
        // 如果存在
        // this.dataSource.splice(index, 1);
        window.alert("标签名已存在");
        return;
      }
      if (name === "") {
        window.alert("标签名不能为空");
      }
      // 提供数据
      this.$bus.$emit("create", name);
    },
  },
};
// import Vue from "vue";
// import { Component, Prop } from "vue-property-decorator";
// // 搜索查看vue-property-decorator文档用法
// @Component
// export default class Tags extends Vue {
//   @Prop(Array) readonly dataSource: string[] | undefined;
//   //  typescript与javascript在写法上的区别：
//   // 1.typescript后面要跟类型
//   // 2.typescript 的 data methods 声明周期函数都直接书写
//   // 3.前面的都属于固定格式
//   selectedTags: string[] = [];
//   toggle(tag: string) {
//     const index = this.selectedTags.indexOf(tag);
//     if (index >= 0) {
//       this.selectedTags.splice(index, 1);
//     } else {
//       this.selectedTags.push(tag);
//     }
//   }

//   create() {
//     const name = window.prompt("请输入标签名");
//     if (name === "") {
//       window.alert("标签名不能为空");
//     } else if (this.dataSource) {
//       this.$emit("update:dataSource", [...this.dataSource, name]);
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  flex-direction: column-reverse;
  justify-content: space-between;
  > .current {
    display: flex;
    flex-wrap: wrap;
    max-height: 100px;
    overflow: auto;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h * 0.3333;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>