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
      recordList: JSON.parse(localStorage.getItem("recordList")) || [],
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
    // 用于点击ok后将record放入数组recordlist
    saveRecord() {
      // 深拷贝
      const record2 = JSON.parse(JSON.stringify(this.record));
      this.recordList.push(record2);
    },
  },
  // 一旦recordlist改变，则将其缓存
  watch: {
    recordList: {
      deep: true,
      handler() {
        localStorage.setItem("recordList", JSON.stringify(this.recordList));
      },
    },
  },
  mounted() {
    // 接收数据
    this.$bus.$on("create", this.createtag);
    this.$bus.$on("update:value", this.updatavalue);
    this.$bus.$on("update:output", this.updataoutput);
    this.$bus.$on("update:selectedTags", this.updateselectedTags);
    this.$bus.$on("update:type", this.updatetype);
    this.$bus.$on("submit", this.saveRecord);
  },
  beforeDestroy() {
    this.$bus.$off("create");
    this.$bus.$off("update:value");
    this.$bus.$off("update:output");
    this.$bus.$off("update:selectedTags");
    this.$bus.$off("update:type");
    this.$bus.$off("submit");
  },
};
</script>

<style >
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
