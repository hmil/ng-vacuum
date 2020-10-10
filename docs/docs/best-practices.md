---
id: best-practices
title: Best Practices
sidebar_label: Best Practices
---

## Don't use static symbols

Your code should never borrow symbols from the outer scope of the module. This includes obvious browser APIs like `window`, `console`, `document`, but also imported functions and static class functions (including the `new` operator).

All such symbols must be provided to the class via dependency injection. Following are a couple of examples to illustrate this principle.

```ts
// foo.service.ts
@Injectable()
export class FooService {

    public onSomething() {
        history.back(); // No: Don't use a global API like that.
    }
}
```

Instead, inject the symbol. For instance, you could just inject the `Window` object in here.

```ts
// foo.service.ts
export const WINDOW = new InjectionToken<Window>('WINDOW');

@Injectable()
export class FooService {

    constructor(@Inject(WINDOW) private readonly window: Window) { }

    public onSomething() {
        this.window.history.back(); // OK: This can easily be mocked
    }
}


// app.module.ts
import { WINDOW } from 'foo.service.ts';

@NgModule({
    // ...
    providers: [
        {provide: WINDOW, useValue: window }
    ]
})
```

See [using injection tokens](./injection-tokens) for more info.

Another example is class constructors. Class constructors are static methods and cannot easilly be mocked with ng-vacuum (and in general too). Unless the class you are constructing is a simple data object like `Point(x,y)`, `Rect(x,y,w,h)` or similar, you will want to uncouple the code using this class with a factory service.

```ts
// action-factory.service.ts
@Injectable()
export class ActionFactoryService {
    
    public createCopyAction(...args: ConstructorParameters<CopyAction>) {
        return new CopyAction(...args);
    }
}


// action-manager.service.ts
@Injectable()
export class ActionManagerService {
    constructor(private readonly actionFactory: ActionFactoryService) { }

    public onCopy(data: string) {
        // Good: use of a factory decouples the code an makes it easy to test
        // as opposed to code which calls `new CopyAction` directly.
        const action = actionFactory.createCopyAction(data);
        this.dispatch(action);
    }
}
```

## Catch unhandled errors

By default, jasmine ignores uncaught errors during a test. This can lead to unexpected behavior and silent errors.

NgVacuum provides a utility you can call during test setup to prevent errors from escaping your test.

```ts
import { catchUnandledErrors } from 'ng-vacuum';

// Call this in your test environment setup file (typically src/test.ts)
catchUnhandledErrors();
```

## Use page objects

Abstract away CSS selectors in a page object. This makes tests more readable but also makes it easier to update the test suite after the component template was changed.

```ts
describe('SomeComponent', () => {
    
    let rendering: Rendering<SomeComponent, unknown>;

    beforeEach(fakeAsync(() => {
        rendering = renderComponent(SomeComponent, AppModule);
    }));

    it('can click a button', () => {
        // Bad: This test is not readable
        rendering.findComponent(MyButton).click.emit();
        expect((rendering.find('[test-id=the-input]').nativeElement as HTMLInputElement).value).toBe('OK');
    });
});
```

```ts
describe('SomeComponent', () => {

    let page: Page;
    
    beforeEach(fakeAsync(() => {
        page = new Page(renderComponent(SomeComponent, AppModule));
    }));

    it('can click a button', () => {
        // Bad: This test is not readable
        page.submitButton.click.emit();
        expect(page.textInput.value).toBe('OK');
    });
});

class Page extends BasePage<SomeComponent> {

    get submitButton() {
        return this.rendering.findComponent(MyButton);
    }

    get textInput(): HTMLInputElement {
        return this.rendering.find('[test-id=the-input]').nativeElement;
    }
}
```
