<template>
  <Layout>
    <div>
      <Icon name="left"></Icon>
      <span> 编辑标签 </span>
    </div>
  </Layout>
</template>
<script>
import tagListModel from "@/models/tagListModel";
import Layout from "@/components/Layout.vue";
export default {
  components: { Layout },
  name: "EditLabel",
  data() {
    return {};
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