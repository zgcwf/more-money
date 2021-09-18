<template>
  <div class="x">
    <Layout>
      <Types classPrefix="type"></Types>
      <Tabs
        classPrefix="interval"
        :dataSource="intervalList"
        :value="interval"
      ></Tabs>
      <div>
        <ol>
          <li v-for="(group, index) in result" :key="index">
            <h3 class="title">{{ group.title }}</h3>
            <ol>
              <li v-for="item in group.items" :key="item.id" class="record">
                <span>{{ item.tags[0].name }}</span>
                <span class="notes">{{ item.notes }}</span>
                <span>￥{{ item.amount }} </span>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </Layout>
  </div>
</template>

<script>
import Types from "../components/Money/Types.vue";
import Tabs from "../components/Tabs.vue";

export default {
  name: "Statistics",
  components: { Types, Tabs },
  beforeCreate() {
    // 读取初始化缓存
    this.$store.commit("fetchRecords");
  },

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
  computed: {
    recordList() {
      this.$store.commit("fetchRecords");
      // 获取到recordList的值
      return this.$store.state.recordList;
    },
    result() {
      const recordList = this.recordList;
      // 建立一个hash表
      const hashTable = {};
      for (let i = 0; i < recordList.length; i++) {
        // 将每一项的事件前半部分（T之前的）分离出来赋给data
        const [date, time] = recordList[i].createdAt.split("T");
        //更新hash表的值，将key值设置为事件
        hashTable[date] = hashTable[date] || { title: date, items: [] };
        // 将hash表的value值更新为recordList的每一项
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    },
  },
  methods: {
    updatetype(type) {
      this.type = type;
    },
    updateinterval(value) {
      this.interval = value;
    },
    tagString(tags) {
      console.log(tags);
      return tags.length === 0 ? "无" : tags.join(",");
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
.x::v-deep {
  .type-item {
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
    display: flex;
    span:nth-child(1) {
      flex: 2;
    }
    span:nth-child(2) {
      flex: 3;
    }
    span:nth-child(3) {
      flex: 1;
    }
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
}
</style>