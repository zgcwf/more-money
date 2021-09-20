<template>
  <Layout class-prefix="layout">
    <NumberPad></NumberPad>
    <div class="notes">
      <Notes
        placeholder="在这里输入备注"
        fieldName="备注:"
        :value.sync="record.notes"
      ></Notes>
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
      record: {
        tags: [],
        notes: "",
        type: "-",
        amount: "0",
        createAt: Date,
      },
    };
  },
  created() {
    this.$store.commit("fetchTags"); //创建时读取缓存
    this.$store.commit("fetchRecords"); //创建时读取缓存
  },
  computed: {
    tags() {
      return this.$store.state.tagList;
    },
  },
  methods: {
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
      if (this.record.tags.length === 1) {
        this.$store.commit("createRecord", this.record);
        this.record.notes = "";
      } else {
        alert("请选择一个标签");
      }
    },
  },

  mounted() {
    this.$bus.$on("update:output", this.updataoutput);
    this.$bus.$on("update:selectedTags", this.updateselectedTags);
    this.$bus.$on("update:type", this.updatetype);
    this.$bus.$on("submit", this.saveRecord);
  },
  beforeDestroy() {
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
