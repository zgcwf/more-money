<template>
  <div class="x">
    <Layout>
      <Types classPrefix="type"></Types>

      <div>
        <ol v-if="groupedList.length > 0">
          <li v-for="(group, index) in groupedList" :key="index">
            <h4 class="title">
              {{ beautify(group.title) }}
              <span class="zgc">总计:￥{{ group.total }}</span>
            </h4>
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
      <div v-if="groupedList.length === 0" class="noResult">
        <span>暂时还没有记录. 快去记一笔吧~</span>
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
      // if (recordList.length === 0) {
      //   return [];
      // }
      // 深拷贝
      const newList = clone(recordList)
        .filter((r) => r.type === this.type) //过滤，实现收入和支出分离
        .sort(
          //排序，按时间倒序展示数据
          (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
        );
      if (newList.length === 0) {
        return [];
      }
      const result = [
        {
          //初始化一个数据，并放入存储数据的第0项
          title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
          items: [newList[0]],
        },
      ];
      for (let i = 1; i < newList.length; i++) {
        //从第二项开始遍历
        const current = newList[i]; //让current等于当前项
        const last = result[result.length - 1]; //让last等于result数组的最后一项
        if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
          last.items.push(current); //如果当前项的时间等于result最后一项的时间（前面已完成时间排序），则将其放入result的最后一项
        } else {
          //否则在result中创建一个新项
          result.push({
            title: dayjs(current.createdAt).format("YYYY-MM-DD"),
            items: [current],
          });
        }
      }
      result.map((group) => {
        group.total = group.items.reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      });
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
.noResult {
  padding: 16px;
  text-align: center;
  font-size: 80px;
  color: white;
  font-family: "方正舒体";
}
.x::v-deep {
  .type-item {
    background: white;

    &.selected {
      background: #c4c4c4;
      color: white;
      font-family: "方正舒体";
      font-size: 36px;

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
    .zgc {
      width: 115px;
    }
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