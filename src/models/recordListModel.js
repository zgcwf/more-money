const localStorageKeyName = 'recordList';
const recordListModel = {
    clone(data) {
        return JSON.parse(JSON.stringify(data));
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName)) || []
    },
    save(data) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }
};
export default recordListModel;