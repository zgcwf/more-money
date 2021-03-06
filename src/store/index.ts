import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/libts/clone ";
import { nanoid } from "nanoid";
import router from "@/router";

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
    // 得到对应id的tag
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    // 用于更新name
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复了");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    // 用来删除标签
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        router.back();
      } else {
        window.alert("删除失败");
      }
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
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit("saveRecords");
      window.alert("已保存");
      // console.log(state.recordList);
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
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("createTags", "衣");
        store.commit("createTags", "食");
        store.commit("createTags", "住");
        store.commit("createTags", "行");
      }
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
      // window.alert("添加成功");
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
