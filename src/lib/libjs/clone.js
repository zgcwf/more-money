function clone(data) {
    return JSON.parse(JSON.stringify(data));
}
// 深拷贝数据，防止一个数据改变导致缓存的所有数据改变
export default clone;