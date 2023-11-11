export class Promex<T = any> extends Promise<T> {
  public resolve: Resolution<T>
  public reject: Rejection

  public constructor (executor: (resolve: Resolution<T>, reject: Rejection) => void = () => {}) {
    let ok = undefined as unknown as Resolution<T>
    let oh = undefined as unknown as Rejection

    super((resolve: Resolution<T>, reject: Rejection) => {
      ok = resolve
      oh = reject

      return executor(resolve, reject)
    })

    this.resolve = ok
    this.reject = oh
  }

  public callback = (err: any, value: T): void => {
    if (err !== null && err !== undefined)
      this.reject(err)
    else
      this.resolve(value)
  }
}

type Resolution<T> = (value: T | PromiseLike<T>) => void
type Rejection = (reason?: any) => void
