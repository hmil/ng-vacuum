---
id: component-test
title: Test a Component
sidebar_label: Test a Component
---

So far, we've seen how to automatically mock all dependencies of a service in order to test it in isolation. Testing a component is mostly the same, but we also need to render the template and mock the components used in that template.

**tl;dr**: jump directly to the [recap](#recap) for the full code example.

## Sample project

We consider the following sample component.

```ts
export const CONSOLE = new InjectionToken<Console>('CONSOLE');

@Component({
    selector: 'sample-component',
    templateUrl: `
        <div class="app">
            <div *ngIf="isAuthenticated">
                <app-fancy-button [confirmLabel]="'Got it'" [cancelLabel]="cancelLabel" (clicked)="onChoice($event)"></app-fancy-button>
            </div>
            <div *ngIf="!isAuthenticated">
                <div class="message error">You must be authenticated</div>
                <button test-id="login-button" (click)="onLogin()">Log in</button>
            </div>
        </div>
    `
})
export class MyComponent {

    cancelLabel = 'No';

    get isAuthenticated() {
        return this.authService.isAuthenticated();
    }

    constructor(
        @Inject(CONSOLE) private readonly console: typeof window.console,
        private readonly authService: AuthService) { }

    public onLogin() {
        this.authService.setAuthenticated(true);
    }

    public onChoice(choice: 'confirm' | 'cancel') {
        this.console.log(choice);
    }
}
```

The sample component uses the global `console` object, injected using an [`InjectionToken`](https://angular.io/api/core/InjectionToken), to give this tutorial a bit more uumpf.


## Scaffolding

It is good practice to create a [page object](https://angular.io/guide/testing#use-a-page-object) for component tests. The page object abstracts away the selectors to access elements rendered by the template and exposes a nice interface for the tests.

NgVcuum provides a utility class to simplify the setup of the page object

```ts
import { BasePage, renderComponent } from 'ng-vacuum';

describe('MyComponent', () => {

    let page: Page;

    beforeEach(async () => {
        page = new Page(await renderComponent(MyComponent, AppModule));
    });
});

class Page extends BasePage<MyComponent> { }
```

[`renderComponent`](./api-reference#rendercomponenttcomponent-typet-module-typeany--modulewithproviders-promiserenderingt-never) internally invokes [shallow-render](https://getsaf.github.io/shallow-render/#shallow-render) to create a shallow rendering of the component, and takes care of creating an omnimock for each of the component's service dependencies.
If you would like to get a reference to the [Shallow](https://getsaf.github.io/shallow-render/#shallow-class) instance, to apply advanced customizations and to bind data, you can use [`getShallow`](./api-reference#getshallowtcomponent-typet-module-typeany--modulewithproviders-shallowt) instead.


## Populate the page object

We need to get access to the template in our test. We populate the page object.

```ts
// snip

class Page extends BasePage<MyComponent> {
    get loginButton(): HTMLElement {
        return this.rendering.find('[test-id=login-button]').nativeElement;
    }

    get fancyButton() {
        return this.rendering.findComponent(FancyButtonComponent);
    }
}
```

We use the `rendering` instance member from [`BasePage`](./api-reference#class-basepaget) to find components in the template.

## Write a test

We can now write proper unit tests with the comfort of full vacuum isolation.

Let's check what happens when the user is not authenticated and we click on the login button.

```ts
it('lets user log in when not authenticated', fakeAsync(() => {
    // Mock the state: user not logged in
    when(getMock(AuthService).authenticated).return(false);
    // Make sure the page is fully rendered
    page.detectChanges();
    // Use page object to locate login button, and click.
    page.loginButton.click();
}));
```

:::note

Always wrap component tests with `fakeAsync`.
Angular buffers internal operations in unredictible ways and so you need to be able to control the passage of time, otherwise you may experience weird and frustrating behavior.

:::

If we try to run this test, we get the following error:

```ts
Error: Unexpected property access: <AuthService>.isAuthenticated
This mock is not backed
```

Indeed, `MyComponent` is trying to access `AuthService.isAuthenticated` during rendering to determine if the user is authenticated and, ultimately, to know what to render.

We need to specify the behavior of `AuthService` _before_ rendering the component.

Let's do this. We move the mock behavior to the `beforeEach` function:

```ts
beforeEach(async () => {
    when(getMock(AuthService).authenticated).return(false); // Add here
    page = new Page(await renderComponent(AppComponent, AppModule));
});

it('lets user log in when not authenticated', fakeAsync(() => {
    // Remove from here
    page.detectChanges();
    page.loginButton.click();
}));
```

Now, the template has all the information it needs for a successful render. But we get this error.

```
Failed: Uncaught error: Error: Unexpected property access: <AuthService>.setAuthenticated
```

This is the thing that we are actually testing for! Let's write an expectation for this call. Remember to use the quantifier `.once()` to tell omnimock that you expect this call to happen exactly once.
We also add `expect().nothing()` so that jasmine stops complaining about the fact that your test doesn't contain an actual expectation.

```ts
it('lets user log in when not authenticated', fakeAsync(() => {
    when(getMock(AuthService).setAuthenticated(true)).return().once();
    page.detectChanges();
    page.loginButton.click();
    expect().nothing();
}));
```

The full code of the test is given at the bottom of this page. But first, let's add a second test case

## Write another test (trick to customize component setup)

In the previous section, we've hardcoded the fact that the user is not authenticated. But what if we would like to test when the user is authenticated?

This is exactly what we will do. We first replace the hardcoded answer with a getter and declare a value that we can access to modify the behavior.

```ts
describe('AppComponent', () => {

    let page: Page;

    let isAuthenticated: boolean;

    beforeEach(async () => {
        isAuthenticated = false;
        when(getMock(AuthService).isAuthenticated()).useGetter(() => isAuthenticated);
        page = new Page(await renderComponent(AppComponent, AppModule));
    });

// snip
```

Now, we can add a second test which asserts what happens when the user is authenticated.

Remember that the component is _shallow_ rendered. This means that `<app-fancy-button>` in the component template is not expanded.
We treat it like a black box and simulate its behavior by emitting a `click` event directly from the test suite. This is what makes the test of MyComponent completely decoupled from the implementation of FancyButtonComponent.

```ts
it('presents a fancy button when authenticated', fakeAsync(() => {
    // Change the mock behavior and re-render
    isAuthenticated = true;
    page.detectChanges();

    // Checks properties of the nested component
    expect(page.fancyButton.confirmLabel).toBe('Got it');
    expect(page.fancyButton.cancelLabel).toBe('Nooo');

    // Expect a call to console.log when we click on confirm
    when(getMock(CONSOLE).log('confirm')).return().once();

    // Click on confirm
    page.fancyButton.clicked.emit('confirm');
}));
```


## Component bindings

TODO


## Recap

The complete test suite is shown below.

```ts
describe('AppComponent', () => {

    let page: Page;
    let isAuthenticated: boolean;

    beforeEach(async () => {
        isAuthenticated = false;
        // Mock data required by the template
        when(getMock(AuthService).isAuthenticated()).useGetter(() => isAuthenticated);
        page = new Page(await renderComponent(AppComponent, AppModule));
    });

    it('lets user log in when not authenticated', fakeAsync(() => {
        // Ensure the tempalte is fully rendered
        page.detectChanges();
        // Prepare call expectation for setAuthenticated, then click on login
        when(getMock(AuthService).setAuthenticated(true)).return().once();
        page.loginButton.click();
        expect().nothing();
    }));

    it('presents a fancy button when authenticated', fakeAsync(() => {
        // Change the mock data and re-render the template
        isAuthenticated = true;
        page.detectChanges();
        // Checks the rendered view
        expect(page.fancyButton.confirmLabel).toBe('Got it');
        expect(page.fancyButton.cancelLabel).toBe('Nooo');
        // Prepare call expectation and click on the button
        when(getMock(CONSOLE).log('confirm')).return().once();
        page.fancyButton.clicked.emit('confirm');
    }));
});

// Page object abstracts away the template selectors
class Page extends BasePage<AppComponent> {

    get loginButton(): HTMLElement {
        return this.rendering.find('[test-id=login-button]').nativeElement;
    }

    get fancyButton() {
        return this.rendering.findComponent(FancyButtonComponent);
    }
}
```
