<template>
  <Layout class-prefix="layout">
    {{ record }}
    <NumberPad></NumberPad>
    <div class="notes">
      <Notes placeholder="在这里输入备注" fieldName="备注"></Notes>
    </div>

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
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

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
      // tags: ["衣", "食", "住", "行", "彩票"],
      tags: tagListModel.fetch(),
      record: {
        tags: [],
        notes: "",
        type: "-",
        amount: "0",
        createAt: Date,
      },
      // recordList: JSON.parse(localStorage.getItem("recordList")) || [],
      recordList: recordListModel.fetch(), //用于读取缓存数据
    };
  },

  methods: {
    // 用于新增标签
    createtag(name) {
      if (name !== null && name !== "") {
        this.tags.push({ id: name, name: name });
        tagListModel.save();
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
      // const record2 = JSON.parse(JSON.stringify(this.record));
      const record2 = recordListModel.clone(this.record);
      record2.createdAt = new Date();
      this.recordList.push(record2);
    },
  },
  // 一旦recordlist改变，则将其缓存
  watch: {
    recordList: {
      deep: true,
      handler() {
        // localStorage.setItem("recordList", JSON.stringify(this.recordList));
        recordListModel.save(this.recordList); //缓存当前recordList的内容
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

<style scoped>
.notes {
  padding: 8px 0;
}
</style>
