---
id: injection-tokens
title: Using Injection Tokens
sidebar_label: Using Injection Tokens
---

Use injection tokens to inject static values into a service.

```ts
// my.service.ts
export const RESULTS_PRE_PAGE = new InjectionToken<number>('RESULTS_PER_PAGE');
export const HISTORY = new InjectionToken<Window.history>('HISTORY');

@Injectable()
export class MyService {
    constructor(
        @Inject(RESULTS_PER_PAGE) private readonly results_per_page: number,
        @Inject(HISTORY) private readonly history: Window.history
    ) { }
}
```

```ts
// my.module.ts

import { HISROTY, RESULTS_PER_PAGE } from './my.service';

@NgModule({
    // ...
    providers: [
        { provide: HISTORY, useValue: history },
        { provide: RESULTS_PER_PAGE, useValue: 10 }
    ]
})
export class MyModule {

}
```

:::note

Always declare the injection token on the side of the consumer, not on the side of the provider. If multiple consumers need the same value injected, then create a file `providers.ts` where you place all injection token declarations. This prevents dependency cycles.

:::