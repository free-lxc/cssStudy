// 缓存之前的函数结果
class memoizeMap {
  _map = new Map()
  _weakMap = new WeakMap()
  constructor() {
    // this._map = new Map()
    // this._weakMap = new WeakMap()
  }
  _isObject(key: any) {
    return typeof key === "object" && key !== null
  }
  get(key: any) {
    if (this._isObject(key)) {
      return this._weakMap.get(key)
    }
    return this._map.get(key)
  }
  set(key: any, value: any) {
    if (this._isObject(key)) {
      return this._weakMap.set(key, value)
    }
    return this._map.set(key, value)
  }
  has(key: any) {
    if (this._isObject(key)) {
      return this._weakMap.has(key)
    }
    return this._map.has(key)
  }
}
export const memoize = (func: Function, resolver?: any) => {
  if (typeof resolver !== "function") {
    resolver = (key: any) => key
  }
  const memoized = (...args: any[]) => {
    // 判断是否含有缓存
    const key = resolver(...args)
    if (memoized.cache.has(key)) {
      return memoized.cache.get(key)
    } else {
      const result = func.apply(this, args)
      memoized.cache.set(key, result)
      return result
    }
  }
  memoized.cache = new memoizeMap()
  return memoized
}

// 红绿灯切换
export class TrafficLight {
  _lights: any[] // 灯的颜色
  _currentIndex: number // 第几个灯
  _time = Date.now() // 目前的时间
  constructor(lights: any[]) {
    this._lights = lights
    this._time = Date.now()
    this._currentIndex = 0
  }

  _update() {
    while (1) {
      if (this._disTime() <= this.currentLight.lasts) {
        break
      }
      this._time += this.currentLight.lasts
      this._currentIndex = (this._currentIndex + 1) % this._lights.length
    }
  }
  get currentLight() {
    return this._lights[this._currentIndex]
  }
  _disTime() {
    // 计算剩下的时间
    return Date.now() - this._time
  }
  getCurrentLights() {
    this._update()
    return {
      color: this.currentLight.color,
      remain: this.currentLight.lasts - this._disTime(),
    }
  }
}
