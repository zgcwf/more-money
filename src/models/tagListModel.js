const localStorageKeyName = "tagList";
const tagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(
            window.localStorage.getItem(localStorageKeyName)) || [];
        return this.data;
    },
    create(name) {
        // this.data = [{id:'1', name:'1'}, {id:'2', name:'2'}]
        const names = this.data.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
            return "duplicated";
            // 如果传入的name值存在面，则返回duplicated
        }
        this.data.push({ id: name, name: name });
        this.save();
        // 调用sava将其缓存
        return "success";
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
}
export default tagListModel;