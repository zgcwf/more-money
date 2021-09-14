<template>
  <Layout class-prefix="layout">
    <NumberPad></NumberPad>
    <Notes></Notes>
    <Tags :dataSource="tags"></Tags>
    <!-- <Tags :data-source.sync="tags" /> -->
    <Types></Types>
  </Layout>
</template>

<script>
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
export default {
  name: "Money",
  components: {
    Types,
    NumberPad,
    Notes,
    Tags,
  },
  data() {
    return {
      tags: ["衣", "食", "住", "行", "彩票"],
    };
  },
  methods: {
    demo(name) {
      if (name !== null && name !== "") {
        this.tags.push(name);
      }
    },
  },
  mounted() {
    // 接收数据
    this.$bus.$on("create", this.demo);
  },
  beforeDestroy() {
    this.$bus.$off("hello");
  },
};
</script>

<style >
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
