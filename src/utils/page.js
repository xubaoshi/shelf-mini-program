import { wxRequest } from './fetch'

export default class Pagination {
  constructor (url, processFunc) {
    this.url = url
    this.list = []
    this.start = 0
    this.count = 10
    this.processFunc = processFunc
    this.loading = false
    this.params = []
    this.reachBottom = false
    this.empty = true
    this.toClear = false
  }

  async next(args) {
    const params = {
      from: this.start,
      limit: this.count
    }
    // 正在请求
    if (this.loading) {
      console.warn('page loading')
      return this
    }
    this.loading = true
    try {
      Object.assign(params, args)
      const res = await wxRequest(params, this.url)
      const data = res.data.data
      // 底部
      if (data === null || data.length < 1) {
        if (this.toClear) {
          this.toClear()
        } else {
          this.reachBottom = true
        }
        return this
      }
      this.empty = false
      // 包装数据
      this._processData(data)
      // 设置数据
      if (this.toClear) {
        this.list = data
        this.toClear = false
      } else {
        this.list = this.list.concat(data)
      }
      this.start += this.count
      if (data.length < this.count) {
        this.reachBottom = true
      }
      return this
    } finally {
      this.loading = false
    }
  }

  reset() {
    this.empty = true
    this.toClear = true
    this.start = 0
    this.reachBottom = false
  }

  clear() {
    this.toClear = false
    this.start = 0
    this.list = []
  }

  _processData(data) {
    if (this.processFunc) {
      for (let i in data) {
        const result = this.processFunc(data[i])
        if (result) {
          data[i] = result
        }
      }
    }
  }
}
