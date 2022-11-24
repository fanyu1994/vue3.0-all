type Task<TaskResultType> = any

class PQueue {
  #limit = 1
  #cur = 1
  #map_p = new Map()
  constructor(options?: any) {
    this.#limit = options?.num
  }
  // 加入fun
  add<TaskRustltType>(fun: Task<TaskRustltType>): Promise<TaskRustltType> {
    return new Promise((resolve, reject) => {
      this.#map_p.set(this.#cur, fun)
      this.#next()
    })
  }
  #next() {
    this.#cur++
  }
}

export default PQueue
