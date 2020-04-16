---
id: injection-tokens
title: Using Injection Tokens
sidebar_label: Using Injection Tokens
---

Use injection tokens to inject static values into a service.

For instance, if you need to use [`window.history`](https://developer.mozilla.org/en-US/docs/Web/API/Window/history), then instead of using the global object directly, which would tightly couple your code to the DOM api, declare an injection token and request this dependency in the constructor.

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

Then, in your module, provide this dependency from the ambient API.

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

The history can now be mocked in unit tests. Note that this is a truly isolated test as there was no need for nasty tricks like patching the global browser API.

```ts
describe('MyService', () => {
    let service: MyService;

    beforeEach(() => {
        service = getService(MyService);
    });

    it('navigates back when on product page', () => {
        when(getMock(HISTORY).state).useValue({ name: 'product-details' });
        when(getMock(HISTORY).back()).return().once();
        service.goBackIfProduct();
    });
});
```

:::note

Always declare the injection token on the side of the consumer, not on the side of the provider. If multiple consumers need the same value injected, then create a file `providers.ts` where you place all injection token declarations. This prevents dependency cycles.

:::
