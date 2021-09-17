<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="createTag"> 新建标签 </Button>
    </div>
  </Layout>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  name: "Labels",
  components: { Button },
  created() {
    this.$store.commit("fetchTags"); //创建时读取缓存
  },
  computed: {
    tags() {
      return this.$store.state.tagList;
    },
  },

  methods: {
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
  background: white;
  font-size: 16px;
  padding-left: 16px;
  max-height: 70vh;
  overflow: auto;
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
