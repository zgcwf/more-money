<template>
  <div class="x">
    <Layout>
      <Types classPrefix="type"></Types>
      <Tabs
        classPrefix="interval"
        :dataSource="intervalList"
        :value="interval"
      ></Tabs>
      {{ type }}
      {{ interval }}
    </Layout>
  </div>
</template>

<script>
import Types from "../components/Money/Types.vue";
import Tabs from "../components/Tabs.vue";

export default {
  name: "Statistics",
  components: { Types, Tabs },
  data() {
    return {
      type: "-",
      interval: "day",
      intervalList: [
        { text: "按天", value: "day" },
        { text: "按周", value: "week" },
        { text: "按月", value: "month" },
      ],
    };
  },
  methods: {
    updatetype(type) {
      this.type = type;
    },
    updateinterval(value) {
      this.interval = value;
    },
  },
  mounted() {
    this.$bus.$on("update:type", this.updatetype);
    this.$bus.$on("update:interval", this.updateinterval);
  },
  beforeDestroy() {
    this.$bus.$off("update:type");
    this.$bus.$off("update:interval");
  },
};
</script>

<style lang="scss" scoped>
.x::v-deep .type-item {
  background-color: #c4c4c4;
  &.selected {
    background-color: #fff;
    &::after {
      display: none;
    }
  }
}
</style>