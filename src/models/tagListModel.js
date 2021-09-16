// 封装标签功能模块
import { nanoid } from "nanoid";
// 先npm i nanoid下载，再引入nanoid，生成随机id，是个函数。
const localStorageKeyName = "tagList";
const tagListModel = {
    data: [],
    // 读取缓存
    fetch() {
        this.data = JSON.parse(
            window.localStorage.getItem(localStorageKeyName)) || [];
        return this.data;
    },
    // 创建标签
    create(name) {
        // this.data = [{id:'1', name:'1'}, {id:'2', name:'2'}]
        const names = this.data.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
            return "duplicated";
            // 如果传入的name值存在，则返回duplicated
        }
        this.data.push({ id: nanoid(), name: name });
        this.save();
        // 调用sava将其缓存
        return "success";
    },
    // 更新标签名
    update(id, name) {
        // 获取所有的id
        const idList = this.data.map((item) => item.id)
        if (idList.indexOf(id) >= 0) {
            // 如果id存在，则获取所有的name
            const names = this.data.map((item) => item.name)
            if (names.indexOf(name) >= 0) {
                // 如果输入的name已存在,则返回duplicated
                return "duplicated";
            } else {
                // 如果输入的name未存在,则将之前的name修改为输入的name则返回success
                const tag = this.data.filter((item) => item.id === id)[0]
                tag.name = name
                this.save();
                return "success";
            }

        } else {
            return 'Not Found'
        }
    },
    // 删除标签
    remove(id) {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        this.data.splice(index, 1);
        this.save();
        return true;
    },
    // 缓存标签
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
}
export default tagListModel;