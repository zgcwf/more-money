import Vue from "vue";
import Vuex, { Store } from "vuex";
import clone from "@/lib/libts/clone ";
import { nanoid } from "nanoid";

Vue.use(Vuex);
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
};
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    //读取缓存
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    // 用于点击ok后将record放入数组recordlist，并缓存
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit("saveRecords");
      console.log(state.recordList);
    },
    // 用于缓存recordList
    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    //读取缓存
    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
    },
    // 创建标签
    createTags(state, name: string) {
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复了");
        return;
      }
      state.tagList.push({ id: nanoid(), name: name });
      store.commit("saveTags");
      window.alert("添加成功");
    },
    // 用于缓存tagList
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
  },

  actions: {},
  modules: {},
});
export default store;
