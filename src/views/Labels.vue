<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.id }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag"> 新建标签 </Button>
    </div>
  </Layout>
</template>

<script>
import tagListModel from "@/models/tagListModel";

export default {
  name: "Labels",
  data() {
    return {
      tags: tagListModel.data,
    };
  },
  methods: {
    createTag() {
      const name = window.prompt("请输入标签名");
      // 得到输入值name，如果name不为空，执行下面语句
      if (name) {
        const message = tagListModel.create(name);
        // 调用tagListModel.create（）方法并吧name传入
        if (message === "duplicated") {
          window.alert("标签名重复了");
        } else if (message === "success") {
          window.alert("添加成功");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
