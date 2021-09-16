import clone from '@/lib/clone';
// 引入克隆js文件
const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [],
    create(record) {
        const record2 = clone(record);
        record2.createdAt = new Date();
        this.data.push(record2);
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
