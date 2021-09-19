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
          <li v-for="(group, index) in groupedList" :key="index">
            <h4 class="title">{{ beautify(group.title) }}</h4>
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
import dayjs from "dayjs";
import clone from "@/lib/libjs/clone";
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
    groupedList() {
      const recordList = this.recordList;
      if (recordList.length === 0) {
        return [];
      }
      const newList = clone(recordList).sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
      const result = [
        {
          title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
          items: [newList[0]],
        },
      ];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
          last.items.push(current);
        } else {
          result.push({
            title: dayjs(current.createdAt).format("YYYY-MM-DD"),
            items: [current],
          });
        }
      }
      return result;
    },
  },
  methods: {
    updatetype(type) {
      this.type = type;
    },
    updateinterval(value) {
      this.interval = value;
    },
    beautify(string) {
      // dayjs()是获取当前时间
      if (dayjs().isSame(dayjs(string), "day")) {
        // 比较当前时间与传入时间的天数是否为同一天

        return "今天";
      } else if (dayjs(string).isSame(dayjs().subtract(1, "day"), "day")) {
        // 比较当前时间的前一天与传入时间的天数是否为同一天

        return "昨天";
      } else if (dayjs(string).isSame(dayjs().subtract(2, "day"), "day")) {
        // 比较当前时间的前两天与传入时间的天数是否为同一天
        return "前天";
      } else {
        return dayjs(string).format("YYYY年MM月DD日");
      }
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