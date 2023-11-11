# Promex

**Prom**ise **ex**posed aka deferred promise.

```bash
$ npm i promex
```

```typescript
import { Promex } from 'promex'

const promex = new Promex<string>()

promex.resolve('Hello World!')
promex.reject(new Error('Something went wrong!'))

oldlib.call(promex.callback)

await promex
```
