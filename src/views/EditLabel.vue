<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"></Icon>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <Notes
        placeholder="请输入标签名"
        fieldName="标签名"
        :value="tag.name"
        @update:value="update"
      ></Notes>
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>
</template>
<script>
import tagListModel from "@/models/tagListModel";
import Layout from "@/components/Layout.vue";
import Notes from "@/components/Money/Notes.vue";
import Button from "@/components/Button.vue";

export default {
  components: { Notes, Layout, Button },
  name: "EditLabel",
  data() {
    return {
      tag: "",
    };
  },
  created() {
    // 得到路由参数id
    const id = this.$route.params.id;
    tagListModel.fetch(); //读取缓存（id，name）
    const tags = tagListModel.data;
    const tag = tags.filter((tag) => tag.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace("/404");
    }
  },
  methods: {
    // 更新标签名
    update(name) {
      if (this.tag) {
        tagListModel.update(this.tag.id, name);
      }
    },
    remove() {
      // 移除标签
      if (this.tag) {
        if (tagListModel.remove(this.tag.id)) {
          // 后退
          this.$router.back();
        } else {
          window.alert("删除失败");
        }
      }
    },
    goBack() {
      // 后退
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>