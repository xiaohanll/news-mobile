// 本地存储模块
// 获取：获取的数据得是JS对象的格式
export const getItem = (name) => {
  const data = window.localStorage.getItem(name)
  try {
    // 若data不是JS对象，将data转成JS对象
    return JSON.parse(data)
  } catch (error) {
    // 若data不是字符串，直接原样返回
    return data
  }
}
// 存储
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 删除
export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
