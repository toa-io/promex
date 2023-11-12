export class Promex<T> extends Promise<T> {
  public resolve: Resolution<T>
  public reject: Rejection

  public constructor (executor = (..._: any[]) => {}) {
    let ok
    let oh

    super((resolve, reject) => {
      ok = resolve
      oh = reject

      return executor(resolve, reject)
    })

    this.resolve = ok as unknown as Resolution<T>
    this.reject = oh as unknown as Rejection
  }

  public callback = (err: any, value: T): void => {
    if (err !== null && err !== undefined)
      void this.reject(err)
    else
      void this.resolve(value)
  }
}

type Resolution<T> = (value?: T | PromiseLike<T>) => void
type Rejection = (reason?: any) => void
