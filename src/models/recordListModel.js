import clone from '@/lib/clone';
// 引入克隆js文件
const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [],
    // 用于将改变的record放入data,并将其缓存
    put(record) {
        const record2 = clone(record);
        record2.createdAt = new Date();
        this.data.push(record2);
        this.save()
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName)) || []
        return this.data
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};
export default recordListModel;
