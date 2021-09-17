<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <!-- :class动态添加类名，如果selectedTags有tag标签，则动态给其selected类 -->
      <li
        v-for="tag in dataSource"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        {{ tag.name }}
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
    createTag() {
      const name = window.prompt("请输入标签名");
      // 得到输入值name，如果name不为空，执行下面语句
      if (!name) {
        return window.alert("标签名不能为空");
      }
      this.$store.commit("createTags", name);
    },
  },
};
</script>

<style lang="scss" scoped>
.tags {
  background-color: #fff;
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