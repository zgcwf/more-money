<template>
  <Layout class-prefix="layout">
    {{ record }}
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
      record: {
        tags: [],
        notes: "",
        type: "-",
        amount: "0",
      },
    };
  },
  methods: {
    // 用于新增标签
    createtag(name) {
      if (name !== null && name !== "") {
        this.tags.push(name);
      }
    },
    // 用于更新备注内容
    updatavalue(newvalue) {
      this.record.notes = newvalue;
    },
    // 用于更新amount
    updataoutput(output) {
      this.record.amount = output;
    },
    // 用于获取被选中的标签
    updateselectedTags(selectedTags) {
      this.record.tags = selectedTags;
    },
    // 用于选择收入或者支出
    updatetype(type) {
      this.record.type = type;
    },
  },
  mounted() {
    // 接收数据
    this.$bus.$on("create", this.createtag);
    this.$bus.$on("update:value", this.updatavalue);
    this.$bus.$on("update:output", this.updataoutput);
    this.$bus.$on("update:selectedTags", this.updateselectedTags);
    this.$bus.$on("update:type", this.updatetype);
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
